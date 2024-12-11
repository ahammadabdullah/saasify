"use client";

import PresetCTA from "./middle-panel/Preset-CTA";
import AiChat from "./middle-panel/AI-chat";

export function MiddlePanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Preset CTA Area */}
      <PresetCTA />
      {/* Custom Area */}
      <div className="flex-grow border-b p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Custom Area</h2>
        <p className="text-muted-foreground">
          This is a placeholder for your application-specific features. You can
          add any custom components, data visualizations, or other content here.
        </p>
      </div>

      {/* AI Chat Area */}
      <AiChat />
    </div>
  );
}
