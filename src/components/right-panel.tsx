"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";
import { RightPanelContent } from "./chat/RightPanelContent";

export function RightPanel({
  isSmallScreen,
  isVisible,
  setIsVisible,
  children,
}: {
  isSmallScreen: boolean;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  children?: React.ReactNode;
}) {
  const togglePanel = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Right Panel */}
      <div
        className={`lg:static ${
          isSmallScreen
            ? `fixed top-0 right-0 h-full z-50 transition-transform duration-300 ${
                isVisible ? "translate-x-0" : "translate-x-full"
              }`
            : "lg:flex lg:h-full lg:relative"
        } w-full lg:w-auto lg:border-l bg-background flex flex-col`}
      >
        {children ? children : <RightPanelContent />}

        {/* Close Button for Small Screen */}
        {isSmallScreen && (
          <Button
            onClick={togglePanel}
            className="fixed left-2 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground"
          >
            <ArrowRightFromLine />
          </Button>
        )}
      </div>
    </>
  );
}
