"use client";

import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpandablePreview } from "./ExpandablePreview";
import { CopyButton } from "./CopyButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "../ui/button";

interface HorizontalTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  previewContent: React.ReactNode;
  codeContent: string;
  onExpand: () => void;
  setIsSplit?: (isSplit: boolean) => void;
  isSplit?: boolean;
}

export function HorizontalTabs({
  activeTab,
  setActiveTab,
  previewContent,
  codeContent,
  onExpand,
  setIsSplit,
  isSplit,
}: HorizontalTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="h-full flex flex-col"
    >
      <div className="flex items-center justify-between border-b px-2 py-1">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSplit && setIsSplit(!isSplit)}
          >
            {isSplit ? "Merge" : "Split"}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden h-full">
        <TabsContent value="preview" className="h-full m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ExpandablePreview content={previewContent} onExpand={onExpand} />
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="code" className="h-full m-0">
          <ScrollArea className="h-full md:h-[calc(100vh-150px)]">
            <div className="p-4 relative">
              <CopyButton text={codeContent} />
              <SyntaxHighlighter
                language="tsx"
                lineProps={{
                  style: { whiteSpace: "pre-wrap" },
                }}
                style={vscDarkPlus}
                showLineNumbers
                wrapLines={true}
                wrapLongLines={true}
                customStyle={{
                  margin: 0,
                  paddingRight: "1rem",
                  borderRadius: "0.5rem",
                  maxHeight: "none",
                }}
              >
                {codeContent || "Placeholder Code"}
              </SyntaxHighlighter>
            </div>
          </ScrollArea>
        </TabsContent>
      </div>
    </Tabs>
  );
}
