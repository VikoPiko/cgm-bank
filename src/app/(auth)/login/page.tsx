"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUp from "@/app/(auth)/sign-up/page";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { login } from "@/lib/actions/actions";

const LoginBox = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const result = await login({}, formData); // Call login with the form data

    if (result.errors) {
      setFormErrors(result.errors);
    }
    window.location.reload();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <AnimatePresence mode="wait">
        {!showRegister ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Card className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-xl border-0">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center dark:text-white">
                  Welcome back
                </CardTitle>
                <p className="text-muted-foreground text-center text-sm dark:text-gray-400">
                  Enter your credentials to sign in
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium dark:text-gray-200"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        className={
                          formErrors.email
                            ? "border-red-500 pr-10 dark:border-red-500"
                            : "dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        }
                      />
                      {formErrors.email && (
                        <AlertCircle className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                      )}
                    </div>
                    {formErrors.email && (
                      <p className="text-red-500 text-xs dark:text-red-400">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium dark:text-gray-200"
                      >
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline dark:text-blue-400"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        className={
                          formErrors.password
                            ? "border-red-500 pr-10 dark:border-red-500"
                            : "dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        }
                      />
                      {formErrors.password && (
                        <AlertCircle className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                      )}
                    </div>
                    {formErrors.password && (
                      <p className="text-red-500 text-xs dark:text-red-400">
                        Password is required
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                    size="lg"
                  >
                    Sign in
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="text-center text-sm">
                  <span className="text-muted-foreground dark:text-gray-400">
                    Don't have an account?{" "}
                  </span>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium dark:text-blue-400"
                    onClick={() => router.push("/sign-up")}
                  >
                    Sign up
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onButtonClick}
                  className="w-full dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Go Back
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Card className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-xl border-0">
              <CardContent className="pt-6">
                <SignUp />
              </CardContent>
              <CardFooter className="pb-6">
                <Button
                  variant="link"
                  className="w-full dark:text-blue-400"
                  onClick={() => setShowRegister(false)}
                >
                  Already have an account? Log In!
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginBox;
