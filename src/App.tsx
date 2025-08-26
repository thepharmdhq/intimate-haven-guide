import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import ReflectionCoach from "./pages/ReflectionCoach";
import RelationshipTracker from "./pages/RelationshipTracker";
import BlindSpotMirror from "./pages/BlindSpotMirror";
import ExpressionScripts from "./pages/ExpressionScripts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reflection" element={<ReflectionCoach />} />
          <Route path="/tracker" element={<RelationshipTracker />} />
          <Route path="/patterns" element={<BlindSpotMirror />} />
          <Route path="/scripts" element={<ExpressionScripts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
