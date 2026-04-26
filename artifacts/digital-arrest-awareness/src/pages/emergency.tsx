import { ShieldAlert, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { data } from "@/lib/data";
import { motion } from "framer-motion";

export default function Emergency() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-16">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-4 flex items-center justify-center gap-3">
          <ShieldAlert className="h-8 w-8 text-destructive" />
          Kya Karein? (Action Guide)
        </h1>
        <p className="text-muted-foreground text-lg">
          Agar aapko lagta hai ki aapke saath scam ho raha hai, toh ghabrayein nahi. In steps ko follow karein.
        </p>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="bg-destructive p-4 rounded-full text-white animate-pulse">
          <Phone className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-destructive mb-2">Sabsay Pehle: Call Kaat Do!</h2>
          <p className="text-foreground font-medium">
            Real police officer kabhi bhi video call par investigation nahi karta, aur na hi aapse phone line par bane rehne ko force karta hai. Call drop karna aapka right hai.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.emergencySteps.map((step, index) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border shadow-sm overflow-hidden">
              <div className="flex">
                <div className="bg-primary w-16 md:w-20 flex-shrink-0 flex items-center justify-center border-r border-primary-foreground/10">
                  <span className="text-3xl font-black text-primary-foreground">{step.id}</span>
                </div>
                <CardContent className="p-5 md:p-6 flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {step.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-secondary/10 border-secondary/30 mt-4">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-secondary" />
            Important Rights (Aapke Adhikar)
          </h3>
          <ul className="space-y-3 font-medium">
            <li className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Section 46 of CrPC ke hisaab se, arrest physical hona chahiye. "Digital Arrest" ka kanoon mein koi wajood nahi hai.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Koi bhi government agency (CBI, ED, RBI) aapse bank details ya OTP nahi maangti.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Aapko pura haq hai ki aap unka official ID card aur notice maange, aur local police station se verify karein.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
