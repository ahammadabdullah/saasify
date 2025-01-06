"use client";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowLeftFromLine } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const Chat = dynamic(
  () => import("@/components/chat/Chat").then((mod) => mod.default),
  { ssr: false }
);

export default function ChatPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = !isDesktop;
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(
    !isSmallScreen
  );
  const togglePanel = () => setIsRightPanelVisible(!isRightPanelVisible);
  return (
    <Suspense>
      <Chat />
      {isSmallScreen && !isRightPanelVisible && (
        <Button
          onClick={togglePanel}
          className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground"
        >
          <ArrowLeftFromLine />
        </Button>
      )}
    </Suspense>
  );
}
