import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const notifications = await prisma.notifications.findMany({
      where: { userId: userId },
    });

    console.log("notifications data:", notifications);

    if (!notifications || notifications.length === 0) {
      return NextResponse.json(
        { error: "No notifications found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Error fetching Bank data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
