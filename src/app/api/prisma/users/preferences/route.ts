import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const preferences = await prisma.userPreferences.findFirst({
      where: {
        userId: data.userId,
      },
    });
    console.log(preferences);
    return NextResponse.json({ preferences, status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (data) {
      const newPreferences = await prisma.userPreferences.update({
        where: {
          preferenceId: data.preferenceId,
        },
        data: { ...data },
      });
      return NextResponse.json(newPreferences, { status: 201 }); // Correct the placement
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 }); // Handle missing or invalid data properly
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}
