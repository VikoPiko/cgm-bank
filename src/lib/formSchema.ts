import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address1: z.string().min(5, "Address is required"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ssn: z.string().min(9, "SSN must be 9 digits"),
  dateOfBirth: z.string(),
  postalCode: z.string().min(4, "Invalid postal code"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
