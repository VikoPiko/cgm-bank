import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (data) {
      const user = await prisma.user.update({
        where: {
          userId: data.userId,
        },
        data: { ...data },
      });
      return NextResponse.json(user, { status: 201 }); // Correct the placement
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 }); // Handle missing or invalid data properly
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update the user" },
      { status: 500 }
    );
  }
}
