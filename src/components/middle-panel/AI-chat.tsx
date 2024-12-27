import { useState } from "react";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AiChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState("gpt-4");

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
      <ResizablePanelGroup direction="vertical">
        {/* Chat Messages Panel */}
        <ResizablePanel>
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
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Input Panel */}
        <ResizablePanel defaultValue={30} minSize={20}>
          <form onSubmit={handleSubmit} className="p-2 border-t h-full">
            <div className="relative flex flex-col h-full">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className=" w-[100px] h-6 text-xs bg-transparent border-none ">
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
                className="flex-grow pl-4 pt-4 pr-10 resize-none mt-2"
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AiChat;
