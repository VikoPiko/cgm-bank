import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
  generateAccountNumber,
  generateIBAN,
  generateRoutingNumber,
} from "@/lib/actions/user.actions";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }
    const accountNumber = await generateAccountNumber();
    const routingNumber = await generateRoutingNumber();
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
        preferences: {
          create: {},
        },
        accounts: {
          create: {
            accountNumber: accountNumber,
            routingNumber: routingNumber,
            iban: generateIBAN(accountNumber),
            name: "Main Account",
            mask: "**** **** **** 5167",
            officialName: "Primary Checking Account",
          },
        },
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create a user" },
      { status: 500 }
    );
  }
}
