import { useState } from "react";
import { AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "@/lib/data";

export default function RedFlags() {
  const [checkedFlags, setCheckedFlags] = useState<Set<string>>(new Set());

  const toggleFlag = (id: string) => {
    const newChecked = new Set(checkedFlags);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedFlags(newChecked);
  };

  const score = checkedFlags.size;
  const maxScore = data.redFlags.length;
  const percentage = (score / maxScore) * 100;

  let riskLevel = "safe";
  let riskMessage = "Koi danger nahi dikh raha abhi. Lekin hamesha alert rahein.";
  let progressColor = "bg-primary";

  if (score >= 4) {
    riskLevel = "critical";
    riskMessage = "HIGH RISK! Ye 100% scam hai. Turant call kaat dein aur 1930 par call karein!";
    progressColor = "bg-destructive";
  } else if (score >= 1) {
    riskLevel = "warning";
    riskMessage = "WARNING! Ye suspicious lag raha hai. Apni personal details share na karein.";
    progressColor = "bg-secondary";
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-16">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-4 flex items-center justify-center gap-3">
          <AlertTriangle className="h-8 w-8 text-secondary" />
          Scam Kaise Pehchanein?
        </h1>
        <p className="text-muted-foreground text-lg">
          Agar aapko call par darr lag raha hai, toh is list mein check karein ki caller ne aapse kya kya kaha hai.
        </p>
      </div>

      <Card className="border-2 shadow-md sticky top-16 z-30 bg-card/95 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Danger Meter</span>
            <span className="font-black text-xl">{score}/{maxScore}</span>
          </div>
          <Progress value={percentage} className="h-3 mb-4" indicatorClassName={progressColor} />
          
          <AnimatePresence mode="wait">
            {score === 0 ? (
              <motion.div
                key="safe"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 text-primary bg-primary/10 p-3 rounded-lg border border-primary/20"
              >
                <ShieldCheck className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium text-sm">Tick the boxes below if you experienced them.</span>
              </motion.div>
            ) : (
              <motion.div
                key="alert"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert variant={riskLevel === "critical" ? "destructive" : "default"} className={riskLevel === "warning" ? "border-secondary/50 bg-secondary/10 text-secondary-foreground" : ""}>
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle className="font-bold">{riskLevel === "critical" ? "SCAM ALERT!" : "BE CAREFUL"}</AlertTitle>
                  <AlertDescription className="font-medium">
                    {riskMessage}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-border">
        <CardHeader className="bg-muted/50 border-b border-border pb-4">
          <CardTitle className="text-xl">Red Flags Checklist</CardTitle>
          <CardDescription>Caller ne inmein se kya kya kiya/kaha?</CardDescription>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border">
          {data.redFlags.map((flag) => (
            <div 
              key={flag.id} 
              className={`p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors cursor-pointer ${checkedFlags.has(flag.id) ? 'bg-destructive/5' : ''}`}
              onClick={() => toggleFlag(flag.id)}
            >
              <Checkbox 
                id={flag.id} 
                checked={checkedFlags.has(flag.id)}
                onCheckedChange={() => toggleFlag(flag.id)}
                className="mt-1 h-5 w-5 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
              />
              <label 
                htmlFor={flag.id} 
                className="text-base font-medium leading-tight cursor-pointer flex-1"
              >
                {flag.text}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {score >= 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-destructive text-destructive-foreground p-6 rounded-xl text-center shadow-lg"
        >
          <h3 className="text-xl font-black mb-2">Yeh ek scam hai.</h3>
          <p className="mb-4 font-medium">Please turant phone cut karein aur Cybercrime helpline par report karein.</p>
          <a href="tel:1930" className="inline-block bg-white text-destructive font-black text-lg px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
            Call 1930 Now
          </a>
        </motion.div>
      )}
    </div>
  );
}
