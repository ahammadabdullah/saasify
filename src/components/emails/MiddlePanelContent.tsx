import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { emailTemplates } from "@/lib/supabase/emailTemplates";
import { DateTimePicker } from "@/components/emails/date-time-picker";
import { EmailEditor } from "@/components/emails/email-editor";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

interface MiddlePanelContentProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  email: string;
  subject: string;
  setSubject: (subject: string) => void;
  content: string;
  setContent: (content: string) => void;
  scheduleTime: Date | undefined;
  setScheduleTime: (time: Date | undefined) => void;
  handleTestEmail: () => Promise<void>;
  isSending: boolean;
}

export function MiddlePanelContent({
  selectedTemplate,
  setSelectedTemplate,
  email,
  subject,
  setSubject,
  content,
  setContent,
  scheduleTime,
  setScheduleTime,
  handleTestEmail,
  isSending,
}: MiddlePanelContentProps) {
  const handleSaveTemplate = () => {
    const updatedTemplates = emailTemplates.map((template) =>
      template.name === selectedTemplate
        ? { ...template, subject, content }
        : template
    );
    console.log("Saving updated templates:", updatedTemplates);
    toast({
      variant: "default",
      title: "Template Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      <Tabs
        value={selectedTemplate}
        onValueChange={setSelectedTemplate}
        className="w-full"
      >
        <TabsList className="flex justify-evenly flex-wrap h-[120px] md:h-full p-2">
          {emailTemplates.map((template) => (
            <TabsTrigger
              key={template.name}
              value={template.name}
              className="text-xs md:text-sm py-2"
            >
              {template.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {emailTemplates.map((template) => (
          <TabsContent
            key={template.name}
            value={template.name}
            className="mt-4 md:mt-6"
          >
            <div className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-grow focus:border-1 focus:border-primary"
                  />
                  <Button
                    onClick={handleTestEmail}
                    className="w-full md:w-auto"
                    disabled={isSending}
                  >
                    {!isSending ? (
                      "Test"
                    ) : (
                      <Icons.spinner className="h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </div>
              </div>
              {template.name === "scheduler" && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="schedule">Schedule Time</Label>
                  <DateTimePicker
                    value={scheduleTime}
                    onChange={setScheduleTime}
                  />
                </div>
              )}
              <EmailEditor content={content} onChange={setContent} />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleSaveTemplate}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Template</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
