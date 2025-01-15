import { getSupabaseBrowserClient } from "../client";

export async function uploadFile(
  file: File,
  userEmail: string,
  bucketName: string,
  folderName: string | null,
  setProgress: (progress: number) => void
) {
  try {
    const supabase = getSupabaseBrowserClient();
    const path = folderName ? `${folderName}/${file.name}` : file.name;
    const estimatedTime = Math.min(file.size / 50000, 10) * 1000;
    let progress = 0;
    const updateInterval = 100;
    const progressStep = 100 / (estimatedTime / updateInterval);

    const progressTimer = setInterval(() => {
      progress = Math.min(progress + progressStep, 100);
      setProgress(Math.round(progress));
    }, updateInterval);

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        upsert: true,
      });

    clearInterval(progressTimer);
    setProgress(100);

    if (error) {
      throw error;
    }
    console.log(`File uploaded by: ${userEmail}`);
    return { success: true, message: "Upload complete" };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
