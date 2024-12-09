"use client";

import React from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExpandablePreviewProps {
  content: React.ReactNode;
  onExpand: () => void;
}

export function ExpandablePreview({
  content,
  onExpand,
}: ExpandablePreviewProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">{content}</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onExpand}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Expand preview</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
