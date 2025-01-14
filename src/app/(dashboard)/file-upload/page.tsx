"use client";

import { useState } from "react";

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

export default function FileUploadPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState(mockFolders);

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
    </div>
  );
}
