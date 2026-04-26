import { Router } from "express";
import { db, scamNumbersTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import { CheckScamNumberBody, ReportScamNumberBody } from "@workspace/api-zod";

const router = Router();

const normalizePhone = (phone: string) =>
  phone.replace(/[\s\-\(\)]/g, "").replace(/^\+91/, "").replace(/^91/, "").trim();

router.post("/numbers/check", async (req, res) => {
  const parseResult = CheckScamNumberBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const normalized = normalizePhone(parseResult.data.phoneNumber);

  const results = await db
    .select()
    .from(scamNumbersTable)
    .where(eq(scamNumbersTable.phoneNumber, normalized))
    .limit(1);

  if (results.length > 0) {
    const record = results[0];
    res.json({
      isKnownScam: true,
      reportCount: record.reportCount,
      firstReported: record.firstReported?.toISOString() ?? null,
      lastReported: record.lastReported?.toISOString() ?? null,
      fraudType: record.fraudType,
      warningMessage: `DANGER! Yeh number ${record.reportCount} baar Digital Arrest Fraud ke liye report kiya gaya hai. Immediately call block karein aur 1930 par report karein.`,
    });
    return;
  }

  res.json({
    isKnownScam: false,
    reportCount: 0,
    firstReported: null,
    lastReported: null,
    fraudType: null,
    warningMessage: "Yeh number abhi tak report nahi hua. Phir bhi suspicious calls se savdhan rahein.",
  });
});

router.post("/numbers/report", async (req, res) => {
  const parseResult = ReportScamNumberBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const normalized = normalizePhone(parseResult.data.phoneNumber);
  const { fraudType, description } = parseResult.data;

  const existing = await db
    .select()
    .from(scamNumbersTable)
    .where(eq(scamNumbersTable.phoneNumber, normalized))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(scamNumbersTable)
      .set({
        reportCount: sql`${scamNumbersTable.reportCount} + 1`,
        lastReported: new Date(),
        description: description ?? existing[0].description,
      })
      .where(eq(scamNumbersTable.phoneNumber, normalized));

    res.status(201).json({
      success: true,
      message: `Number report kiya gaya. Ab yeh number ${(existing[0].reportCount ?? 0) + 1} baar report ho chuka hai.`,
      reportId: existing[0].id,
    });
    return;
  }

  const inserted = await db
    .insert(scamNumbersTable)
    .values({
      phoneNumber: normalized,
      fraudType,
      description: description ?? null,
    })
    .returning();

  res.status(201).json({
    success: true,
    message: "Number successfully report kiya gaya. Aapka shukriya — aapne doosron ko bachane mein madad ki.",
    reportId: inserted[0].id,
  });
});

router.get("/numbers/known-scam-numbers", async (_req, res) => {
  const numbers = await db
    .select()
    .from(scamNumbersTable)
    .orderBy(desc(scamNumbersTable.reportCount))
    .limit(50);

  res.json({
    numbers: numbers.map((n) => ({
      id: n.id,
      phoneNumber: n.phoneNumber,
      reportCount: n.reportCount,
      fraudType: n.fraudType,
      lastReported: n.lastReported?.toISOString() ?? new Date().toISOString(),
    })),
    total: numbers.length,
  });
});

export default router;
