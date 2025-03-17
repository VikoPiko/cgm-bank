import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // You can validate again here with Zod if needed

    // Simulate user creation
    console.log("User created:", body);

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
