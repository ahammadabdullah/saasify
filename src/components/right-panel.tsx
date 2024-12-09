"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RightPanel() {
  return (
    <div className="h-full border-l">
      <Tabs defaultValue="preview" className="h-full">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Toggle Split
          </Button>
        </div>
        <TabsContent value="preview" className="h-[calc(100%-53px)]">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm">Preview content will appear here</div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="code" className="h-[calc(100%-53px)]">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="rounded-lg bg-muted p-4">
                <code className="text-sm">{" // Code will appear here"}</code>
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
