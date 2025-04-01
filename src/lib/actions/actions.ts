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

export async function login(prevState: any, formData: FormData) {
  // Validate the form data against the schema
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  // If validation fails, return errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Extract the validated data
  const { email, password } = result.data;

  try {
    // Attempt to find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user or invalid password, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        errors: {
          email: "Invalid email or password",
        },
      };
    }

    // Create session if credentials are correct
    const session = await createSession(user.userId, user.role);
    if (session) {
      return NextResponse.redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return {
      errors: {
        general: "An unexpected error occurred. Please try again.",
      },
    };
  }
}
export async function logout() {
  (await cookies()).delete("session");
  return NextResponse.redirect("/login");
}

export async function generatePDF(
  transactions: Transactions[],
  dateFrom?: Date,
  dateTo?: Date
) {
  const data = { dateFrom, dateTo, transactions };
  return data;
}
