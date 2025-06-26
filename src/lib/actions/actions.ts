"use server";

import { z } from "zod";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createSession } from "../sessions";
import { Transactions } from "@prisma/client";
import { NextResponse } from "next/server";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .trim()
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .nonempty({ message: "Password is required" }),
});

type LoginResult =
  | { errors: { email?: string; password?: string; general?: string } }
  | { redirect: string };

export async function login(
  prevState: any,
  formData: FormData
): Promise<LoginResult> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as {
        email?: string;
        password?: string;
      },
    };
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        errors: {
          email: "Invalid email or password",
        },
      };
    }

    const session = await createSession(user.userId, user.role);
    if (session) {
      return { redirect: "/dashboard" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return {
      errors: {
        general: "An unexpected error occurred. Please try again.",
      },
    };
  }

  return {
    errors: {
      general: "Something went wrong.",
    },
  };
}

export async function logout() {
  (await cookies()).delete("session");
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL));
}

export async function generatePDF(
  transactions: Transactions[],
  dateFrom?: Date,
  dateTo?: Date
) {
  const data = { dateFrom, dateTo, transactions };
  return data;
}
