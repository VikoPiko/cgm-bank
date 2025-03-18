import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/sessions";
import { revalidatePath } from "next/cache";

const f = createUploadthing();

const auth = async (req: Request): Promise<{ id: string } | null> => {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return null;

    const match = cookieHeader.match(/session=([^;]+)/);
    if (!match) return null;

    const sessionCookie = match[1];
    const session = await decrypt(sessionCookie);

    if (!session?.userId) return null;

    return { id: String(session.userId) }; // Ensure userId is a string
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
      minFileCount: 1
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id }; // Explicitly return string
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      const imageUrl = file.ufsUrl;

      // Store the uploaded image URL in the database
      await prisma.user.update({
        where: { userId: metadata.userId }, // Ensure userId is treated as a string
        data: { avatar: imageUrl },
      });
      return {
        name: file.name,
        key: file.key,
        url: imageUrl,
        uploaderId: metadata.userId, // Ensure this is a string
      } as const; // Explicitly set as a valid JSON object
    }),
  } satisfies FileRouter;
  
export type OurFileRouter = typeof ourFileRouter;
