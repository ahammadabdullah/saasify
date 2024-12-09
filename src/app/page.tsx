"use client";

import { TopNav } from "@/components/top-nav";
import { LeftPanel } from "@/components/left-panel";
import { MiddlePanel } from "@/components/middle-panel";
import { RightPanel } from "@/components/right-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setLeftPanelCollapsed(!isDesktop);
  }, [isDesktop]);

  return (
    <div className="flex min-h-screen">
      <LeftPanel
        collapsed={leftPanelCollapsed}
        onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
      />
      <div className="flex flex-1 flex-col">
        <Suspense>
          <TopNav title="AI SaaS Template" />
        </Suspense>
        <div className="flex flex-1 flex-col">
          {!isDesktop && (
            <div className="flex items-center border-b p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftPanelCollapsed(false)}
                className="mr-4"
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          )}
          <ResizablePanelGroup
            direction={isDesktop ? "horizontal" : "vertical"}
            className="flex-1"
          >
            <ResizablePanel defaultSize={isDesktop ? 60 : 100}>
              <MiddlePanel />
            </ResizablePanel>
            {isDesktop && <ResizableHandle withHandle />}
            {isDesktop && (
              <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
                <RightPanel />
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
