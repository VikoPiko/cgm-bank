import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAccountNumber } from "@/lib/actions/user.actions";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const existingAccount = await prisma.accounts.findUnique({
      where: { accountNumber: data.accountNumber },
    });

    if (existingAccount) {
      return NextResponse.json(
        { error: "An account with this data already exists" },
        { status: 400 }
      );
    }

    const newAccount = await prisma.accounts.create({
      data: { ...data, accountNumber: generateAccountNumber() },
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create an account" },
      { status: 500 }
    );
  }
}
