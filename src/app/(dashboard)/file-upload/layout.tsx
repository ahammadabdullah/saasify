"use client";

import { Header } from "@/components/file-upload/header";
import { UploadModal } from "@/components/file-upload/upload-modal";
import { UploadStatusDropdown } from "@/components/file-upload/upload-status-dropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetUser from "@/hooks/use-getUser";
import { toast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/supabase/file-upload/fileUpload";
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
  const [user] = useGetUser();
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
        const file = files[index];
        const updateProgress = (progress: number) => {
          setUploads((prev) =>
            prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
          );
        };

        const userEmail = user?.email || "unknown";
        await uploadFile(
          file,
          userEmail,
          "saasify",
          folderName,
          updateProgress
        );

        setUploads((prev) => prev.filter((u) => u.id !== upload.id));
        console.log(`Uploaded: ${upload.name}`);
        toast({
          variant: "default",
          description: `Uploaded ${upload.name} successfully.`,
        });
      } catch (error) {
        console.error(`Error uploading ${upload.name}:`, error);
        setUploads((prev) => prev.filter((u) => u.id !== upload.id));
        toast({
          variant: "destructive",
          description: `Error uploading ${upload.name}. Please try again.`,
        });
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
