import Link from "next/link";
import { Shield, CreditCard, BarChart3, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainHeader from "@/components/custom/landing-header";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <MainHeader />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Banking that puts you in control
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Secure, transparent, and designed for the way you live
                    today. Open an account in minutes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/open-account">
                    <Button size="lg" className="h-12">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="h-12">
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Bank-level security</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>FDIC Insured</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative h-[450px] w-[350px] rounded-2xl bg-gradient-to-b from-primary/20 to-primary/10 p-1 shadow-xl">
                  <div className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-sm dark:bg-[#242424]">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="font-semibold">CGM Bank</span>
                        </div>
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div className="mt-8 space-y-2">
                        <div className="h-12 rounded-md bg-muted p-2 dark:bg-[#363636]">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Checking Account
                            </span>
                            <span className="font-semibold">$2,458.20</span>
                          </div>
                        </div>
                        <div className="h-12 rounded-md bg-muted p-2 dark:bg-[#363636]">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Savings Account
                            </span>
                            <span className="font-semibold">$12,750.00</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="text-sm font-medium">
                          Recent Transactions
                        </div>
                        <div className="mt-2 space-y-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-md bg-muted/50 dark:bg-[#121212] p-2"
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted">
                                  <Image
                                    src={"/profile.jpg"}
                                    width={32}
                                    height={32}
                                    alt="alt"
                                    className="rounded-xl"
                                  />
                                </div>
                                <div>
                                  <div className="text-xs font-medium">
                                    Merchant Name
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Yesterday
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm font-medium">-$24.99</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Banking for the modern world
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience a new standard in banking with features designed to
                  make your financial life easier.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Smart Cards</h3>
                <p className="mt-2 text-muted-foreground">
                  Virtual and physical cards with advanced controls and
                  real-time notifications.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Financial Insights</h3>
                <p className="mt-2 text-muted-foreground">
                  Powerful analytics to help you understand and optimize your
                  spending habits.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Enhanced Security</h3>
                <p className="mt-2 text-muted-foreground">
                  Advanced encryption and biometric authentication to keep your
                  money safe.
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
                <h3 className="mt-4 text-xl font-bold">Smart Savings</h3>
                <p className="mt-2 text-muted-foreground">
                  Automated savings tools and competitive interest rates to help
                  your money grow.
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
                    <path d="m8 6 4-4 4 4" />
                    <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                    <path d="m20 22-5-5" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold">Instant Transfers</h3>
                <p className="mt-2 text-muted-foreground">
                  Send and receive money instantly, with no hidden fees or
                  waiting periods.
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold">24/7 Support</h3>
                <p className="mt-2 text-muted-foreground">
                  Access to real human support whenever you need it, through
                  multiple channels.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Join thousands of satisfied customers
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our customers love the simplicity, security, and smart features
                that make banking with us a pleasure.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="rounded-lg bg-muted p-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Small Business Owner
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  "CGM Bank has transformed how I manage my business finances.
                  The real-time notifications and spending insights have helped
                  me make better financial decisions."
                </div>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Freelance Designer
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  "The instant transfers and zero fees have been a game-changer
                  for my freelance business. I can now get paid immediately
                  without losing a percentage to processing fees."
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to get started?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Open an account in minutes and experience banking designed for
                  the modern world.
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
                    Get Started
                  </Button>
                </form>
                <p className="text-xs">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
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
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CGM Bank</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Cookies
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              © 2023 CGM Bank. All rights reserved.
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
