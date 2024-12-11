"use client";

import React from "react";
import Split from "react-split";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpandablePreview } from "./ExpandablePreview";
import { CopyButton } from "./CopyButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Button } from "../ui/button";

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
    <>
      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={55}>
          <div className="flex flex-col min-h-[50px] overflow-hidden">
            <div className="border-b flex justify-between">
              <div className="font-medium px-2 py-1">Preview</div>
              <div className="flex items-center justify-between">
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
            <div className="flex-1">
              {previewContent || <span>Placeholder Content</span>}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45}>
          <div className="flex flex-col min-h-[50px] overflow-hidden">
            <div className="border-b px-2 py-1 font-medium">Code</div>
            <div className="flex-1">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                showLineNumbers
              >
                {codeContent || "Placeholder Code"}
              </SyntaxHighlighter>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
