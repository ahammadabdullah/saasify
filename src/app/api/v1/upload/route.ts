import { uploadFileToB2 } from "@/lib/b2/b2Utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, folderName, fileData } = body;

    if (!fileName || !fileData) {
      return NextResponse.json(
        { error: "Missing required file data" },
        { status: 400 }
      );
    }

    const bucketId = process.env.NEXT_PUBLIC_B2_BUCKET_ID;
    if (!bucketId) {
      return NextResponse.json(
        { error: "Bucket ID is not defined" },
        { status: 500 }
      );
    }

    const uploadResponse = await uploadFileToB2({
      fileName,
      fileData: Buffer.from(fileData, "base64"),
      bucketId,
      folderName,
    });
    return NextResponse.json({
      message: "File uploaded successfully",
      data: uploadResponse.data,
    });
  } catch (error: any) {
    const errorDetails = {
      message: error.message || "Something went wrong",
      stack: error.stack || "No stack available",
    };

    return NextResponse.json(errorDetails, { status: 500 });
  }
}
