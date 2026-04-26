import { Flag, Phone, Globe, ExternalLink, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Report() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-4 flex items-center justify-center gap-3">
          <Flag className="h-8 w-8 text-secondary" />
          Report Kaise Karein?
        </h1>
        <p className="text-muted-foreground text-lg">
          Agar aapne paise gawa diye hain ya koi aapko harass kar raha hai, toh turant official channels par report karein.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: Helpline */}
        <Card className="border-2 border-primary shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Call 1930</CardTitle>
            <CardDescription className="text-base">National Cyber Crime Reporting Helpline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground font-medium">
              Ye government ka dedicated helpline number hai. Agar aapne abhi-abhi paise transfer kiye hain, toh turant is par call karein. Wo bank se transaction rokne ki koshish kar sakte hain (Golden Hour).
            </p>
            <a href="tel:1930" className="block">
              <Button size="lg" className="w-full text-lg font-bold">
                Call 1930 Now
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Option 2: Portal */}
        <Card className="border-border shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <CardHeader>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
              <Globe className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle className="text-2xl">Online Portal</CardTitle>
            <CardDescription className="text-base">cybercrime.gov.in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground font-medium">
              Sarkar ki official website par detailed complaint file karein. Is par aap fake documents, screenshots, aur call recordings attach kar sakte hain.
            </p>
            <a href="https://cybercrime.gov.in" target="_blank" rel="norenoopener noreferrer" className="block">
              <Button variant="outline" size="lg" className="w-full text-lg font-bold border-2">
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 md:p-8 mt-4 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Complaint Ke Liye Kya Chahiye?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-4 font-medium">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <span>Bank statement dikhate hue ki paise kahan se kahan gaye</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <span>Scammer ka phone number ya social media profile/ID</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <span>WhatsApp ya Skype chats ke screenshots</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">4</div>
              <span>Koi fake arrest warrant ya ID card jo unhone bheja ho</span>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">5</div>
              <span>Aapka khud ka valid ID proof (Aadhaar, PAN)</span>
            </li>
          </ul>
          
          <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <QrCode className="h-32 w-32 text-primary/40 mb-4" />
            <p className="text-sm text-muted-foreground font-medium">
              Save this page or share it with older family members to keep them safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
