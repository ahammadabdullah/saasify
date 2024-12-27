"use client";

import dynamic from "next/dynamic";
import { LeftPanel } from "@/components/left-panel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import { MiddlePanelSkeleton } from "@/components/Skeletons/middle-panel-skeleton";
import { RightPanelSkeleton } from "@/components/Skeletons/right-panel-skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TopNavSkeleton } from "@/components/Skeletons/top-nav-skeleton";

const TopNav = dynamic(
  () => import("@/components/top-nav").then((mod) => mod.TopNav),
  { loading: () => <TopNavSkeleton />, ssr: false }
);

const MiddlePanel = dynamic(
  () => import("@/components/middle-panel").then((mod) => mod.MiddlePanel),
  { loading: () => <MiddlePanelSkeleton />, ssr: false }
);

const RightPanel = dynamic(
  () => import("@/components/right-panel").then((mod) => mod.RightPanel),
  { loading: () => <RightPanelSkeleton />, ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = !isDesktop;
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(
    !isSmallScreen
  );
  const [middlePanelLoaded, setMiddlePanelLoaded] = useState(false);
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false);

  useEffect(() => {
    setLeftPanelCollapsed(!isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    if (middlePanelLoaded && !rightPanelLoaded) {
      setRightPanelLoaded(true);
    }
  }, [middlePanelLoaded, rightPanelLoaded]);

  useEffect(() => {
    if (!middlePanelLoaded) {
      setMiddlePanelLoaded(true);
    }
  }, [middlePanelLoaded]);

  const togglePanel = () => setIsRightPanelVisible(!isRightPanelVisible);
  return (
    <div className="flex min-h-screen">
      <Suspense>
        <LeftPanel
          collapsed={leftPanelCollapsed}
          onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        />
      </Suspense>
      <div className="flex flex-1 flex-col">
        <TopNav title="AI SaaS Boilerplate" />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
      {isSmallScreen && !isRightPanelVisible && (
        <Button
          onClick={togglePanel}
          className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground"
        >
          <ArrowLeftFromLine />
        </Button>
      )}
    </div>
  );
}
