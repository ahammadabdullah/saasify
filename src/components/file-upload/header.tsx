import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface HeaderProps {
  onUploadClick: () => void;
}

export function Header({ onUploadClick }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">My Documents</h1>
      <Button onClick={onUploadClick}>
        <Upload className="mr-2 h-4 w-4" /> Upload File
      </Button>
    </div>
  );
}
