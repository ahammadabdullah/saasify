"use client";

import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { CopyButton } from "./CopyButton";

interface VerticalTabsProps {
  previewContent: React.ReactNode;
  codeContent: string;
  onExpand: () => void;
  setIsSplit?: (isSplit: boolean) => void;
  isSplit?: boolean;
}

export function VerticalTabs({
  previewContent,
  codeContent,
  onExpand,
  setIsSplit,
  isSplit,
}: VerticalTabsProps) {
  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel defaultSize={55}>
        <div className="flex flex-col h-full">
          <div className="border-b flex justify-between p-2">
            <div className="font-medium px-2 py-1 bg-background text-primary rounded-lg border-4 border-accent text-sm">
              Preview
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSplit && setIsSplit(!isSplit)}
            >
              {isSplit ? "Merge" : "Split"}
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 min-w-[400px]">
              {previewContent || <span>Placeholder Content</span>}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={45}>
        <div className="flex flex-col h-full">
          <div className="border-b p-2">
            <div className="font-medium px-2 py-1 bg-background text-primary rounded-lg border-4 border-accent text-sm w-max">
              Code
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 min-w-[400px]">
              <CopyButton text={codeContent} />
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                lineProps={{
                  style: { whiteSpace: "pre-wrap" },
                }}
                showLineNumbers
                wrapLines={true}
                wrapLongLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  maxHeight: "none",
                }}
              >
                {codeContent || "Placeholder Code"}
              </SyntaxHighlighter>
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
