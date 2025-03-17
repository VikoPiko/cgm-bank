import React, { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react"; // Icons for visibility toggle

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema;

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type?: "text" | "password" | "date"; // Allows optional field type
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: CustomInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="mb-2">{label}</FormLabel>
          <div className="relative w-full">
            <FormControl>
              <Input
                type={
                  isPasswordField
                    ? isPasswordVisible
                      ? "text"
                      : "password"
                    : type
                } // Dynamic type update
                placeholder={placeholder}
                className="input-class pr-10"
                {...field}
              />
            </FormControl>
            {isPasswordField && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
