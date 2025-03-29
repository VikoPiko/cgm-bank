import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CreditCard,
  BarChart3,
  Lock,
  ArrowRight,
  Smartphone,
  Wallet,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Features
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful features designed for modern banking
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the innovative tools and services that make CGM Bank
                  the smart choice for your financial needs.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/open-account">
                    <Button size="lg">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/features.jpg"
                  alt="Banking Features"
                  fill
                  className="object-fill"
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
                  Core Banking Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the innovative tools that make banking with us simple,
                  secure, and smart.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg  hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Mobile Banking</CardTitle>
                  <CardDescription>
                    Bank anytime, anywhere with our award-winning mobile app
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Check balances and transaction history</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Deposit checks with mobile capture</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Send money to friends and family</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg  hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Cards</CardTitle>
                  <CardDescription>
                    Advanced card controls and features for secure spending
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Lock/unlock cards instantly</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Set spending limits by category</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Virtual cards for online shopping</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Financial Insights</CardTitle>
                  <CardDescription>
                    Understand your spending and save more effectively
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Categorized spending analysis</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Budget creation and tracking</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Personalized saving recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Enhanced Security</CardTitle>
                  <CardDescription>
                    Advanced protection for your financial information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Biometric authentication</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Real-time fraud monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Encrypted data transmission</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Savings</CardTitle>
                  <CardDescription>
                    Automated tools to help your money grow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Round-up savings on purchases</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Automated savings rules</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Goal-based savings accounts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Alerts</CardTitle>
                  <CardDescription>
                    Stay informed about your account activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Transaction notifications</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Low balance alerts</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary mt-0.5" />
                      <span>Suspicious activity warnings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Mobile Banking Experience
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our award-winning mobile app puts banking at your fingertips
                  with intuitive design and powerful features.
                </p>
                <div className="space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left font-medium">
                        Easy Account Management
                      </AccordionTrigger>
                      <AccordionContent>
                        View balances, transaction history, and account details
                        at a glance. Transfer funds between accounts, pay bills,
                        and deposit checks with just a few taps.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-medium">
                        Secure Authentication
                      </AccordionTrigger>
                      <AccordionContent>
                        Log in quickly and securely with facial recognition,
                        fingerprint scanning, or traditional PIN methods. All
                        data is encrypted and protected with industry-leading
                        security protocols.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-medium">
                        Financial Tools
                      </AccordionTrigger>
                      <AccordionContent>
                        Access budgeting tools, spending analysis, and
                        personalized insights to help you make smarter financial
                        decisions. Set savings goals and track your progress
                        over time.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-medium">
                        Card Controls
                      </AccordionTrigger>
                      <AccordionContent>
                        Manage your debit and credit cards directly from the
                        app. Lock or unlock cards, set spending limits, receive
                        transaction alerts, and create virtual cards for online
                        shopping.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="pt-4">
                  <Link href="/open-account">
                    <Button>
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto h-[500px] w-[250px] md:h-[600px] md:w-[300px]">
                <div className="absolute inset-0 rounded-[40px] border-8 border-black bg-black">
                  <div className="absolute inset-0 rounded-[32px] overflow-hidden">
                    <Image
                      src="/app-photo.png"
                      alt="Mobile Banking App"
                      fill
                      className="object-scale-down"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary dark:bg-[#363636] dark:text-white text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Experience the difference
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of satisfied customers who have switched to CGM
                  Bank.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/open-account" className="w-full">
                  <Button size="lg" variant="secondary" className="w-full">
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
