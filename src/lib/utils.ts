import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUser() {
  const user = await prisma.user.findFirst({
    where: {
      userId: "d077ee10-bbab-4be4-995e-b8fa7fef0bef",
    },
  });

  if (user == null) {
    return "Unable to Find user";
  }

  return user;
}
