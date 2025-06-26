import { z } from "zod";
import validator from "validator";

export const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address1: z.string().min(5, "Address is required"),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ssn: z.number().min(9, "SSN/EGN must be 9 digits"),
  dateOfBirth: z.string(),
  postalCode: z.number().min(4, "Invalid postal code"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
