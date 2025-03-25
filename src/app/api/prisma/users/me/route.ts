import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/sessions";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("session")?.value;
    // console.log("Session cookie:", cookie);
    if (!cookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const session = await decrypt(cookie);
    if (!session?.userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { userId: String(session.userId) },
      select: {
        userId: true,
        middleName: true,
        firstName: true,
        lastName: true,
        email: true,
        ssn: true,
        dateOfBirth: true,
        address1: true,
        city: true,
        country: true,
        avatar: true,
        phoneNumber: true,
        initialDeposit: true,
        createdAt: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
