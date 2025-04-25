"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import InsightsPanel from "@/components/insights/InsightsPanel";
import ChatInterface from "@/components/chat/ChatInterface";
import { useIsMobile } from "@/hooks/useMobile";

export default function Home() {
  const isMobile = useIsMobile();
  const [showInsights, setShowInsights] = useState(!isMobile);

  useEffect(() => {
    setShowInsights(!isMobile);
  }, [isMobile]);

  return (
    <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden">
      {/* Insights Panel (40% on desktop, 100% on mobile when shown) */}
      {showInsights && (
        <div
          className={`${
            isMobile ? "fixed inset-0 z-50 bg-background" : "w-[40%]"
          } flex flex-col border-r overflow-hidden`}
        >
          {isMobile && (
            <div className="flex justify-between items-center p-4 border-b shrink-0">
              <h2 className="font-bold">Retirement Insights</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowInsights(false)}
              >
                Close
              </Button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            <InsightsPanel />
          </div>
        </div>
      )}

      {/* Chat Interface (60% on desktop, 100% on mobile when insights are hidden) */}
      <div
        className={`${
          showInsights ? "w-[60%]" : "w-full"
        } flex flex-col overflow-hidden`}
      >
        <ChatInterface />
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 md:hidden"
            onClick={() => setShowInsights(!showInsights)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
    </main>
  );
}
