import { FileText, Image as ImgIcon, Music, Video, File } from "lucide-react";

interface FileIconProps {
  extension: string;
  className?: string;
}

export function FileIcon({ extension, className }: FileIconProps) {
  switch (extension.toLowerCase()) {
    case "pdf":
    case "doc":
    case "docx":
    case "txt":
      return <FileText className={className} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImgIcon className={className} />;
    case "mp3":
    case "wav":
      return <Music className={className} />;
    case "mp4":
    case "mov":
      return <Video className={className} />;
    default:
      return <File className={className} />;
  }
}
