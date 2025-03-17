import prisma from "../prisma";

// import {
//   CountryCode,
//   ProcessorTokenCreateRequest,
//   ProcessorTokenCreateRequestProcessorEnum,
//   Products,
// } from "plaid";

// import { plaidClient } from "@/lib/plaid";

interface User {
  email: string;
  password: string;
  address1: string;
  city: string;
  country: string;
  postalCode: string;
  ssn: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
}

export async function createUser(data: User) {
  try {
    const response = await fetch("/api/prisma/users/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error, "Error fetching users");
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error, "Error fetching users");
    throw error;
  }
}

// In a utils file (e.g., `lib/user.ts` or in the `RootLayout.tsx` itself)
export async function getUser() {
  try {
    const response = await fetch("http://localhost:3000/api/prisma/users/me");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser(email: string, data: User) {}

export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.delete({ where: { userId } });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
