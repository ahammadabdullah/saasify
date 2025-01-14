import { cn } from "@/lib/utils";

interface EmailPreviewProps {
  content: string;
}

export function EmailPreview({ content }: EmailPreviewProps) {
  return (
    <div className=" bg-primary text-secondary p-5 rounded-lg shadow-md m-5 max-h-full">
      <div
        className={cn(
          "prose w-full max-w-none overflow-y-scroll ",
          "scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
