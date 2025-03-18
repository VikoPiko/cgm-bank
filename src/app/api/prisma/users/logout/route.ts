// /app/api/logout/route.ts
import { cookies } from "next/headers";

export async function DELETE() {
  // Delete the session cookie
  cookies().delete("session");

  return new Response("Logged out", { status: 200 });
}
