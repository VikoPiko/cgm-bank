import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { public_token, userId } = await request.json(); // Ensure userId is passed from the frontend

    if (!public_token || !userId) {
      return NextResponse.json(
        { error: "Missing public_token or userId" },
        { status: 400 }
      );
    }

    // Exchange public token for access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // Fetch account details from Plaid
    const accountsResponse = await plaidClient.accountsGet({ access_token: accessToken });

    if (!accountsResponse?.data?.accounts || accountsResponse.data.accounts.length === 0) {
      return NextResponse.json(
        { error: "No accounts found for this bank" },
        { status: 400 }
      );
    }

    const primaryAccount = accountsResponse.data.accounts[0]; // Selecting the first account (modify as needed)


    // Store the bank in the database
    const bank = await prisma.banks.create({
      data: {
        accountId: primaryAccount.account_id, // Use Plaid's unique account ID
        bankId: itemId, // Use Plaid's item ID as bankId
        accessToken: accessToken, // Store Plaid access token securely
        fundingSourceUrl: "", // Optional: Add if integrating with Dwolla or similar
        shareableId: "", // Optional: If you need a public identifier
        userId: userId, // Store the user's ID
      },
    });

    return NextResponse.json({
      message: "Public token exchange complete, bank added",
      bank,
    });
  } catch (error) {
    console.error("Error exchanging public token and saving bank:", error);
    return NextResponse.json(
      { error: "Failed to process bank addition" },
      { status: 500 }
    );
  }
}
