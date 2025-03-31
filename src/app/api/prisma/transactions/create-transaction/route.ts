import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { officialName, ...transactionData } = data;
    if (!data.userId || !data.amount) {
      return NextResponse.json(
        { error: "Invalid transaction data" },
        { status: 400 }
      );
    }

    // Create the transaction record
    const transaction = await prisma.transactions.create({
      data: transactionData,
    });

    // Retrieve the account to get the current balance
    const account = await prisma.accounts.findUnique({
      where: { accountNumber: data.accountId },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Calculate the updated balance based on the transaction type
    let updatedBalance = account.availableBalance;

    if (data.transactionType === "DEPOSIT") {
      updatedBalance += data.amount; // Increase balance for deposit
    } else if (
      data.transactionType === "WITHDRAW" ||
      data.transactionType === "PAYMENT" ||
      data.transactionType === "TRANSFER"
    ) {
      updatedBalance -= data.amount; // Decrease balance for withdrawal
    }

    // Ensure the account doesn't go into a negative balance for withdrawals
    if (updatedBalance < 0) {
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 }
      );
    }

    // Update the account balance
    await prisma.accounts.update({
      where: { accountNumber: data.accountId },
      data: {
        availableBalance: updatedBalance,
      },
    });

    const notification = await prisma.notifications.create({
      data: {
        userId: data.userId,
        type: "transaction",
        event: `${data.transactionType}`,
        message: `${data.transactionType} of $${data.amount} to ${officialName} was processed successfully`,
        isRead: false,
        icon: "DollarSign",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
