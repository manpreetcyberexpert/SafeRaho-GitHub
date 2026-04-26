import { useState, useRef, useEffect } from "react";
import { Camera, MonitorUp, AlertTriangle, ShieldCheck, Loader2, StopCircle, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAnalyzeFrame } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCamera, setIsCamera] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [autoScan, setAutoScan] = useState(false);
  
  const analyzeMutation = useAnalyzeFrame();

  // Stop stream on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    stopStream();
    setErrorMsg("");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setIsCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setErrorMsg("Camera permission nahi mila, please allow karein.");
    }
  };

  const startScreenShare = async () => {
    stopStream();
    setErrorMsg("");
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setStream(mediaStream);
      setIsCamera(false);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      // Handle user stopping screen share from browser UI
      mediaStream.getVideoTracks()[0].onended = () => {
        stopStream();
      };
    } catch (err) {
      setErrorMsg("Screen share permission denied.");
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !stream) return;
    
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(videoRef.current, 0, 0);
      const base64Url = canvas.toDataURL('image/jpeg', 0.7);
      const base64 = base64Url.replace('data:image/jpeg;base64,', '');
      
      await analyzeMutation.mutateAsync({ data: { imageBase64: base64 } });
    } catch (err) {
      console.error("Analysis failed:", err);
    }
  };

  // Auto scan effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoScan && stream && !analyzeMutation.isPending) {
      interval = setInterval(() => {
        captureAndAnalyze();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoScan, stream, analyzeMutation.isPending]);

  const result = analyzeMutation.data;
  
  // Determine UI colors based on threat level
  let threatColors = {
    bg: "bg-muted/50",
    border: "border-border",
    text: "text-foreground",
    icon: <ShieldCheck className="w-8 h-8 text-muted-foreground" />
  };

  if (result) {
    if (result.threatLevel === "none") {
      threatColors = {
        bg: "bg-green-500/10 dark:bg-green-500/20",
        border: "border-green-500/30",
        text: "text-green-700 dark:text-green-400",
        icon: <ShieldCheck className="w-12 h-12 text-green-600 dark:text-green-400" />
      };
    } else if (result.threatLevel === "low") {
      threatColors = {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-700 dark:text-yellow-400",
        icon: <AlertTriangle className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
      };
    } else if (result.threatLevel === "medium") {
      threatColors = {
        bg: "bg-secondary/10",
        border: "border-secondary/30",
        text: "text-secondary",
        icon: <AlertTriangle className="w-12 h-12 text-secondary" />
      };
    } else {
      threatColors = {
        bg: "bg-destructive/10 animate-pulse",
        border: "border-destructive/50",
        text: "text-destructive",
        icon: <AlertCircle className="w-12 h-12 text-destructive" />
      };
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="text-center space-y-4 mb-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
          <Camera className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">AI Live Video Scanner</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
          Video call par koi police ban kar dara raha hai? Analyze their background and uniform in real-time.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden border-primary/20 shadow-md">
            <div className="bg-card p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button 
                  variant={stream && isCamera ? "default" : "outline"} 
                  onClick={startCamera}
                  className="font-bold"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
                <Button 
                  variant={stream && !isCamera ? "default" : "outline"} 
                  onClick={startScreenShare}
                  className="font-bold"
                >
                  <MonitorUp className="w-4 h-4 mr-2" />
                  Screen Share
                </Button>
              </div>
              
              {stream && (
                <Button variant="ghost" onClick={stopStream} className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold">
                  <StopCircle className="w-4 h-4 mr-2" /> Stop
                </Button>
              )}
            </div>
            
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {errorMsg ? (
                <div className="text-destructive font-medium p-4 text-center">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                  {errorMsg}
                </div>
              ) : stream ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover ${isCamera ? "scale-x-[-1]" : ""}`} 
                  />
                  {analyzeMutation.isPending && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
                      <div className="w-24 h-24 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                      <div className="mt-4 text-white font-bold text-lg bg-black/60 px-4 py-1 rounded-full">AI is scanning...</div>
                    </div>
                  )}
                  {/* Scan overlay grid effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 mix-blend-screen z-0"></div>
                </>
              ) : (
                <div className="text-white/50 font-medium text-center p-8">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select Camera or Screen Share to begin</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-card border-t border-border flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-scan" 
                  checked={autoScan} 
                  onCheckedChange={setAutoScan} 
                  disabled={!stream}
                />
                <Label htmlFor="auto-scan" className={`font-bold ${!stream ? 'text-muted-foreground' : 'text-foreground'}`}>
                  Auto-Scan (every 5s)
                </Label>
              </div>
              
              <Button 
                onClick={captureAndAnalyze} 
                disabled={!stream || analyzeMutation.isPending || autoScan}
                size="lg"
                className="font-bold text-lg px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {analyzeMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <RefreshCw className="w-5 h-5 mr-2" />}
                SCAN KAREIN
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <Card className="h-full border-border shadow-sm flex flex-col items-center justify-center text-center p-8 min-h-[300px] text-muted-foreground">
                  <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
                  <h3 className="text-xl font-bold mb-2">Awaiting Scan</h3>
                  <p className="font-medium">Start the camera and click "SCAN KAREIN" to analyze the video feed.</p>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full"
              >
                <Card className={`h-full border-2 ${threatColors.border} shadow-lg overflow-hidden flex flex-col`}>
                  <div className={`p-6 ${threatColors.bg} flex-1`}>
                    <div className="flex items-center justify-center mb-4">
                      {threatColors.icon}
                    </div>
                    
                    <h3 className={`text-3xl font-black text-center mb-2 uppercase tracking-tight ${threatColors.text}`}>
                      {result.threatLevel === "none" ? "SAFE" :
                       result.threatLevel === "low" ? "Suspicious" :
                       result.threatLevel === "medium" ? "Warning" : "CRITICAL ALERT"}
                    </h3>
                    
                    {result.isFraudSuspected && (
                      <p className="text-center font-bold text-foreground mb-6 text-lg">
                        Fraud is suspected in this call.
                      </p>
                    )}

                    {!result.isFraudSuspected && (
                      <p className="text-center font-bold text-foreground mb-6 text-lg">
                        No clear visual signs of digital arrest fraud detected in this frame.
                      </p>
                    )}

                    <div className="space-y-4 bg-background/60 backdrop-blur-sm p-4 rounded-xl border border-border/50">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What AI Found:</span>
                        <p className="font-medium text-foreground mt-1 leading-snug">{result.explanation}</p>
                      </div>

                      {result.detectedIndicators && result.detectedIndicators.length > 0 && (
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Detected Objects:</span>
                          <div className="flex flex-wrap gap-2">
                            {result.detectedIndicators.map((indicator, i) => (
                              <Badge key={i} variant={result.isFraudSuspected ? "destructive" : "secondary"} className="font-bold px-3 py-1">
                                {indicator}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-border/50">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recommendation:</span>
                        <p className={`font-bold text-lg mt-1 leading-snug ${result.threatLevel === 'high' || result.threatLevel === 'critical' ? 'text-destructive' : 'text-foreground'}`}>
                          {result.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
