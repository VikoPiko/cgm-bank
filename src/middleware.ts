import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/sessions";
import { useUser } from "./components/custom/UserContext";

const protectedRoutes = [
  "/account",
  "/notifications",
  "/dashboard",
  "/settings",
  "/my-banks",
  "/statements",
];

const publicRoutes = ["/login", "/sign-in", "/", "/personal"];
const adminRoutes = ["/testing"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  const url = new URL(req.url);
  const res = NextResponse.next();
  if (url.pathname.startsWith("/api/uploadthing")) return res;

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (isAdminRoute && session?.role != "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
