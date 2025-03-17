"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Shield, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const page = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col">
        <div className="container mx-auto max-w-7xl flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>
        </div>
        <main className="flex-1 py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-8 flex flex-col items-center text-center">
              <Image src={"/logo2.svg"} width={100} height={100} alt="none" />
              <h1 className="mt-3 text-2xl font-bold">Open Your Account</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete the steps below to create your secure banking account
              </p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
                <ol className="relative z-10 flex justify-between px-2">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-center justify-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                          step === i
                            ? "bg-primary text-primary-foreground"
                            : step > i
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step > i ? <Check className="h-4 w-4" /> : i}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span>Personal Information</span>
                <span>Account Type</span>
                <span>Review & Submit</span>
              </div>
            </div>

            {step === 1 && (
              <Card className="mx-auto w-full">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Please provide your personal details to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <Input id="ssn" placeholder="XXX-XX-XXXX" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card className="mx-auto w-full">
                <CardHeader>
                  <CardTitle>Choose Your Account Type</CardTitle>
                  <CardDescription>
                    Select the type of account that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup defaultValue="checking">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem
                          value="checking"
                          id="checking"
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <label htmlFor="checking" className="font-medium">
                            Checking Account
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Everyday banking with no minimum balance and free
                            online bill pay
                          </p>
                          <ul className="mt-2 text-sm">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              No monthly maintenance fee
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Free debit card
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Mobile check deposit
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem
                          value="savings"
                          id="savings"
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <label htmlFor="savings" className="font-medium">
                            Savings Account
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Earn interest on your balance with our high-yield
                            savings account
                          </p>
                          <ul className="mt-2 text-sm">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              2.50% APY on all balances
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              No minimum balance required
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Automatic savings tools
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem
                          value="both"
                          id="both"
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <label htmlFor="both" className="font-medium">
                            Both Accounts
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Get the best of both worlds with a checking and
                            savings account
                          </p>
                          <ul className="mt-2 text-sm">
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              All features of both accounts
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Easy transfers between accounts
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-primary" />
                              Single dashboard to manage everything
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="initial-deposit">Initial Deposit</Label>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="initial-deposit"
                        type="number"
                        className="rounded-l-none"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum $25 initial deposit required
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card className="mx-auto w-full">
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>
                    Please review your information before submitting your
                    application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="mb-2 font-medium">Personal Information</h3>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Name</dt>
                        <dd>John Doe</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>john.doe@example.com</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>(123) 456-7890</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Date of Birth</dt>
                        <dd>01/01/1990</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="mb-2 font-medium">Account Details</h3>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Account Type</dt>
                        <dd>Checking & Savings</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">
                          Initial Deposit
                        </dt>
                        <dd>$500.00</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" className="mt-1" />
                      <div>
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Terms and Conditions
                        </label>
                        <p className="text-xs text-muted-foreground">
                          I agree to the{" "}
                          <Link
                            href="#"
                            className="text-primary hover:underline"
                          >
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#"
                            className="text-primary hover:underline"
                          >
                            privacy policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="communications" className="mt-1" />
                      <div>
                        <label
                          htmlFor="communications"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Communications
                        </label>
                        <p className="text-xs text-muted-foreground">
                          I agree to receive account alerts, updates, and
                          promotional emails.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button>Submit Application</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
        <footer className="border-t py-4">
          <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src={"/logo2.svg"} width={34} height={34} alt="img" />
            </div>
            <p className="text-xs text-muted-foreground">
              © 2023 CGM Bank. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default page;
