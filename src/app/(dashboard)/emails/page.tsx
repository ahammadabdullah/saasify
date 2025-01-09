"use client";

import { useState, useEffect } from "react";
import { emailTemplates } from "@/lib/supabase/emailTemplates";
import { toast } from "@/hooks/use-toast";
import { EmailPageSkeleton } from "@/components/Skeletons/email-page-skeleton";
import useGetUser from "@/hooks/use-getUser";
import { MiddlePanelContent } from "@/components/emails/MiddlePanelContent";
import { RightPanelContent } from "@/components/emails/RightPanelContent";
import { RightPanel } from "@/components/right-panel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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

  const [user] = useGetUser();
  useEffect(() => {
    if (!user) return;
    setEmail(user.email || "");
  }, [user]);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = !isDesktop;
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(
    !isSmallScreen
  );
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
  const togglePanel = () => setIsRightPanelVisible(!isRightPanelVisible);

  if (loading) {
    return <EmailPageSkeleton />;
  }

  return (
    <div className="flex h-full">
      <ResizablePanelGroup
        direction={"horizontal"}
        className="flex-1 min-h-[calc(100vh-70px)]"
      >
        <ResizablePanel defaultSize={isDesktop ? 60 : 100}>
          <MiddlePanelContent
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            email={email}
            subject={subject}
            setSubject={setSubject}
            content={content}
            setContent={setContent}
            scheduleTime={scheduleTime}
            setScheduleTime={setScheduleTime}
            handleTestEmail={handleTestEmail}
            isSending={isSending}
          />
        </ResizablePanel>
        {isDesktop && <ResizableHandle withHandle />}
        <ResizablePanel>
          <RightPanel
            isSmallScreen={isSmallScreen}
            isVisible={isRightPanelVisible}
            setIsVisible={setIsRightPanelVisible}
          >
            <RightPanelContent content={content} />
          </RightPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
      {isSmallScreen && !isRightPanelVisible && (
        <Button
          onClick={togglePanel}
          className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 bg-primary text-primary-foreground"
        >
          <ArrowLeftFromLine />
        </Button>
      )}
    </div>
  );
}
