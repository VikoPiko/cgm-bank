import { cookies } from "next/headers";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { ThemeProvider } from "@/components/custom/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { decrypt } from "@/lib/sessions";
import prisma from "@/lib/prisma";
import React from "react";
import I18nProvider from "@/components/custom/I18nextProvider";
import { Toaster } from "sonner";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import MainFooter from "@/components/custom/main-app-footer";
import { UserProvider } from "@/components/custom/UserContext";

async function getUserDataFromSession() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("session")?.value;

  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { userId: String(session.userId) },
    select: {
      userId: true,
      email: true,
      password: true,
      address1: true,
      firstName: true,
      lastName: true,
      city: true,
      postalCode: true,
      dateOfBirth: true,
      ssn: true,
      country: true,
      createdAt: true,
      avatar: true,
    },
  });

  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const defaultOpen =
    (await cookieStore).get("sidebar_state")?.value === "true";

  // Get user data from session
  const user = await getUserDataFromSession();
  const userId = user?.userId || ""; // Set userId

  return (
    <html suppressHydrationWarning>
      <body>
        <UserProvider>
          <I18nProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset>
                  <main>
                    <SidebarTrigger />
                    <div className="mb-3 p-3 -mt-2">
                      <DashboardHeader userId={userId} />
                    </div>
                    {children}
                  </main>
                  <MainFooter />
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </I18nProvider>
        </UserProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
