import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CreditCard,
  Wallet,
  PiggyBank,
  ArrowRight,
  BadgePercent,
  Home,
  Landmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PersonalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Personal Banking
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Banking solutions designed for your life
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  From everyday checking to saving for your future, we have the
                  right accounts and tools to help you achieve your financial
                  goals.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/open-account">
                    <Button size="lg">
                      Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Compare Accounts
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/personal-banking.jpg"
                  alt="Personal Banking"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Personal Banking Products
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find the right accounts and services to meet your financial
                  needs.
                </p>
              </div>
            </div>

            <Tabs defaultValue="accounts" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="loans">Loans</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>

              <TabsContent value="accounts" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <Wallet className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Everyday Checking</CardTitle>
                      <CardDescription>
                        Simple, convenient banking for your daily needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No minimum balance requirements</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Free online and mobile banking</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Unlimited transactions</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Open Account</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <PiggyBank className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>High-Yield Savings</CardTitle>
                      <CardDescription>
                        Earn more on your savings with competitive rates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>2.50% APY on all balances</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No monthly maintenance fees</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Automatic savings tools</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Open Account</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <BadgePercent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Money Market</CardTitle>
                      <CardDescription>
                        Higher returns with check-writing privileges
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Tiered interest rates based on balance</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Limited check-writing capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>FDIC insured up to $250,000</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Open Account</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cards" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Cash Rewards Card</CardTitle>
                      <CardDescription>
                        Earn cash back on everyday purchases
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>3% cash back on dining and groceries</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>2% on gas and transit</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>1% on all other purchases</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Apply Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Travel Rewards Card</CardTitle>
                      <CardDescription>
                        Earn points for travel with no foreign transaction fees
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>3x points on travel and dining</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No foreign transaction fees</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>50,000 bonus points after spending $3,000</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Apply Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Secured Credit Card</CardTitle>
                      <CardDescription>
                        Build or rebuild your credit with responsible use
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No credit check required</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Security deposit as low as $200</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>
                            Graduate to unsecured card in as little as 6 months
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Apply Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="loans" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <Home className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Mortgage Loans</CardTitle>
                      <CardDescription>
                        Find the right home loan for your needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Competitive fixed and adjustable rates</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>First-time homebuyer programs</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Refinancing options available</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
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
                          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                        </svg>
                      </div>
                      <CardTitle>Auto Loans</CardTitle>
                      <CardDescription>
                        Finance your next vehicle with competitive rates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>New and used vehicle financing</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Flexible terms up to 72 months</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No application fees</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
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
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <CardTitle>Personal Loans</CardTitle>
                      <CardDescription>
                        Flexible financing for your personal needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Borrow up to $50,000</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Fixed monthly payments</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No collateral required</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="investments" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <Landmark className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Retirement Accounts</CardTitle>
                      <CardDescription>
                        Plan for your future with tax-advantaged accounts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Traditional and Roth IRAs</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>401(k) rollovers</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Personalized retirement planning</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
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
                          <path d="M4.5 9.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M9.5 4.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M9.5 14.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M4.5 19.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M14.5 9.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M19.5 4.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M14.5 19.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M19.5 14.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        </svg>
                      </div>
                      <CardTitle>Brokerage Accounts</CardTitle>
                      <CardDescription>
                        Invest in stocks, bonds, ETFs, and more
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Commission-free trading</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Advanced research tools</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Fractional shares available</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
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
                          <path d="M9 12l2 2l4 -4" />
                          <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                        </svg>
                      </div>
                      <CardTitle>Wealth Management</CardTitle>
                      <CardDescription>
                        Personalized financial planning and investment
                        management
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Dedicated financial advisor</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Customized investment strategies</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Estate and tax planning</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/open-account" className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary dark:bg-[#363636] dark:text-white text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Open an account today and experience banking designed for your
                  life.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/open-account" className="w-full">
                  <Button size="lg" className="w-full">
                    Open an Account
                  </Button>
                </Link>
                <p className="text-xs">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-2">
                    Log in
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
              © 2025 CGM bank. All rights reserved.
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
