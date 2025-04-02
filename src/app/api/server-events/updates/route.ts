import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "@/lib/sessions";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("session")?.value;
    if (!cookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const session = await decrypt(cookie);
    const userId = session?.userId as string;
    if (!userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("event: connect\n\n"));

        const interval = setInterval(async () => {
          try {
            const notifications = await prisma.notifications.findMany({
              where: { userId },
              orderBy: { createdAt: "desc" },
              take: 15, // Fetch the last 15 notifications
            });
            const transactions = await prisma.transactions.findMany({
              where: { userId },
              orderBy: { createdAt: "desc" },
              take: 20,
            });
            // Get the last 5 notifications for mobile
            const mobileNotifications = notifications.slice(0, 5);
            const spendingBreakdown = await prisma.transactions.groupBy({
              by: ["category"],
              where: {
                userId: userId,
              },
              _sum: {
                amount: true,
              },
            });
            const latestData = {
              notifications,
              mobileNotifications,
              transactions,
              spendingBreakdown,
              accounts: await prisma.accounts.findMany({
                where: { userId },
                orderBy: { updatedAt: "desc" },
              }),
            };

            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(latestData)}\n\n`)
            );
          } catch (error) {
            console.error("SSE Error:", error);
          }
        }, 5000);

        req.signal.addEventListener("abort", () => {
          clearInterval(interval);
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
