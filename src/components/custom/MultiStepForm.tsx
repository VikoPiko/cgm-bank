"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { ArrowLeft, Check, Text } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "../ui/checkbox";

const fullSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  address1: z.string().min(5, "Address is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ssn: z.string().min(9, "SSN must be at least 9 characters"),
  dateOfBirth: z.string().min(10, "Date of birth is required"),
  postalCode: z.string().min(4, "Postal code is required"),
});

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const form = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      address1: "",
      phoneNumber: "",
      country: "",
      city: "",
      password: "",
      ssn: "",
      dateOfBirth: "",
      postalCode: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, control, trigger, getValues } = form;

  const nextStep = async () => {
    const currentStepSchema =
      step === 0
        ? fullSchema.pick({
            firstName: true,
            middleName: true,
            lastName: true,
            email: true,
            address1: true,
            phoneNumber: true,
          })
        : fullSchema.pick({
            country: true,
            city: true,
            password: true,
            ssn: true,
            dateOfBirth: true,
            postalCode: true,
          });

    const isValid = await currentStepSchema.safeParseAsync(getValues());

    if (isValid.success) {
      setFormData(getValues());
      return true;
    } else {
      await trigger(); // Ensure validation messages show up
      return false;
    }
  };

  const handleReviewSubmit = async () => {
    // Trigger final validation of the form
    const isValid = await nextStep(); // Ensure final validation

    if (isValid) {
      handleSubmit(onSubmit)(); // Proceed with form submission
    } else {
      toast.error("Please review the form before submitting.");
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: any) => {
    console.log("Submitting Data:", data);
    toast.info("Submitting form...");

    try {
      const res = await fetch("/api/prisma/users/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("User registered successfully!");
      } else {
        const errorMessage = await res.text();
        console.error("Submission error:", errorMessage);
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error.");
    }
  };

  return (
    <div
      className={`min-w-[800px] mx-auto p-6 border rounded-lg ${
        step === 2 ? "mt-20" : ""
      }`}
    >
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
              {[0, 1, 2].map((i) => (
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
                    {step > i ? <Check className="h-4 w-4" /> : i + 1}
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
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SSN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 2 && (
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
                      <dd>
                        {formData.firstName} {formData.middleName}{" "}
                        {formData.lastName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>{formData.phoneNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Date of Birth</dt>
                      <dd>{formData.dateOfBirth}</dd>
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
                      <dt className="text-muted-foreground">Initial Deposit</dt>
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
                        <Link href="#" className="text-primary hover:underline">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
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
              </CardFooter>
            </Card>
          )}

          <div className="flex justify-between mt-4">
            {step > 0 && (
              <Button type="button" onClick={prevStep}>
                Back
              </Button>
            )}

            {/* Show Next button until last step */}
            {step < 2 ? (
              <Button
                type="button"
                onClick={async () => {
                  const isValid = await nextStep(); // Only move to next step if valid
                  if (isValid) {
                    setStep((prev) => prev + 1);
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleReviewSubmit}>
                Submit
              </Button> // Trigger review submission
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
