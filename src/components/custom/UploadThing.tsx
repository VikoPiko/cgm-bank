"use client";

import { UploadButton } from "@/lib/uploadthing";

export default function Upload() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="flex h-20 flex-col items-center justify-between">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
