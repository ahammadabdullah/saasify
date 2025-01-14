"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileIcon } from "@/components/file-upload/file-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// Mock data for demonstration
const mockFiles = [
  { id: "1", name: "document.pdf", size: "2.5 MB", lastModified: "2023-06-15" },
  { id: "2", name: "image.jpg", size: "1.8 MB", lastModified: "2023-06-14" },
  {
    id: "3",
    name: "spreadsheet.xlsx",
    size: "500 KB",
    lastModified: "2023-06-13",
  },
];

export default function FolderContentsPage() {
  const params = useParams();
  const folderName = params.folderName as string;

  const handleDeleteFile = (id: string) => {
    // Implement file deletion logic here
    console.log(`Delete file with id: ${id}`);
  };

  const handleDownloadFile = (id: string) => {
    // Implement file download logic here
    console.log(`Download file with id: ${id}`);
  };

  return (
    <>
      {/* <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/file-upload">File Upload</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/file-upload/${folderName}`}>{folderName}</Link>
        </BreadcrumbItem>
      </Breadcrumb> */}
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockFiles.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <FileIcon
                    extension={file.name.split(".").pop() || ""}
                    className="mr-2 h-5 w-5"
                  />
                  {file.name}
                </div>
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.lastModified}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadFile(file.id)}
                  className="mr-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteFile(file.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
