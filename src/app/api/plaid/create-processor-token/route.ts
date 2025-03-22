import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments, ProcessorTokenCreateRequestProcessorEnum } from "plaid";
import  prisma from "@/lib/prisma";
import { plaidClient } from "@/lib/plaid";


export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // Retrieve access token from DB
    const bankAccount = await prisma.banks.findFirst({
      where: { userId },
    });

    if (!bankAccount) {
      return NextResponse.json({ error: "Bank account not found" }, { status: 404 });
    }

    // Fetch account ID from Plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bankAccount.accessToken,
    });

    const accountId = accountsResponse.data.accounts[0].account_id;

    // Create processor token
    const processorTokenResponse = await plaidClient.processorTokenCreate({
      access_token: bankAccount.accessToken,
      account_id: accountId,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    });

    return NextResponse.json({ processorToken: processorTokenResponse.data.processor_token });
  } catch (error) {
    console.error("Error creating processor token:", error);
    return NextResponse.json({ error: "Failed to create processor token" }, { status: 500 });
  }
}
