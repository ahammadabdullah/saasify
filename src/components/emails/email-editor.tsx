"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EmailEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function EmailEditor({ content, onChange }: EmailEditorProps) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div
      className={cn(
        " text-sm flex flex-col max-h-[60vh]",
        "scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
      )}
    >
      <ReactQuill
        value={content}
        onChange={onChange}
        modules={modules}
        formats={formats}
        scrollingContainer={
          ".scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
        }
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
        placeholder="Enter your email content here..."
      />
    </div>
  );
}
