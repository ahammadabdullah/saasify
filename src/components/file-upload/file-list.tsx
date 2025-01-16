import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon } from "@/components/file-upload/file-icon";

interface File {
  id: string;
  fileName: string;
  file_path: string;
}

interface FileListProps {
  files: File[];
  onDeleteFile: (file_path: string, id: string) => void;
  onDownloadFile: (id: string) => void;
}

export function FileList({
  files,
  onDeleteFile,
  onDownloadFile,
}: FileListProps) {
  console.log(files, "files");
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <Card key={file.id}>
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <FileIcon
                extension={file?.fileName?.split(".").pop() || ""}
                className="h-8 w-8"
              />
              <p
                className="text-sm font-medium truncate"
                style={{ maxWidth: "150px" }}
              >
                {file.fileName}
              </p>
            </div>
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onDownloadFile(file.file_path)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteFile(file.file_path, file.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
