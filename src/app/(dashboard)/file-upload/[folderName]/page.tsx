"use client";

import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FileList } from "@/components/file-upload/file-list";
import useGetUser from "@/hooks/use-getUser";
import { useState } from "react";
import {
  deleteFile,
  downloadFile,
  getFilesByFolder,
} from "@/lib/supabase/file-upload/fileUpload";
import { useQuery } from "@tanstack/react-query";

// Mock data
const mockFiles = [
  { id: "1", fileName: "report.pdf", file_path: "report.pdf" },
  {
    id: "2",
    fileName: "presentation.pptx",
    file_path: "presentation.pptx",
  },
  { id: "3", fileName: "data.xlsx", file_path: "data.xlsx" },
  { id: "4", fileName: "notes.txt", file_path: "notes.txt" },
];

export default function FolderContentsPage() {
  const [files, setFiles] = useState<any>(mockFiles);
  const params = useParams();
  const folderName = params.folderName as string;
  const [user] = useGetUser();
  const { data, isLoading, refetch, isPending } = useQuery({
    queryKey: ["folderFiles", folderName, user?.email],
    queryFn: async () => {
      const files = await getFilesByFolder(
        folderName,
        user?.email || "unknown"
      );
      return files.map((file: any) => ({
        ...file,
        fileName: file.file_path.replace(`${folderName}/`, ""),
      }));
    },
  });

  const handleDeleteFile = async (filePath: string, id: string) => {
    const res = await deleteFile(filePath, id);
    setFiles((prevFiles: any) =>
      prevFiles.filter((file: any) => file.file_path !== filePath)
    );
    refetch();
  };

  const handleDownloadFile = async (filePath: string) => {
    await downloadFile(filePath);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/file-upload">File Upload</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link href={`/file-upload/${folderName}`}>{folderName}</Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FileList
        files={data || []}
        onDeleteFile={handleDeleteFile}
        onDownloadFile={handleDownloadFile}
      />
    </>
  );
}
