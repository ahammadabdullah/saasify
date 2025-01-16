"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageGallery } from "@/components/file-upload/image-gallery";
import { FolderList } from "@/components/file-upload/folder-list";
import useGetUser from "@/hooks/use-getUser";
import {
  deleteFile,
  downloadFile,
  getUserFiles,
} from "@/lib/supabase/file-upload/fileUpload";
import { FileList } from "@/components/file-upload/file-list";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Mock data for demonstration
const mockImages = [
  { id: "1", url: "/assets/placeholder.svg", name: "Image 1" },
  { id: "2", url: "/assets/placeholder.svg", name: "Image 2" },
  { id: "3", url: "/assets/placeholder.svg", name: "Image 3" },
  { id: "4", url: "/assets/placeholder.svg", name: "Image 4" },
];

const mockFolders = [
  { id: "1", name: "Documents" },
  { id: "2", name: "Images" },
  { id: "3", name: "Projects" },
];
const mockFiles = [
  { id: "1", name: "report.pdf" },
  {
    id: "2",
    name: "presentation.pptx",
  },
  { id: "3", name: "data.xlsx" },
  { id: "4", name: "notes.txt" },
];

export default function FileUploadPage() {
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState(mockFolders);
  const [foldersFiles, setFolderFiles] = useState<any>({});
  const [files, setFiles] = useState<any>(mockFiles);
  const [user] = useGetUser();

  const fetchUserFiles = async (email: string) => {
    const data = await getUserFiles(email);
    const rootFiles: any[] = [];
    const folderFiles: Record<string, any[]> = {};

    data.forEach((file) => {
      const filePath = file.file_path;
      if (filePath.includes("/")) {
        const [folderName, fileName] = filePath.split("/", 2);
        if (!folderFiles[folderName]) {
          folderFiles[folderName] = [];
        }
        folderFiles[folderName].push({ ...file, fileName });
      } else {
        rootFiles.push({ ...file, fileName: filePath });
      }
    });

    return { rootFiles, folderFiles };
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userFiles", user?.email],
    queryFn: () => fetchUserFiles(user?.email || ""),
  });
  useEffect(() => {
    if (data) {
      setFiles(data.rootFiles);
      if (Object.keys(data.folderFiles).length > 0) {
        setFolders(
          Object.keys(data.folderFiles).map((folderName) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: folderName,
          }))
        );
        setFolderFiles(data.folderFiles);
      }
    }
  }, [data]);

  const handleDeleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Math.random().toString(36).substr(2, 9),
        name: newFolderName.trim(),
      };
      setFolders((prev) => [...prev, newFolder]);
      setNewFolderName("");
    }
  };
  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     if (user?.email) {
  //       const data = await getUserFiles(user.email);
  //       console.log("Fetched data", data);

  //       const rootFiles = [] as any;
  //       const folderFiles = {} as any;

  //       data.forEach((file) => {
  //         const filePath = file.file_path;

  //         if (filePath.includes("/")) {
  //           const [folderName, fileName] = filePath.split("/", 2);
  //           if (!folderFiles[folderName]) {
  //             folderFiles[folderName] = [];
  //           }
  //           folderFiles[folderName].push({ ...file, fileName });
  //         } else {
  //           rootFiles.push({ ...file, fileName: filePath });
  //         }
  //       });

  //       setFiles(rootFiles);
  //       if (Object.keys(folderFiles).length > 0) {
  //         setFolders(
  //           Object.keys(folderFiles).map((folderName) => ({
  //             id: Math.random().toString(36).substr(2, 9),
  //             name: folderName,
  //           }))
  //         );
  //       }
  //       setFolderFiles(folderFiles);
  //     }
  //   };
  //   fetchFiles();
  // }, [user?.email]);

  const handleDeleteFile = async (filePath: string, id: string) => {
    const res = await deleteFile(filePath, id);
    setFiles((prevFiles: any) =>
      prevFiles.filter((file: any) => file.file_path !== filePath)
    );
    refetch();
  };

  const handleDownloadFile = async (filePath: string) => {
    const res = await downloadFile(filePath);
    console.log(res);
  };
  return (
    <div className="space-y-8 mt-6">
      <ImageGallery images={mockImages} />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Folders</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add folder</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </DialogContent>
        </Dialog>
      </div>
      <FolderList folders={folders} onDeleteFolder={handleDeleteFolder} />
      <FileList
        files={files}
        onDeleteFile={handleDeleteFile}
        onDownloadFile={handleDownloadFile}
      />
    </div>
  );
}
