"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/utils";
import { createUser } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import CustomInput from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

const formSchema = authFormSchema;

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Data", data);
      const newUser = await createUser(data);
      setUser(newUser);

      if (newUser) {
        console.log("User created successfully", newUser);
        toast.success("Account Created Successfully");
        router.push("/");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(
        "An error occured while creating an account. For more details check out the logs."
      );
    }
  };

  return (
    <>
      <Button onClick={() => router.push("/login")} className="m-5">
        <ChevronLeft />
      </Button>
      <section className="flex h-screen w-full items-center justify-center -mt-10 mb-[-35px] ">
        <div className="w-full max-w-[600px] p-6 bg-transparent  dark:bg-[#121212] rounded-md">
          {/* <h1 className="text-white text-3xl font-bold text-center  mb-4">
            Welcome
          </h1> */}
          <div className="flex justify-center mb-4">
            <Image src={"/logo2.svg"} width={100} height={100} alt="logo" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-5">Sign Up</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <div className="flex gap-4 justify-between">
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <CustomInput
                    control={form.control}
                    name="middleName"
                    label="Middle Name"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <CustomInput
                control={form.control}
                name="address1"
                label="Address"
                placeholder="Enter your specific address"
              />
              <CustomInput
                control={form.control}
                name="city"
                label="City"
                placeholder="Enter your city"
              />
              <div className="flex gap-4 justify-between">
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="country"
                    label="Country"
                    placeholder="Example: USA/DE/etc."
                  />
                </div>
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Example: 11101"
                  />
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
                <div className="flex-1">
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="Example: XXX-XX-XXXX"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out hover:translate-y-[-3px] shadow-lg inline-block will-change-transform duration-300"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
