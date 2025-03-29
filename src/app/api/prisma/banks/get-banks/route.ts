import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const bankData = await prisma.banks.findMany({
      where: { userId: userId },
    });

    console.log("Bank data:", bankData);

    if (!bankData || bankData.length === 0) {
      return NextResponse.json(
        { error: "No banks found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(bankData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Bank data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
