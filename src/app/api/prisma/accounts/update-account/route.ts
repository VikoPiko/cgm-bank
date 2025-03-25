import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    if (data) {
      const account = await prisma.accounts.findFirst({
        where: { userId: data.userId },
      });

      if (account) {
        const updatedAccount = await prisma.accounts.update({
          where: { id: account.id },
          data: {
            availableBalance: account.availableBalance + data.amount,
          },
        });

        return new Response(JSON.stringify(updatedAccount), { status: 200 });
      } else {
        return new Response("Account not found", { status: 404 });
      }
    }
  } catch (error) {
    console.error("Error updating account:", error);
    return new Response("Failed to update account", { status: 500 });
  }
}
