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
    const { data: existingFiles, error: listError } = await supabase.storage
      .from(bucketName)
      .list(folderName || "", {
        search: file.name,
      });
    console.log(existingFiles, "existingFiles");
    if (listError) {
      console.error("Error listing files:", listError);
    } else if (existingFiles?.length > 0) {
      console.log("File already exists, skipping upload...");
      throw new Error("File already exists");
    }
    const estimatedTime = Math.min(file.size / 50000, 10) * 1000;
    let progress = 0;
    const updateInterval = 100;
    const progressStep = 100 / (estimatedTime / updateInterval);

    // Track progress
    const progressTimer = setInterval(() => {
      progress = Math.min(progress + progressStep, 100);
      setProgress(Math.round(progress));
    }, updateInterval);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    clearInterval(progressTimer);
    setProgress(100);

    if (error) {
      throw error;
    }

    const { data: dbData, error: dbError } = await supabase
      .from("user_files")
      .insert([
        {
          user_email: userEmail,
          file_path: data.path,
          bucket_name: bucketName,
        },
      ]);
    console.log("dbData", dbData);
    if (dbError) {
      console.error("Database insert error:", dbError);
      throw dbError;
    } else {
      console.log("File uploaded successfully, reference stored:", dbData);
      return { success: true, message: "Upload complete", fileData: dbData };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, message: "Upload failed", error };
  }
}

export const getUserFiles = async (userEmail: string) => {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("user_files")
    .select("file_path, created_at, id")
    .eq("user_email", userEmail);

  if (error) {
    console.error("Error fetching user files:", error);
    return [];
  }

  return data;
};

export const deleteFile = async (filePath: string, fileId: string) => {
  try {
    const supabase = getSupabaseBrowserClient();

    const { error: storageError } = await supabase.storage
      .from("saasify")
      .remove([filePath]);

    if (storageError) {
      console.error("Error deleting file from storage:", storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("user_files")
      .delete()
      .eq("id", fileId);
    if (dbError) {
      console.error(
        "Error deleting file record from database:",
        dbError.message
      );
      return;
    }
    console.log("File deleted successfully");
  } catch (err) {
    console.error("Unexpected error deleting file:", err);
  }
};

export const downloadFile = async (filePath: string) => {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.storage
    .from("saasify")
    .download(filePath);

  if (error) {
    console.error("Error downloading file:", error.message);
    return;
  }

  const url = window.URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filePath.split("/").pop() || "download";
  a.click();
  a.remove();
};
