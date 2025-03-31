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
        notifications: true,
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

    const accessToken = userData.banks?.[0].accessToken;
    console.log(accessToken);
    let plaidData = null;

    if (accessToken) {
      try {
        const plaidResponse = await plaidClient.accountsBalanceGet({
          access_token: accessToken,
        });
        plaidData = plaidResponse.data.accounts;
        // console.log("Plaid accounts:", plaidData.accounts);
        console.log("Plaid data:", plaidData);
      } catch (error) {
        console.error("Error fetching plaid data", error);
      }
    }
    // console.log(userData, "\n Plaid Data: ", plaidData);
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
