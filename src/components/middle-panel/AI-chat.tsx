import { useState, useRef, useEffect } from "react";
import { Brain, Loader, Send, User } from "lucide-react";
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
import type { Message } from "../chat/Chat";
import { ScrollArea } from "../ui/scroll-area";
import ReactMarkdown from "react-markdown"; // Import react-markdown

interface AIChatProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const AiChat = ({
  messages,
  setMessages,
  input,
  setInput,
  model,
  setModel,
  setCode,
}: AIChatProps) => {
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref for ScrollArea

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/v1/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          model: model,
        }),
      });

      const data = await response.json();
      const aiResponse = data.response;

      // Extract the message content (excluding the code block)
      const messageContent = aiResponse
        .replace(/```tsx\n([\s\S]*?)\n```/g, "")
        .trim();

      // Extract the code block (if present)
      const codeMatch = aiResponse.match(/```tsx\n([\s\S]*?)\n```/);
      if (codeMatch && codeMatch[1]) {
        setCode(codeMatch[1]);
      }

      // Push only the message content to the messages state
      const aiMessage: Message = {
        role: "assistant",
        content: messageContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in the textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSubmit(e); // Submit the form
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ResizablePanelGroup direction="vertical">
        {/* Chat Messages Panel */}
        <ResizablePanel defaultSize={80}>
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 mr-2">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 ml-2">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Input Panel */}
        <ResizablePanel defaultSize={20} maxSize={40} minSize={20}>
          <form onSubmit={handleSubmit} className="p-2 border-t h-full">
            <div className="relative flex flex-col h-full">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[100px] h-6 text-xs bg-transparent border-none">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                </SelectContent>
              </Select>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow pl-4 pt-4 pr-10 resize-none mt-2"
              />
              <button
                type="submit"
                className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span className="sr-only">Loading</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AiChat;
