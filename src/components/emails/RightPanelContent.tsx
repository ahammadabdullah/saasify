import { EmailPreview } from "@/components/emails/email-preview";

interface RightPanelContentProps {
  content: string;
}

export function RightPanelContent({ content }: RightPanelContentProps) {
  return (
    <div className="h-full overflow-auto">
      <h3 className="text-lg font-semibold text-primary p-3 mt-3">Preview</h3>
      <EmailPreview content={content} />
    </div>
  );
}
