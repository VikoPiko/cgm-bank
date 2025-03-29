import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const data = await req.json();

  if (!data || !data.id) {
    return NextResponse.json("ID is required", { status: 400 });
  }

  try {
    const updated = await prisma.notifications.update({
      where: {
        id: data.id,
      },
      data: {
        isRead: data.isRead,
      },
    });

    return NextResponse.json(updated, { status: 201 });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json("Error updating", { status: 500 });
  }
}
