"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { SearchInput } from "@/components/presets/search-input";
import { FilterSelect } from "@/components/presets/filter-select";
import { CustomButton } from "@/components/presets/custom-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectFilter } from "./presets/multi-select-filter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function MiddlePanel() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [model, setModel] = React.useState("gpt-4");
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    // Here you would typically call your AI service
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preset CTA Area */}
      <div className="border-b h-[180px] ">
        <ScrollArea className=" h-full w-screen lg:w-full">
          <div className="flex flex-col p-4 space-y-4 overflow-x-auto">
            {/* Search bars row */}
            <div className="flex space-x-4">
              <SearchInput
                variant="left-icon"
                placeholder="Search..."
                className="w-[200px]"
              />
              <SearchInput
                variant="right-icon"
                placeholder="Search..."
                className="w-[200px]"
              />
            </div>

            {/* Filters row */}
            <div className="flex space-x-4">
              <FilterSelect
                variant="ghost"
                placeholder="Filter 1 (Ghost)"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                className="w-[200px]"
              />
              <FilterSelect
                variant="outline"
                placeholder="Filter 2 (Outline)"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                className="w-[200px]"
              />
              <FilterSelect
                variant="solid"
                placeholder="Filter 3 (Solid)"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                className="w-[200px]"
              />
              <MultiSelectFilter
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
                className="w-[200px]"
                placeholder="Select options..."
                value={selectedValues}
                onValueChange={setSelectedValues}
              />
            </div>

            {/* Buttons row */}
            <div className="flex space-x-4">
              <CustomButton variant="ghost" className="w-[150px]">
                Export
              </CustomButton>
              <CustomButton variant="outline" className="w-[150px]">
                Import
              </CustomButton>
              <CustomButton variant="default" className="w-[150px]">
                Settings
              </CustomButton>
              <CustomButton variant="secondary" className="w-[150px]">
                Analytics
              </CustomButton>
              <CustomButton variant="destructive" className="w-[150px]">
                Delete
              </CustomButton>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Custom Area */}
      <div className="flex-grow border-b p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Custom Area</h2>
        <p className="text-muted-foreground">
          This is a placeholder for your application-specific features. You can
          add any custom components, data visualizations, or other content here.
        </p>
      </div>

      {/* AI Chat Area */}
      <div className="h-[180px] md:h-[200px] flex flex-col">
        <div className="flex-grow overflow-auto p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-2 border-t">
          <div className="relative flex items-center">
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="absolute top-2 left-2 w-[100px] h-6 text-xs bg-transparent border-none">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5</SelectItem>
              </SelectContent>
            </Select>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow pl-2 pr-10 pt-8 min-h-[80px] resize-none"
            />
            <button
              type="submit"
              className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
