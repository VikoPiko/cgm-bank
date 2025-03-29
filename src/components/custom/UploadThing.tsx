"use client";

import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useUser } from "./UserContext";
import { twMerge } from "tailwind-merge";

export default function Upload() {
  const { refreshUser } = useUser();
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="flex h-20 flex-col items-center justify-between">
      <UploadButton
        appearance={{
          button: {
            background: "transparent",
            padding: "5px",
            height: "35px",
            fontSize: "14px",
            color: "#fff",
            border: "1px solid #424242",
          },
          container: {
            display: "flex",
            background: "transparent",
          },
        }}
        content={{
          button({ ready }) {
            if (ready) return <div>Upload Image</div>;
          },
          allowedContent({ ready, fileTypes, isUploading }) {
            if (!ready) return "Checking what you allow";
            if (isUploading) return "Seems like uplading your photo";
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          toast.success("Image uploaded successfully.");
          refreshUser();
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          toast.error("An error occured while uploading.");
        }}
        config={{ cn: twMerge }}
      />
    </main>
  );
}
