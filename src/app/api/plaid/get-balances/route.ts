import { plaidClient } from "@/lib/plaid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();
    const plaidRequest = {
      access_token: accessToken,
    };

    const plaidResponse = await plaidClient.accountsBalanceGet(plaidRequest);
    return NextResponse.json(plaidResponse.data);
  } catch (error) {
    console.error("Error fetching Plaid balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance data" },
      { status: 500 }
    );
  }
}
