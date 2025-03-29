import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/sessions";
import { NextRequest, NextResponse } from "next/server";

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
    const transactionData = await prisma.transactions.findMany({
      where: {
        userId: session?.userId,
      },
    });
    console.log(transactionData);
    return NextResponse.json(transactionData, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed Fetching", { status: 500 });
  }
}
