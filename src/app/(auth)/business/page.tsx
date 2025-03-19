import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Building2,
  BarChart3,
  ArrowRight,
  Briefcase,
  CreditCard,
  DollarSign,
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

export default function BusinessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Business Banking
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Banking solutions that help your business grow
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  From small startups to established enterprises, we provide the
                  financial tools and services to help your business succeed.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/open-account">
                    <Button size="lg">
                      Open Business Account{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Talk to a Specialist
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Business Banking"
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
                  Business Banking Solutions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive financial services designed for businesses of
                  all sizes.
                </p>
              </div>
            </div>

            <Tabs defaultValue="accounts" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="lending">Lending</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>

              <TabsContent value="accounts" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Business Checking</CardTitle>
                      <CardDescription>
                        Efficient cash management for your daily operations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>No monthly fee with minimum balance</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>500 free transactions per month</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Integrated with accounting software</span>
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
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Business Savings</CardTitle>
                      <CardDescription>
                        Earn interest on your business reserves
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Competitive interest rates</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Easy transfers between accounts</span>
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

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Merchant Services</CardTitle>
                      <CardDescription>
                        Accept payments from your customers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>In-store and online payment processing</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Competitive transaction rates</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Next-day funding available</span>
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

              <TabsContent value="lending" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                          <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z" />
                          <path d="M6 9.01V9" />
                          <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
                        </svg>
                      </div>
                      <CardTitle>Business Loans</CardTitle>
                      <CardDescription>
                        Financing solutions for growth and expansion
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Term loans up to $500,000</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Flexible repayment terms</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Competitive interest rates</span>
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
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <CardTitle>Lines of Credit</CardTitle>
                      <CardDescription>
                        Flexible funding for your business needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Access funds as needed</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Pay interest only on what you use</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Revolving credit up to $250,000</span>
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
                          <path d="M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5Z" />
                          <path d="M12 12h-1a1 1 0 0 0-1 1v4" />
                          <path d="M9 9h.01" />
                          <path d="M15 9h.01" />
                          <path d="M15 12h.01" />
                          <path d="M15 15h.01" />
                          <path d="M15 18h.01" />
                        </svg>
                      </div>
                      <CardTitle>SBA Loans</CardTitle>
                      <CardDescription>
                        Government-backed loans for small businesses
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>SBA 7(a) and 504 loans</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Lower down payments</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Longer repayment terms</span>
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

              <TabsContent value="payments" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Payment Processing</CardTitle>
                      <CardDescription>
                        Accept payments in-store and online
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Credit and debit card processing</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Mobile payment solutions</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>E-commerce integration</span>
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
                          <path d="M16 16v-8" />
                          <path d="M12 16v-4" />
                          <path d="M8 16v-2" />
                          <path d="M3 8h18c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1V9c0-.6.4-1 1-1Z" />
                          <path d="M7 8V6c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2v2" />
                        </svg>
                      </div>
                      <CardTitle>ACH & Wire Transfers</CardTitle>
                      <CardDescription>
                        Efficient electronic payment solutions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Domestic and international wire transfers</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>ACH payment processing</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Recurring payment setup</span>
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
                          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                        </svg>
                      </div>
                      <CardTitle>Invoicing Solutions</CardTitle>
                      <CardDescription>
                        Streamline your billing and payment collection
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Digital invoice creation and delivery</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Automated payment reminders</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Integration with accounting software</span>
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

              <TabsContent value="services" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Cash Management</CardTitle>
                      <CardDescription>
                        Optimize your business cash flow
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Cash flow forecasting</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Liquidity management</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Automated sweeps and transfers</span>
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
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <CardTitle>Fraud Protection</CardTitle>
                      <CardDescription>
                        Safeguard your business from financial fraud
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Check fraud prevention</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>ACH fraud detection</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Real-time transaction monitoring</span>
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
                          <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                          <path d="M12 14H8" />
                          <path d="M12 10H8" />
                          <path d="M16 19h3v-3" />
                          <path d="M21 14v5h-5" />
                          <path d="M16 14 21 19" />
                        </svg>
                      </div>
                      <CardTitle>Payroll Services</CardTitle>
                      <CardDescription>
                        Streamline your employee payment process
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Direct deposit payroll</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Tax filing and reporting</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                          <span>Employee self-service portal</span>
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

        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to grow your business?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Open a business account today and access the tools you need to
                  succeed.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/open-account" className="w-full">
                  <Button size="lg" className="w-full">
                    Open Business Account
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
            <span className="text-lg font-bold">SecureBank</span>
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
              © 2023 SecureBank. All rights reserved.
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
