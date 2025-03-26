import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/sessions";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("session")?.value;
    if (!cookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Fetch user along with accounts and banks
    const userData = await prisma.user.findUnique({
      where: { userId: String(session.userId) },
      include: {
        accounts: true, // Include user's accounts
        banks: true, // Include user's linked banks
      },
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return combined user data
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
