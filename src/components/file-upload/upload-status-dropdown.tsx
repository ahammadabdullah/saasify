import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface UploadStatus {
  id: string;
  name: string;
  progress: number;
}

interface UploadStatusDropdownProps {
  uploads: UploadStatus[];
}

export function UploadStatusDropdown({ uploads }: UploadStatusDropdownProps) {
  const [open, setOpen] = useState(false);

  if (uploads.length === 0) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-2">
          Uploading {uploads.length} file(s)
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Upload Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {uploads.map((upload) => (
          <div key={upload.id} className="p-2">
            <div className="flex justify-between text-sm">
              <span className="truncate">{upload.name}</span>
              <span>{upload.progress}%</span>
            </div>
            <Progress value={upload.progress} className="mt-1" />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
