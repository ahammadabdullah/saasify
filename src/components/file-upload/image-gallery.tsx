import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import img from "@/assets/placeholder.svg";

interface ImageGalleryProps {
  images: { id: string; url: string; name: string }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {images.map((image) => (
          <Card key={image.id} className="h-70 w-60">
            <CardContent className="p-2">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <Image
                  src={img}
                  alt={image.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="mt-2 text-sm text-center truncate">{image.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
