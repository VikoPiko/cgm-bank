import MultiStepForm from "@/components/custom/MultiStepForm"; // Adjust the import path based on your structure
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MultiStepForm />
    </div>
  );
};

export default RegisterPage;
