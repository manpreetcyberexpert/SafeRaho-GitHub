import { useState } from "react";
import { useCheckScamNumber, useReportScamNumber, useGetKnownScamNumbers, getGetKnownScamNumbersQueryKey } from "@workspace/api-client-react";
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

export default function NumberCheck() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const checkMutation = useCheckScamNumber();
  const reportMutation = useReportScamNumber();
  const { data: knownNumbers, isLoading: isLoadingNumbers } = useGetKnownScamNumbers();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [reportPhone, setReportPhone] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportDesc, setReportDesc] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    try {
      await checkMutation.mutateAsync({ data: { phoneNumber } });
    } catch (err) {
      toast({ title: "Error", description: "Could not check number. Please try again.", variant: "destructive" });
    }
  };

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportPhone || !reportType) {
      toast({ title: "Validation Error", description: "Phone number and fraud type are required.", variant: "destructive" });
      return;
    }
    try {
      await reportMutation.mutateAsync({ data: { phoneNumber: reportPhone, fraudType: reportType, description: reportDesc } });
      toast({ title: "Reported Successfully", description: "Thank you for helping protect others." });
      setReportPhone("");
      setReportType("");
      setReportDesc("");
      queryClient.invalidateQueries({ queryKey: getGetKnownScamNumbersQueryKey() });
    } catch (err) {
      toast({ title: "Error", description: "Could not submit report. Please try again.", variant: "destructive" });
    }
  };

  const maskNumber = (num: string) => {
    if (num.length < 10) return num;
    return num.substring(0, 2) + "XXXXX" + num.substring(num.length - 3);
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-2">
          <Search className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">Scam Number Lookup</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
          Suspicious call aayi? Check karein if this number is reported by others.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Check a Number
              </CardTitle>
              <CardDescription className="font-medium text-foreground/70">
                Enter phone number without spaces or dashes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleCheck} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      placeholder="e.g. +919876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="font-medium"
                    />
                    <Button type="submit" disabled={checkMutation.isPending || !phoneNumber} className="font-bold">
                      {checkMutation.isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Check Karein"}
                    </Button>
                  </div>
                </div>
              </form>

              <AnimatePresence>
                {checkMutation.data && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, mt: 0 }}
                    animate={{ opacity: 1, height: "auto", mt: 24 }}
                    exit={{ opacity: 0, height: 0, mt: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 rounded-xl border ${checkMutation.data.isKnownScam ? "bg-destructive/10 border-destructive/30" : "bg-green-500/10 border-green-500/30 dark:bg-green-500/20"}`}>
                      <div className="flex items-start gap-3">
                        {checkMutation.data.isKnownScam ? (
                          <ShieldAlert className="w-6 h-6 text-destructive shrink-0 mt-1" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-1" />
                        )}
                        <div>
                          <h4 className={`font-bold text-lg ${checkMutation.data.isKnownScam ? "text-destructive" : "text-green-700 dark:text-green-400"}`}>
                            {checkMutation.data.isKnownScam ? "WARNING: Reported Scam Number" : "No Reports Found"}
                          </h4>
                          <p className="font-medium text-foreground mt-1">{checkMutation.data.warningMessage}</p>
                          {checkMutation.data.isKnownScam && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge variant="destructive" className="font-bold">
                                Reported {checkMutation.data.reportCount} times
                              </Badge>
                              {checkMutation.data.fraudType && (
                                <Badge variant="outline" className="font-bold bg-background">
                                  {checkMutation.data.fraudType.replace("_", " ")}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Report a Scammer
              </CardTitle>
              <CardDescription className="font-medium text-foreground/70">
                Help protect others by reporting numbers used for digital arrest or extortion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReport} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-phone">Scammer's Phone Number *</Label>
                  <Input
                    id="report-phone"
                    placeholder="+91..."
                    value={reportPhone}
                    onChange={(e) => setReportPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-type">Fraud Type *</Label>
                  <Select value={reportType} onValueChange={setReportType} required>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select type of fraud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital_arrest">Digital Arrest Threat</SelectItem>
                      <SelectItem value="impersonation">Police/CBI Impersonation</SelectItem>
                      <SelectItem value="extortion">Extortion/Blackmail</SelectItem>
                      <SelectItem value="other">Other Fraud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-desc">Description (Optional)</Label>
                  <Textarea
                    id="report-desc"
                    placeholder="Kya hua tha? Unhone kya bola?"
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <Button type="submit" variant="secondary" className="w-full font-bold" disabled={reportMutation.isPending || !reportPhone || !reportType}>
                  {reportMutation.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
                  Report Number
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                Recently Reported Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingNumbers ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-5 w-[80px] rounded-full" />
                    </div>
                  ))}
                </div>
              ) : knownNumbers?.numbers && knownNumbers.numbers.length > 0 ? (
                <div className="space-y-4">
                  {knownNumbers.numbers.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                      <div>
                        <p className="font-bold font-mono">{maskNumber(item.phoneNumber)}</p>
                        <p className="text-xs text-muted-foreground capitalize">{item.fraudType.replace("_", " ")}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {item.reportCount} {item.reportCount === 1 ? 'Report' : 'Reports'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground font-medium">
                  No numbers reported yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
