// /app/api/logout/route.ts
import { cookies } from "next/headers";

export async function DELETE() {
  (await cookies()).delete("session");

  return new Response("Logged out", { status: 200 });
}
