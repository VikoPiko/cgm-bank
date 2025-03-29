import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowRight, MapPin, Phone, Mail, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  About Us
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Banking with a purpose
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  CGM Bank was founded with a simple mission: to create a bank
                  that puts people first. We combine innovative technology with
                  personalized service to deliver a better banking experience.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/open-account">
                    <Button size="lg">
                      Join Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Our Story
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/about.jpg"
                  alt="About CGM Bank"
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
                  Our Story
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From our humble beginnings to becoming a trusted financial
                  partner.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12 space-y-8">
              <div className="grid grid-cols-[1fr_3px_1fr] gap-x-6">
                <div className="space-y-2 text-right">
                  <h3 className="text-xl font-bold">2010</h3>
                  <p className="text-muted-foreground">
                    Founded with a vision to create a more accessible and
                    transparent banking experience.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-primary"></div>
                  <div className="flex-1 w-[3px] bg-primary"></div>
                </div>
                <div></div>
              </div>

              <div className="grid grid-cols-[1fr_3px_1fr] gap-x-6">
                <div></div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-primary"></div>
                  <div className="flex-1 w-[3px] bg-primary"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">2015</h3>
                  <p className="text-muted-foreground">
                    Launched our award-winning mobile banking platform,
                    revolutionizing how customers interact with their finances.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_3px_1fr] gap-x-6">
                <div className="space-y-2 text-right">
                  <h3 className="text-xl font-bold">2018</h3>
                  <p className="text-muted-foreground">
                    Expanded our services to include business banking solutions,
                    helping small businesses thrive.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-primary"></div>
                  <div className="flex-1 w-[3px] bg-primary"></div>
                </div>
                <div></div>
              </div>

              <div className="grid grid-cols-[1fr_3px_1fr] gap-x-6">
                <div></div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-primary"></div>
                  <div className="flex-1 w-[3px] bg-primary"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">2021</h3>
                  <p className="text-muted-foreground">
                    Introduced advanced security features and AI-powered
                    financial insights to help customers make smarter decisions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_3px_1fr] gap-x-6">
                <div className="space-y-2 text-right">
                  <h3 className="text-xl font-bold">Today</h3>
                  <p className="text-muted-foreground">
                    Serving over 1 million customers nationwide with a
                    commitment to innovation, security, and exceptional service.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded-full bg-primary"></div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Leadership Team
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the experienced professionals guiding our vision and
                  strategy.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="relative h-60 w-full">
                  <Image
                    src="/vikopiko.jpg"
                    alt="CEO"
                    fill
                    className="object-cover object-top p-2"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Viktor Pikolov</CardTitle>
                  <CardDescription>Chief Executive Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    With over 20 years of experience (and being alive) in
                    financial services, Viko leads our company with a focus on
                    innovation and customer-centric banking.
                    <br />
                    <sub>And yes, that’s 50 Cent.</sub>
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-60 w-full">
                  <Image
                    src="/elon.jpg"
                    alt="CTO"
                    fill
                    className="object-cover p-2"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Elon Musk</CardTitle>
                  <CardDescription>Chief Technology Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Elon oversees our technology strategy, ensuring we deliver
                    secure, cutting-edge digital banking solutions to our
                    customers. And rockets.... and flamethrowers...
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-60 w-full">
                  <Image
                    src="/warren.jpg"
                    alt="CFO"
                    fill
                    className="object-cover p-2"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Warren Buffet</CardTitle>
                  <CardDescription>Chief Financial Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Warren brings extensive financial expertise to ensure our
                    bank's stability and growth while maintaining the highest
                    standards of fiscal responsibility. And he's old so win win.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Values
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide everything we do.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Customer First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We put our customers at the center of everything we do,
                    designing products and services that meet their real needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
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
                  <CardTitle>Trust & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We maintain the highest standards of security and integrity
                    to protect our customers' financial information and assets.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
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
                      <path d="M12 22v-5" />
                      <path d="M9 8V2" />
                      <path d="M15 8V2" />
                      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
                    </svg>
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We continuously seek new ways to improve our services,
                    embracing technology to create better banking experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:bg-gray-100 dark:hover:bg-[#484848] hover:translate-y-[-8px] transition-all duration-200 ease-in-out">
                <CardHeader className="pb-2">
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
                      <path d="M3 6a9 9 0 0 1 9 9" />
                      <path d="M3 6h4l2 -4" />
                      <path d="M3 6v4l-4 2" />
                      <path d="M21 12a9 9 0 0 1 -9 9" />
                      <path d="M21 12h-4l-2 4" />
                      <path d="M21 12v-4l4 -2" />
                    </svg>
                  </div>
                  <CardTitle>Community Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We are committed to making a positive difference in the
                    communities we serve through financial education and
                    support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary dark:bg-[#242424] dark:text-white text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Contact Us
                </h2>
                <p className="md:text-xl">
                  Have questions or need assistance? Our team is here to help.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Headquarters</h3>
                      <p className="text-sm">
                        123 Financial Street, Suite 100
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm">(800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm">support@CGM Bank.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Tabs defaultValue="locations" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="locations">Locations</TabsTrigger>
                    <TabsTrigger value="hours">Hours</TabsTrigger>
                  </TabsList>
                  <TabsContent value="locations" className="mt-6 space-y-4">
                    <div className="rounded-lg bg-primary-foreground/10 p-4">
                      <h3 className="font-medium">New York</h3>
                      <p className="text-sm">
                        123 Financial Street, New York, NY 10001
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary-foreground/10 p-4">
                      <h3 className="font-medium">San Francisco</h3>
                      <p className="text-sm">
                        456 Banking Avenue, San Francisco, CA 94103
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary-foreground/10 p-4">
                      <h3 className="font-medium ">Chicago</h3>
                      <p className="text-sm">
                        789 Secure Boulevard, Chicago, IL 60601
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="hours" className="mt-6 space-y-4">
                    <div className="rounded-lg bg-primary-foreground/10 p-4">
                      <h3 className="font-medium ">Branch Hours</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div>Monday - Friday</div>
                        <div>9:00 AM - 5:00 PM</div>
                        <div>Saturday</div>
                        <div>9:00 AM - 1:00 PM</div>
                        <div>Sunday</div>
                        <div>Closed</div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-primary-foreground/10 p-4">
                      <h3 className="font-medium ">Customer Support</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div>Monday - Friday</div>
                        <div>8:00 AM - 8:00 PM</div>
                        <div>Saturday</div>
                        <div>9:00 AM - 5:00 PM</div>
                        <div>Sunday</div>
                        <div>10:00 AM - 3:00 PM</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Image src="/logo2.svg" width={50} height={50} alt="CGM" />
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
