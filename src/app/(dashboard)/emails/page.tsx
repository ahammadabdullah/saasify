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
import { Icons } from "@/components/icons";

export default function EmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    emailTemplates[0].name
  );
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(emailTemplates[0].subject);
  const [content, setContent] = useState(emailTemplates[0].content);
  const [scheduleTime, setScheduleTime] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    setScheduleTime(undefined);
  }, [selectedTemplate]);
  useEffect(() => {
    const template = emailTemplates.find((t) => t.name === selectedTemplate);
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
    }
  }, [selectedTemplate]);

  const handleTestEmail = async () => {
    setIsSending(true);

    // Validate required fields
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter an email address to send the test email.",
      });
      setIsSending(false);
      return;
    }
    if (!subject || !content) {
      toast({
        variant: "destructive",
        title: "Subject and Content Required",
        description: "Please enter a subject and content for the email.",
      });
      setIsSending(false);
      return;
    }

    if (
      scheduleTime &&
      new Date(scheduleTime).getTime() < new Date().getTime()
    ) {
      toast({
        variant: "destructive",
        title: "Invalid Schedule Time",
        description:
          "Please select a future date and time to schedule the email.",
      });
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1/emails`, {
        method: "POST",
        body: JSON.stringify({ email, subject, content, scheduleTime }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (res?.data?.id) {
        toast({
          variant: "default",
          title: scheduleTime ? "Email Scheduled" : "Test Email Sent",
          description: scheduleTime
            ? "Your email has been scheduled successfully."
            : `Email sent to ${email}`,
        });
      } else {
        throw new Error(res.error || "Failed to send email");
      }
    } catch (err: any) {
      console.error("Error sending email:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to send email",
      });
    } finally {
      setIsSending(false);
    }
  };

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
