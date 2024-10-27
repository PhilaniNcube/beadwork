"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";

export default function CategoryImageUploader({ setCategoryUrl }: { setCategoryUrl: (url: string) => void }) {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log({ data, uploadError });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);
      setUploadedUrl(publicUrl);
      setCategoryUrl(publicUrl);
    } catch (error) {
      setError("Error uploading file");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full p-6 mt-8 bg-slate-200 mb-2 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Category Image Uploader</h2>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-4"
      />
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="object-cover mb-4 rounded h-44 aspect-square"
        />
      )}
      <Button
        onClick={uploadFile}
        disabled={!file || uploading}
        className="w-full mb-4"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {uploading && <Progress value={progress} className="mb-4" />}
      {uploadedUrl && (
        <Alert className="mb-4">
          <AlertTitle>Upload Successful!</AlertTitle>

        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>

        </Alert>
      )}
    </div>
  );
}
