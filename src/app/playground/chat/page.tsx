"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";

import { MiddlePanelSkeleton } from "@/components/Skeletons/middle-panel-skeleton";
import { RightPanelSkeleton } from "@/components/Skeletons/right-panel-skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const MiddlePanel = dynamic(
  () => import("@/components/middle-panel/AI-chat").then((mod) => mod.default),
  { loading: () => <MiddlePanelSkeleton />, ssr: false }
);

const RightPanel = dynamic(
  () => import("@/components/right-panel").then((mod) => mod.RightPanel),
  { loading: () => <RightPanelSkeleton />, ssr: false }
);
export default function ChatPage(): JSX.Element {
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
    <ResizablePanelGroup direction={"horizontal"} className="flex-1">
      <ResizablePanel defaultSize={isDesktop ? 60 : 100}>
        {middlePanelLoaded && <MiddlePanel />}
      </ResizablePanel>
      {isDesktop && <ResizableHandle withHandle />}
      <ResizablePanel
        defaultSize={isDesktop ? 40 : 0}
        minSize={isDesktop ? 30 : 0}
        maxSize={isDesktop ? 70 : 0}
      >
        {rightPanelLoaded && (
          <RightPanel
            isSmallScreen={isSmallScreen}
            isVisible={isRightPanelVisible}
            setIsVisible={setIsRightPanelVisible}
          />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
