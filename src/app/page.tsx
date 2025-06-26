"use client";
import Link from "next/link";
import { Shield, CreditCard, BarChart3, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainHeader from "@/components/custom/landing-header";
import Image from "next/image";
import { VelocityText } from "@/components/custom/velocity-text";
import { useTranslation } from "react-i18next";
import HeroImage from "@/components/custom/HeroImage";
import { Maname } from "next/font/google";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <MainHeader />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 -mb-10">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {t("bankingHeader")}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t("bankingSubheader")}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/open-account">
                    <Button size="lg" className="h-12">
                      {t("getStarted")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="h-12">
                    {t("learnMore")}
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>{t("bankLevelSecurity")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>{t("fdicInsured")}</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-between">
                <div className="translate-x-[100px] translate-y-[-80px] z-20">
                  <HeroImage />
                </div>
              </div>
            </div>
          </div>
        </section>

        <VelocityText />

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("bankingModernWorld")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("bankingModernSlogan")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{t("smartCards")}</h3>
                <p className="mt-2 text-muted-foreground">{t("smartText")}</p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">
                  {t("financialInsight")}
                </h3>
                <p className="mt-2 text-muted-foreground">{t("financeText")}</p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">
                  {t("enhancedSecurity")}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {t("securityText")}
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold">{t("smartSavings")}</h3>
                <p className="mt-2 text-muted-foreground">{t("savingsText")}</p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m8 6 4-4 4 4" />
                    <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                    <path d="m20 22-5-5" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold">
                  {t("instantTransfers")}
                </h3>
                <p className="mt-2 text-muted-foreground">{t("instantText")}</p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold">{t("24support")}</h3>
                <p className="mt-2 text-muted-foreground">{t("supportText")}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {t("joinText")}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("joinSlogan")}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="rounded-lg bg-muted p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary/10">
                    <Image
                      src="/woman.jpeg"
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{t("name1")}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("title1")}
                    </div>
                  </div>
                </div>
                <div className="mt-4">{t("title1Text")}</div>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-primary/10">
                    <Image
                      src="/man.jpg"
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{t("name2")}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("title2")}
                    </div>
                  </div>
                </div>
                <div className="mt-4">{t("title2Text")}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 dark:text-white text-black">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("readyToStart")}
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  {t("readyToStartSlogan1")}
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                  />
                  <Button type="submit" variant="secondary">
                    {t("getStarted")}
                  </Button>
                </form>
                <p className="text-xs">
                  {t("readyToStartSlogan2")}
                  <Link href="#" className="underline underline-offset-2">
                    {t("termsAndConditions")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Image src="/logo2.svg" width={45} height={35} alt="CGM" />
            <span className="text-lg font-bold">CGM Bank</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t("terms")}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t("privacy")}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t("cookies")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              © 2025 CGM Bank. All rights reserved.
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
