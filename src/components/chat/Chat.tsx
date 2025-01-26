"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Suspense, useEffect, useState } from "react";

import { MiddlePanelSkeleton } from "@/components/Skeletons/middle-panel-skeleton";
import { RightPanelSkeleton } from "@/components/Skeletons/right-panel-skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const MiddlePanel = dynamic(
  () => import("@/components/middle-panel/AI-chat").then((mod) => mod.default),
  { loading: () => <MiddlePanelSkeleton />, ssr: false }
);

const RightPanel = dynamic(
  () => import("@/components/chat/RightPanel").then((mod) => mod.RightPanel),
  { loading: () => <RightPanelSkeleton />, ssr: false }
);

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat(): JSX.Element {
  const [layout, setLayout] = useState<"layout1" | "layout2">("layout1");
  const [, setLeftPanelCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = !isDesktop;
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(
    !isSmallScreen
  );
  const [middlePanelLoaded, setMiddlePanelLoaded] = useState(false);
  const [rightPanelLoaded, setRightPanelLoaded] = useState(false);
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      role: "user",
      content: "I need help with my account",
    },
    {
      role: "assistant",
      content: "Sure! What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in",
    },
    {
      role: "assistant",
      content: "I can help you with that. Can you provide me with your email?",
    },
    {
      role: "user",
      content: "Sure, it's johndoe@gmail.com",
    },
  ]);
  const [model, setModel] = useState("gpt-4o");
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const layout = searchParams.get("layout");
    if (layout && ["layout1", "layout2"].includes(layout)) {
      setLayout(layout as "layout1" | "layout2");
    }
  }, [searchParams]);

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
    <div>
      <ResizablePanelGroup
        direction={"horizontal"}
        className="flex-1 min-h-[calc(100vh-70px)]"
      >
        <ResizablePanel defaultSize={isDesktop ? 60 : 100}>
          {layout === "layout1"
            ? middlePanelLoaded && (
                <MiddlePanel
                  input={input}
                  setInput={setInput}
                  model={model}
                  setModel={setModel}
                  messages={messages}
                  setMessages={setMessages}
                  setCode={setCode}
                />
              )
            : rightPanelLoaded && (
                <RightPanel
                  isSmallScreen={isSmallScreen}
                  isVisible={isRightPanelVisible}
                  setIsVisible={setIsRightPanelVisible}
                  code={code}
                  setCode={setCode}
                />
              )}
        </ResizablePanel>
        {isDesktop && <ResizableHandle withHandle />}
        <ResizablePanel
          defaultSize={isDesktop ? 40 : 0}
          minSize={isDesktop ? 40 : 0}
          maxSize={isDesktop ? 60 : 0}
        >
          {layout === "layout1"
            ? rightPanelLoaded && (
                <RightPanel
                  isSmallScreen={isSmallScreen}
                  isVisible={isRightPanelVisible}
                  setIsVisible={setIsRightPanelVisible}
                  code={code}
                  setCode={setCode}
                />
              )
            : middlePanelLoaded && (
                <MiddlePanel
                  input={input}
                  setInput={setInput}
                  model={model}
                  setModel={setModel}
                  messages={messages}
                  setMessages={setMessages}
                  setCode={setCode}
                />
              )}
        </ResizablePanel>
      </ResizablePanelGroup>
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
