import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const newNotification = await prisma.notifications.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.log("Error creating:", error);
    return NextResponse.json("Error:", { status: 500 });
  }
}
