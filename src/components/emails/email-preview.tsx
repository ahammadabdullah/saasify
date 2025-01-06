interface EmailPreviewProps {
  content: string;
}

export function EmailPreview({ content }: EmailPreviewProps) {
  return (
    <div
      className="border p-2 md:p-4 min-h-[200px] md:min-h-[300px] prose max-w-full overflow-auto text-sm md:text-base"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
