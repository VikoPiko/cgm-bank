import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user banks
    const banks = await prisma.banks.findMany({
      where: { userId },
      select: { accessToken: true },
    });

    if (!banks.length) {
      return NextResponse.json({ error: "No banks found" }, { status: 404 });
    }

    return NextResponse.json({ banks });
  } catch (error) {
    console.error("Error fetching user banks:", error);
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 });
  }
}
