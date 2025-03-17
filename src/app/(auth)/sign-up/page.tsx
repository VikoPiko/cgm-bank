import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/utils";
import { createUser } from "@/lib/actions/user.actions";
import { toast } from "sonner";

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
      }
    } catch (error) {}
  };

  return <div></div>;
};

export default SignUp;
