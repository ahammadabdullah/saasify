import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, Folder, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface FolderListProps {
  folders: { id: string; name: string }[];
  onDeleteFolder: (id: string) => void;
}

export function FolderList({ folders, onDeleteFolder }: FolderListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Folders</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Card key={folder.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <Link
                href={`/file-upload/${folder.name}`}
                className="flex items-center flex-grow"
              >
                <Folder className="mr-2 h-5 w-5" />
                <span className="truncate">{folder.name}</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDeleteFolder(folder.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
