import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/sessions";

const protectedRoutes = [
  "/account",
  "/notifications",
  "/dashboard",
  "/settings",
  "/my-banks",
  "/testing",
];
const publicRoutes = ["/login", "/sign-in", "/", "/personal"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const url = new URL(req.url);
  const res = NextResponse.next();
  if (url.pathname.startsWith("/api/uploadthing")) return res;

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  console.log("session: ", session);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
