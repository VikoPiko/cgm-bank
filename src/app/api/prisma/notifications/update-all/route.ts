import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { ids, isRead } = await req.json();

    await prisma.notifications.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isRead,
      },
    });

    return NextResponse.json(
      { message: "Notifications updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}
