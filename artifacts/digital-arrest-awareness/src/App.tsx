import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";

import Home from "@/pages/home";
import Scanner from "@/pages/scanner";
import NumberCheck from "@/pages/number-check";
import RedFlags from "@/pages/red-flags";
import Emergency from "@/pages/emergency";
import Report from "@/pages/report";
import Quiz from "@/pages/quiz";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scanner" component={Scanner} />
      <Route path="/number-check" component={NumberCheck} />
      <Route path="/kaise-pahchanein" component={RedFlags} />
      <Route path="/kya-karein" component={Emergency} />
      <Route path="/report-karo" component={Report} />
      <Route path="/quiz" component={Quiz} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
