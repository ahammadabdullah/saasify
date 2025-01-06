"use client";

import { useState, useEffect, Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { emailTemplates } from "@/lib/supabase/emailTemplates";
import { DateTimePicker } from "@/components/emails/date-time-picker";
import { EmailEditor } from "@/components/emails/email-editor";
import { EmailPreview } from "@/components/emails/email-preview";
import { toast } from "@/hooks/use-toast";
import { EmailPageSkeleton } from "@/components/Skeletons/email-page-skeleton";

export default function EmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    emailTemplates[0].name
  );
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(emailTemplates[0].subject);
  const [content, setContent] = useState(emailTemplates[0].content);
  const [scheduleTime, setScheduleTime] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    const template = emailTemplates.find((t) => t.name === selectedTemplate);
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
    }
  }, [selectedTemplate]);

  const handleTestEmail = async () => {
    // TODO: Implement email sending logic with Resend
    console.log("Sending test email:", {
      email,
      subject,
      content,
      scheduleTime,
    });
    toast({
      variant: "default",
      title: "Test Email Sent",
      description: `Email sent to ${email}`,
    });
  };

  const handleSaveTemplate = () => {
    // Update the emailTemplates array with the new content
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

  if (loading) {
    return <EmailPageSkeleton />;
  }

  return (
    <ScrollArea className="flex-1 p-4 md:p-6">
      <Tabs
        value={selectedTemplate}
        onValueChange={setSelectedTemplate}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-[100px] md:h-full">
          {emailTemplates.map((template) => (
            <TabsTrigger
              key={template.name}
              value={template.name}
              className="text-xs md:text-sm"
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
                <Label htmlFor="email">Test Email</Label>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <Input
                    id="email"
                    placeholder="Enter email for testing"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow focus:border-1 focus:border-primary"
                  />
                  <Button
                    onClick={handleTestEmail}
                    className="w-full md:w-auto"
                  >
                    Test
                  </Button>
                </div>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="focus:border-1 focus:border-primary"
                />
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
              <Tabs defaultValue="source" className="w-full">
                <TabsList>
                  <TabsTrigger value="source">Source</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="source">
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
                </TabsContent>
                <TabsContent value="preview">
                  <EmailPreview content={content} />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </ScrollArea>
  );
}
