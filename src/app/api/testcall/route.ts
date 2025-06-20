import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/sessions";
import { plaidClient } from "@/lib/plaid";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("session")?.value;
    if (!cookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: { userId: String(session.userId) },
      include: {
        accounts: true,
        banks: true,
        preferences: true,
        notifications: {
          orderBy: {
            createdAt: "desc",
          },
        },
        transactions: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let plaidData: any[] = []; // Initialize an array to store data for multiple banks
    for (const bank of userData.banks) {
      if (bank && bank.accessToken) {
        // Check that bank is not null and accessToken is available
        const accessToken = bank.accessToken;
        try {
          const plaidResponse = await plaidClient.accountsBalanceGet({
            access_token: accessToken,
          });
          plaidData.push(...plaidResponse.data.accounts); // Append the accounts data to the plaidData array
        } catch (error) {
          console.error(
            `Error fetching Plaid data for bank ${bank.bankId}`,
            error
          );
        }
      } else {
        console.warn("Skipping invalid bank or missing accessToken");
      }
    }

    // Return the user data along with optional Plaid balances (if available)
    return NextResponse.json(
      { userData, plaidBalances: plaidData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
