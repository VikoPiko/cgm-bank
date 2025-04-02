import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data) {
      let sender = null;
      let reciever = null;
      const method = data.method;
      if (method === "routing") {
        sender = await prisma.accounts.findFirst({
          where: {
            accountNumber: data.senderId,
          },
        });
        reciever = await prisma.accounts.findFirst({
          where: {
            routingNumber: data.recieverId,
          },
        });
      } else {
        sender = await prisma.accounts.findFirst({
          where: {
            iban: data.senderIban,
          },
        });
        reciever = await prisma.accounts.findFirst({
          where: {
            iban: data.recieverIban,
          },
        });
      }

      if (!sender || !reciever) {
        return NextResponse.json(
          { error: "Sender or receiver account not found" },
          { status: 404 }
        );
      }

      let updatedBalanceSender = sender.availableBalance;
      let updatedBalanceReceiver = reciever.availableBalance;

      const senderName = await prisma.user.findFirst({
        where: { userId: sender.userId },
      });

      const receiverName = await prisma.user.findFirst({
        where: { userId: reciever.userId },
      });
      const transactionSender = await prisma.transactions.create({
        data: {
          userId: data.userId,
          accountId: sender?.accountNumber as string,
          amount: data.amount,
          transactionType: data.type,
          transactionDirection: "FROM",
          balanceAfter: updatedBalanceSender - data.amount,
          category: data.category,
          description: `You sent $${data.amount} to ${receiverName?.firstName}: ${reciever.iban} Reason: ${data.message} `,
          image: data.image,
          channel: data.channel,
        },
      });
      const transactionReceiver = await prisma.transactions.create({
        data: {
          userId: reciever.userId,
          accountId: reciever?.accountNumber as string,
          amount: data.amount,
          transactionType: data.type,
          transactionDirection: "TO",
          balanceAfter: updatedBalanceReceiver + data.amount,
          category: data.category,
          description: `You received $${data.amount} from ${
            senderName?.firstName
          }:  ${sender.iban || sender.accountNumber} Reason: ${data.message}`,
          image: data.image,
          channel: data.channel,
        },
      });

      await prisma.accounts.update({
        where: { accountNumber: sender.accountNumber as string },
        data: { availableBalance: sender.availableBalance - data.amount },
      });

      await prisma.accounts.update({
        where: { accountNumber: reciever.accountNumber as string },
        data: { availableBalance: reciever.availableBalance + data.amount },
      });
      await prisma.notifications.createMany({
        data: [
          {
            userId: sender.userId,
            type: "transaction",
            event: "Transfer",
            message: `You sent $${data.amount} to ${receiverName?.firstName} Reason: ${data.message} `,
            isRead: false,
            icon: "ArrowUp",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
          },
          {
            userId: reciever.userId,
            type: "transaction",
            event: "Transfer",
            message: `You received $${data.amount} from ${senderName?.firstName} Reason: ${data.message}`,
            isRead: false,
            icon: "ArrowDown",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
          },
        ],
      });
      return NextResponse.json(
        {
          message: "Transfer successful",
          transactions: [transactionSender, transactionReceiver],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json("Invalid Data provided", { status: 400 });
    }
  } catch (error) {
    return NextResponse.json("Error occurred during transaction", {
      status: 500,
    });
  }
}
