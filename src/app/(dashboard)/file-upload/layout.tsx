"use client";

import { Header } from "@/components/file-upload/header";
import { UploadModal } from "@/components/file-upload/upload-modal";
import { UploadStatusDropdown } from "@/components/file-upload/upload-status-dropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function FileUploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploads, setUploads] = useState<
    { id: string; name: string; progress: number }[]
  >([]);
  const handleUpload = (files: FileList) => {
    const newUploads = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
    }));
    setUploads((prev) => [...prev, ...newUploads]);
    setIsUploadModalOpen(false);

    // Simulate upload progress
    newUploads.forEach((upload) => {
      const interval = setInterval(() => {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === upload.id
              ? { ...u, progress: Math.min(u.progress + 10, 100) }
              : u
          )
        );
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setUploads((prev) => prev.filter((u) => u.id !== upload.id));
      }, 5000);
    });
  };

  return (
    <ScrollArea className="flex-1 min-h-[calc(100vh-70px)] px-10">
      <div className="mt-4">
        <Header onUploadClick={() => setIsUploadModalOpen(true)} />
      </div>
      <UploadStatusDropdown uploads={uploads} />
      <div className="container py-6">{children}</div>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </ScrollArea>
  );
}
