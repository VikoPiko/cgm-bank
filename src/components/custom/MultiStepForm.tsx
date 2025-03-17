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
      setStep((prev) => prev + 1);
    } else {
      await trigger(); // Ensure validation messages show up
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
    <div className="max-w-lg mx-auto p-6 border rounded-lg">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <div>
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

          <div className="flex justify-between mt-4">
            {step > 0 && (
              <Button type="button" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
