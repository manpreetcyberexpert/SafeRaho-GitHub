import { Router } from "express";
import OpenAI from "openai";
import { AnalyzeFrameBody } from "@workspace/api-zod";

const router = Router();

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  return new OpenAI({ apiKey });
}

router.post("/scanner/analyze-frame", async (req, res) => {
  const parseResult = AnalyzeFrameBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body", details: parseResult.error.issues });
    return;
  }

  const { imageBase64 } = parseResult.data;
  const imageData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

  let openai: OpenAI;
  try {
    openai = getOpenAIClient();
  } catch {
    res.status(500).json({
      isFraudSuspected: false,
      threatLevel: "none",
      detectedIndicators: [],
      explanation: "AI analysis unavailable. Please try again later.",
      recommendation: "If you feel threatened, hang up immediately and call 1930.",
    });
    return;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: `You are a fraud detection AI specialized in identifying "Digital Arrest" scams common in India. 
Your job is to analyze video call screenshots and detect visual indicators of impersonation fraud.

Look for these specific fraud indicators:
1. Police uniforms (Indian Police Service, CBI, ED, NCB uniforms)
2. Police station backgrounds (police station signage, police desks, police logos)
3. Advocate/lawyer robes (black court gowns, judicial attire)
4. Government office setups (official-looking desks with Indian government symbols, ID cards)
5. Handcuffs visible in frame
6. Official-looking documents or ID cards being shown
7. Badges, identity cards of government agencies
8. Court room backgrounds
9. Multiple "officers" in frame creating pressure
10. Fake newsroom or TV broadcast backgrounds

Respond in JSON format only:
{
  "isFraudSuspected": boolean,
  "threatLevel": "none" | "low" | "medium" | "high" | "critical",
  "detectedIndicators": string[],
  "explanation": string,
  "recommendation": string
}`,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageData}`,
              detail: "low",
            },
          },
          {
            type: "text",
            text: "Analyze this screenshot for digital arrest fraud indicators.",
          },
        ],
      },
    ],
  });

  const rawContent = response.choices[0]?.message?.content ?? "{}";

  let parsed: {
    isFraudSuspected: boolean;
    threatLevel: string;
    detectedIndicators: string[];
    explanation: string;
    recommendation: string;
  };

  try {
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : rawContent);
  } catch {
    parsed = {
      isFraudSuspected: false,
      threatLevel: "none",
      detectedIndicators: [],
      explanation: "Could not analyze image. Please try again.",
      recommendation: "If you feel threatened, hang up immediately and call 1930.",
    };
  }

  res.json({
    isFraudSuspected: Boolean(parsed.isFraudSuspected),
    threatLevel: parsed.threatLevel || "none",
    detectedIndicators: Array.isArray(parsed.detectedIndicators) ? parsed.detectedIndicators : [],
    explanation: parsed.explanation || "",
    recommendation: parsed.recommendation || "",
  });
});

export default router;
