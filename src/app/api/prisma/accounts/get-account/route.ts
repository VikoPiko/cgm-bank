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
    const user = await prisma.user.findUnique({
      where: { userId: String(session.userId) },
      select: { userId: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const accountData = await prisma.accounts.findMany({
      where: { userId: user.userId },
    });
    console.log("Account data:", accountData);
    if (!accountData || accountData.length === 0) {
      return NextResponse.json(
        { error: "Account doesn't exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(accountData, { status: 200 });
  } catch (error) {
    console.error("Error fetching account data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
