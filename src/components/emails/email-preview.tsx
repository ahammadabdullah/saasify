interface EmailPreviewProps {
  content: string;
}

export function EmailPreview({ content }: EmailPreviewProps) {
  return (
    <div className="bg-primary text-secondary p-5 rounded-lg shadow-md m-5">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
