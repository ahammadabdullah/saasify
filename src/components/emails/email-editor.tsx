"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EmailEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function EmailEditor({ content, onChange }: EmailEditorProps) {
  return (
    <Textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your email content here..."
      className={cn(
        "min-h-[350px] md:min-h-[500px] md:max-h-[500px] font-mono text-sm focus:border-1 focus:border-primary",
        "scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
      )}
    />
  );
}
