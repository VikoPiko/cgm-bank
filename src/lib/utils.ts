import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  address1: z.string().min(3).max(50),
  firstName: z.string().min(3),
  middleName: z.string().min(3),
  lastName: z.string().min(3),
  phoneNumber: z.string().min(8).max(10),
  city: z.string().min(3).max(50),
  postalCode: z.string().min(3).max(6),
  dateOfBirth: z.string().min(3),
  ssn: z.string().min(3).max(10),
  country: z.string().min(2).max(30),
});

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

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
