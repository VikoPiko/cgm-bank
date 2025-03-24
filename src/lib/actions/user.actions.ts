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

export async function generateAccountNumber() {
  const accountRandomNumber = Math.floor(
    1000000000 + Math.random() * 9000000000
  );

  const existingAccount = await prisma.accounts.findUnique({
    where: { accountNumber: accountRandomNumber.toString() },
  });

  if (existingAccount) {
    return generateAccountNumber();
  }

  return accountRandomNumber.toString();
}

export async function generateRoutingNumber() {
  const routingNumber = Math.floor(
    10000000 + Math.random() * 90000000
  ).toString();
  const checksum = calculateChecksum(routingNumber);
  return routingNumber + checksum;
}

function calculateChecksum(routingNumber: string) {
  // Checksum is calculated using a specific ABA formula:
  // (3 * (1st, 4th, 7th digits) + 7 * (2nd, 5th, 8th digits) + (3rd, 6th) digits) % 10 = 0
  const digits = routingNumber.split("").map(Number);
  const checksumValue =
    (3 * (digits[0] + digits[3] + digits[6]) +
      7 * (digits[1] + digits[4] + digits[7]) +
      (digits[2] + digits[5])) %
    10;
  return (10 - checksumValue) % 10; // Adjust to make it modulo 10 = 0
}
