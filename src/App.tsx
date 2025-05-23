
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import SimulationHistoryPage from "./pages/SimulationHistoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/simulations" element={<SimulationHistoryPage />} />
            <Route path="/messages" element={<Index />} /> {/* Placeholder - would be replaced with real page */}
            <Route path="/content" element={<Index />} /> {/* Placeholder - would be replaced with real page */}
            <Route path="/settings" element={<Index />} /> {/* Placeholder - would be replaced with real page */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
