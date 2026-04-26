import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Phone, ShieldAlert, CheckSquare, Info, Flag, AlertTriangle, ShieldCheck, Camera, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-slate-50 dark:bg-slate-950">
      {/* Emergency Banner */}
      <div className="bg-destructive text-destructive-foreground font-semibold px-4 py-3 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md">
        <Phone className="h-5 w-5 animate-pulse" />
        <span className="text-sm md:text-base">Emergency? Call 1930 (Cyber Crime Helpline)</span>
      </div>

      {/* Navbar */}
      <header className="bg-primary text-primary-foreground sticky top-[44px] z-40 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-secondary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">SafeRaho</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/scanner" className={`hover:text-secondary transition-colors flex items-center gap-1 ${location === '/scanner' ? 'text-secondary' : ''}`}><Camera className="w-4 h-4"/> AI Scanner</Link>
            <Link href="/number-check" className={`hover:text-secondary transition-colors flex items-center gap-1 ${location === '/number-check' ? 'text-secondary' : ''}`}><Search className="w-4 h-4"/> Number Check</Link>
            <Link href="/kaise-pahchanein" className={`hover:text-secondary transition-colors ${location === '/kaise-pahchanein' ? 'text-secondary' : ''}`}>Red Flags</Link>
            <Link href="/kya-karein" className={`hover:text-secondary transition-colors ${location === '/kya-karein' ? 'text-secondary' : ''}`}>Action Guide</Link>
            <Link href="/report-karo" className={`hover:text-secondary transition-colors ${location === '/report-karo' ? 'text-secondary' : ''}`}>Report</Link>
            <Link href="/quiz">
              <Button variant="secondary" size="sm" className="font-bold font-sans">Take Quiz</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center p-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 overflow-x-auto">
        <Link href="/" className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${location === '/' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
          <Info className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/scanner" className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${location === '/scanner' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
          <Camera className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Scanner</span>
        </Link>
        <Link href="/number-check" className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${location === '/number-check' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
          <Search className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Lookup</span>
        </Link>
        <Link href="/kaise-pahchanein" className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${location === '/kaise-pahchanein' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
          <AlertTriangle className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Red Flags</span>
        </Link>
        <Link href="/kya-karein" className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${location === '/kya-karein' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
          <ShieldAlert className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Guide</span>
        </Link>
      </nav>
      {/* Mobile spacer for bottom nav */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
