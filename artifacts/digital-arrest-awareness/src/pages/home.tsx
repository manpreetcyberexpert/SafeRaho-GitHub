import { Link } from "wouter";
import { Shield, Camera, Search, FileWarning, Phone, ShieldCheck, AlertTriangle, Info, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { data } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="flex-1 space-y-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full font-semibold text-sm"
          >
            <Shield className="w-4 h-4" />
            India's #1 Digital Arrest Protection
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Digital Arrest Se<br/>
            <span className="text-secondary">Daro Mat, Lado.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-xl font-medium"
          >
            SafeRaho uses Real-Time AI to scan video calls and verify phone numbers. Jaise ek 24/7 trusted police inspector aapke saath ho.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link href="/scanner" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full gap-2 text-lg h-14 px-8 font-bold">
                <Camera className="w-5 h-5" />
                Start AI Scanner
              </Button>
            </Link>
            <Link href="/number-check" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full gap-2 text-lg h-14 px-8 bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10 text-white hover:text-white">
                <Search className="w-5 h-5" />
                Check Number
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6 px-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Apni Raksha Kaise Karein?</h2>
          <p className="text-muted-foreground text-lg font-medium">Use these tools to stay safe from digital fraud</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/scanner">
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 group cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">AI Live Video Scanner</h3>
                <p className="text-muted-foreground font-medium">
                  Video call par koi police ban kar dara raha hai? Use our AI to scan their background and uniform in real-time.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/number-check">
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 group cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Scam Number Lookup</h3>
                <p className="text-muted-foreground font-medium">
                  Check if a caller is a known scammer. Report suspicious numbers to help protect others.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/kaise-pahchanein">
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30 group cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileWarning className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Red Flags</h3>
                <p className="text-muted-foreground font-medium">
                  Digital arrest fraud ko pehchanne ke tareeke. Learn the tricks scammers use.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-destructive/10 border-destructive/20 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-4xl md:text-5xl font-black text-destructive mb-2">{data.stats.casesReported}</span>
              <p className="text-sm md:text-base font-medium text-destructive/80">
                Cybercrime cases reported in {data.stats.yearReported}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10 border-destructive/20 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-4xl md:text-5xl font-black text-destructive mb-2">{data.stats.amountLost}</span>
              <p className="text-sm md:text-base font-medium text-destructive/80">
                Lost to Digital Arrest Fraud in {data.stats.yearLost}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Scam Kaise Kaam Karta Hai?</h2>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Card className="border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl">1</div>
              <h3 className="text-lg font-bold mb-2">The Setup (Darr)</h3>
              <p className="text-muted-foreground text-sm font-medium">Aapko call aati hai ki aapke naam par ek parcel mein illegal items mile hain (drugs, passports). Caller khud ko CBI/Customs batata hai.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl">2</div>
              <h3 className="text-lg font-bold mb-2">Isolation (Akelepan)</h3>
              <p className="text-muted-foreground text-sm font-medium">Wo aapko Skype ya WhatsApp par video call par rehne ko kehte hain. "Family ko bataya toh arrest ho jaoge" bol kar daraate hain.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl">3</div>
              <h3 className="text-lg font-bold mb-2">Extortion (Paisa)</h3>
              <p className="text-muted-foreground text-sm font-medium">Fake FIR aur ID cards dikhakar aapse "verification" ke naam par bank transfer ya OTP maangte hain.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Scammer Scripts */}
      <section className="px-4 py-8 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Info className="h-6 w-6 text-secondary" />
            Scammers Kya Bolte Hain?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.scammerScripts.map((script, idx) => (
              <div key={idx} className="bg-muted p-4 rounded-lg border border-border relative">
                <div className="absolute top-2 left-2 text-4xl text-muted-foreground/20 font-serif leading-none">"</div>
                <p className="text-foreground font-medium pl-6 pt-2 italic">{script}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="px-4">
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <Phone className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Pैसे Cut Gaye Hain?</h2>
            <p className="text-muted-foreground font-medium">Immediately contact Cyber Crime Helpline. Har second zaroori hai.</p>
          </div>
          <Link href="/kya-karein">
            <Button variant="destructive" size="lg" className="font-bold text-lg px-8">
              View Emergency Steps
            </Button>
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Apni Knowledge Test Karein</h2>
        <p className="text-muted-foreground font-medium mb-8 max-w-xl mx-auto">
          Kya aap real aur fake call mein farq pehchan sakte hain? Chota sa quiz lijiye aur sure ho jaiye.
        </p>
        <Link href="/quiz">
          <Button size="lg" className="font-bold text-lg px-8">
            Take the Quiz <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
