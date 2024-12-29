"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { iconList } from "@/lib/iconList";
import { useState } from "react";

// Convert PascalCase to kebab-case
function toKebabCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
    .toLowerCase();
}

export default function IconsPage() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (iconName: string) => {
    const code = `import { ${iconName} } from 'lucide-react'`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(iconName);
    toast({
      title: "Copied to clipboard",
      description: code,
    });
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const renderIcon = (name: string) => {
    const IconComponent = iconList[name as keyof typeof iconList];
    if (IconComponent) {
      return <IconComponent className="h-8 w-8" />;
    }
    return (
      <div className="h-8 w-8 bg-muted flex items-center justify-center text-xs">
        ?
      </div>
    );
  };

  return (
    <ScrollArea className="flex-1">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {Object.keys(iconList).map((name) => (
            <Button
              key={name}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 relative group"
              onClick={() => copyToClipboard(name)}
            >
              {renderIcon(name)}
              <span className="text-xs text-muted-foreground">
                {toKebabCase(name)}
              </span>
              {copiedIcon === name && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
              )}
            </Button>
          ))}
        </div>
        <div className="text-center text-muted-foreground mt-8">
          Need more icons? Visit the{" "}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Lucide website
          </a>{" "}
          for the full collection.
        </div>
      </div>
    </ScrollArea>
  );
}
