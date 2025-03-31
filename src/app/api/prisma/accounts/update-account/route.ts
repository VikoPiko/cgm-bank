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

        const type = data.amount > 0 ? "DEPOSIT" : "WITHDRAW";
        const transactionSender = await prisma.transactions.create({
          data: {
            userId: data.userId,
            accountId: updatedAccount.accountNumber as string,
            amount: data.amount,
            transactionType: type,
            balanceAfter: updatedAccount.availableBalance,
            category: data.amount > 0 ? "Income" : "Deposit",
            description: `${type.charAt(0) + type.slice(1).toLowerCase()} of ${
              data.amount
            }$ successful.`,
            image: "DollarSign",
            channel: "Notification",
          },
        });

        const notification = await prisma.notifications.create({
          data: {
            userId: data.userId,
            type: "transaction",
            event: "Deposit",
            message: `You ${type.toLowerCase()}ed ${data.amount}$`,
            isRead: false,
            icon: data.amount > 0 ? "ArrowUp" : "ArrowDown",
            iconBg: data.amount > 0 ? "bg-green-100" : "bg-red-100",
            iconColor: data.amount > 0 ? "text-green-600" : "text-red-600",
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
