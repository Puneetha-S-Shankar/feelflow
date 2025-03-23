
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "./lib/types";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Import framer motion for animations
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  // Default user state - updated with currentSubEmotion
  const [user, setUser] = useState<User>({
    id: "1",
    username: "user",
    name: "User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&auto=format&fit=crop",
    settings: {
      moodFilterEnabled: true,
      moodFilterStrength: "medium",
      aiAssistEnabled: true,
      sentimentTrackingEnabled: true
    }
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index updateUser={updateUser} />} />
              <Route path="/feed" element={
                user.currentMood 
                  ? <Feed user={user} updateUser={updateUser} />
                  : <Navigate to="/" replace />
              } />
              <Route path="/settings" element={<Settings user={user} updateUser={updateUser} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
