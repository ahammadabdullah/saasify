"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRightFromLine, X } from "lucide-react";
import { VerticalTabs } from "./right-panel/VerticalTabs";
import { HorizontalTabs } from "./right-panel/HorizontalTabs";
function ExpandedPreview({
  content,
  onClose,
}: {
  content: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[90vh] bg-background rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Expanded Preview</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-grow p-6">
          <div className="max-w-2xl mx-auto">{content}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
export function RightPanel({
  isSmallScreen,
  isVisible,
  setIsVisible,
}: {
  isSmallScreen: boolean;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}) {
  const [isSplit, setIsSplit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeContent, setCodeContent] = useState(`// Sample code
    function greeting(name) {
      return \`Hello, \${name}!\`;
    }
    console.log(greeting('World'));`);
  const previewContent = (
    <div className="rounded-lg border p-4">
      <div className="text-sm">Preview content will appear here</div>
    </div>
  );

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
            : "lg:flex lg:h-auto lg:relative"
        } w-full lg:w-auto lg:border-l bg-background flex flex-col`}
      >
        <div className="flex-1 overflow-hidden">
          {isSplit ? (
            <VerticalTabs
              setIsSplit={setIsSplit}
              isSplit={isSplit}
              previewContent={previewContent}
              codeContent={codeContent}
              onExpand={() => setIsExpanded(true)}
            />
          ) : (
            <HorizontalTabs
              setIsSplit={setIsSplit}
              isSplit={isSplit}
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab as "preview" | "code")}
              previewContent={previewContent}
              codeContent={codeContent}
              onExpand={() => setIsExpanded(true)}
            />
          )}
        </div>

        {/* Close Button for Small Screen */}
        {isSmallScreen && (
          <Button
            onClick={togglePanel}
            className="fixed left-2 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground"
          >
            <ArrowRightFromLine />
          </Button>
        )}

        {isExpanded && (
          <ExpandedPreview
            content={previewContent}
            onClose={() => setIsExpanded(false)}
          />
        )}
      </div>
    </>
  );
}
