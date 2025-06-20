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
  phoneNumber: z.string().min(8).max(14),
  city: z.string().min(3).max(50),
  postalCode: z.string().min(3).max(6),
  dateOfBirth: z.string().min(3),
  ssn: z.string().min(3).max(10),
  country: z.string().min(2).max(30),
});

export type AuthFormType = z.infer<typeof authFormSchema>;

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export interface PlaidBalance {
  available: number;
  current: number;
  iso_currency_code: string;
}

export interface PlaidAccount {
  account_id: string;
  name: string;
  balances: PlaidBalance;
}

export interface PlaidData {
  accounts: PlaidAccount[];
}
