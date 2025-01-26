import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { VerticalTabs } from "../right-panel/VerticalTabs";
import { HorizontalTabs } from "../right-panel/HorizontalTabs";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Use ES Module version

// Define the scope for LiveProvider
const scope = {
  React,
  useState,
  Button,
  ScrollArea,
  X,
  VerticalTabs,
  HorizontalTabs,
};

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

export function RightPanelContent({
  code,
  setCode,
}: {
  code?: string;
  setCode?: (code: string) => void;
}) {
  const [isSplit, setIsSplit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Separate states for code preview and preview content
  const [codeContent, setCodeContent] = useState(`
    import React, { useState } from "react";

    function LoadingButton() {
      const [loading, setLoading] = useState(true);

      const handleClick = () => {
        setLoading((prevLoading) => !prevLoading);
      };

      return (
        <button
          onClick={handleClick}
          className="px-4 py-2 text-white bg-blue-500 
                     rounded hover:bg-blue-600 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400"
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? "Loading..." : "Submit"}
        >
          {loading ? "Loading..." : "Click Me"}
        </button>
      );
    }

    export default LoadingButton;
  `);

  const [previewCode, setPreviewCode] = useState(`
    function LoadingButton() {
      const [loading, setLoading] = useState(true);

      const handleClick = () => {
        setLoading((prevLoading) => !prevLoading);
      };

      return (
        <button
          onClick={handleClick}
          className="px-4 py-2 text-white bg-blue-500 
                     rounded hover:bg-blue-600 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400"
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? "Loading..." : "Submit"}
        >
          {loading ? "Loading..." : "Click Me"}
        </button>
      );
    }
render(<LoadingButton />);
  `);

  useEffect(() => {
    if (code) {
      // Extract the component definition without imports
      setCodeContent(code);
      const fullCode = code
        .replace(/import\s+.*?;?\n/g, "")
        .replace(/export\s+(default\s+)?\w+\s*;\n?/g, "")
        .trim();
      // Add the render function for the preview content
      const previewCode = `${fullCode}\n\nrender(<${getComponentName(
        fullCode
      )} />);`;
      setPreviewCode(previewCode);
    }
  }, [code]);

  // Helper function to extract the component name from the code
  const getComponentName = (code: string): string => {
    const match = code.match(/function\s+(\w+)\s*\(/);
    return match ? match[1] : "Component";
  };
  console.log(previewCode);
  const previewContent = (
    <div className="w-full p-4 flex justify-center items-center">
      <LiveProvider code={previewCode} noInline language="tsx" scope={scope}>
        <LivePreview />
        <LiveError />
      </LiveProvider>
    </div>
  );

  return (
    <>
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

      {isExpanded && (
        <ExpandedPreview
          content={previewContent}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
