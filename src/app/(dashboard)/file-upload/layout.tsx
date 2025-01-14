"use client";

import { Header } from "@/components/file-upload/header";
import { UploadModal } from "@/components/file-upload/upload-modal";
import { UploadStatusDropdown } from "@/components/file-upload/upload-status-dropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { uploadFileToB2 } from "@/lib/b2/b2Utils";
import { usePathname } from "next/navigation";
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

  const path = usePathname();

  const handleUpload = async (files: FileList) => {
    const folderName = path === "/file-upload" ? null : path.split("/")[2];

    const newUploads = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
    }));

    setUploads((prev) => [...prev, ...newUploads]);
    setIsUploadModalOpen(false);

    newUploads.forEach(async (upload, index) => {
      try {
        const file = files[index]; // Correctly map file to each upload
        const fileData = Buffer.from(await file.arrayBuffer()).toString(
          "base64"
        );
        const response = await fetch("/api/v1/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            folderName,
            fileData,
          }),
        });
        if (response.ok) {
          setUploads((prev) => prev.filter((u) => u.id !== upload.id));
          console.log(`Uploaded: ${upload.name}`);
          toast({
            variant: "default",
            description: `Uploaded ${upload.name} successfully.`,
          });
        } else {
          const result = await response.json();
          console.error(
            `Error uploading ${upload.name}:`,
            result.error || "Unknown error"
          );
          toast({
            variant: "destructive",
            description: `Error uploading ${upload.name}. Please try again.`,
          });
          setUploads((prev) => prev.filter((u) => u.id !== upload.id));
        }
      } catch (error) {
        console.error(`Error uploading ${upload.name}:`, error);
      }
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
