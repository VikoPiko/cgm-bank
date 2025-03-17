"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
import { login } from "@/lib/actions/actions";
import Link from "next/link";
import SignUp from "@/app/(auth)/sign-up/page";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const LoginBox = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});
  //   const { t } = useTranslation();

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
    <div className="w-[50vw] min-h-[60vh] bg-white/40 backdrop-blur-md shadow-lg rounded-lg flex flex-col items-center justify-center mx-auto">
      <AnimatePresence mode="wait">
        {!showRegister ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="w-1/2 m-2">
              <h2 className="text-center text-3xl mb-5">
                {/* {t("loginBoxTitle")} */}
                Welcome
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-lg font-medium text-gray-700 dark:text-white"
                  >
                    {/* {t("emailLabel")} */}
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    // placeholder={t("emailPlaceholder")}
                    placeholder="email"
                  />
                  {formErrors.email && (
                    // <p className="text-red-500 text-sm">{t("emailError")}</p>
                    <p className="text-red-500 text-sm">email error</p>
                  )}
                </div>
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-left text-lg font-medium text-gray-700 dark:text-white"
                  >
                    {/* {t("passwordLabel")} */}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    // placeholder={t("passwordPlaceholder")}
                    placeholder="pass"
                  />
                  {formErrors.password && (
                    // <p className="text-red-500 text-sm">{t("passwordError")}</p>
                    <p className="text-red-500 text-sm">error</p>
                  )}
                </div>
                {/* Login Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full text-white px-4 py-2 mt-4 rounded-xl hover:translate-y-[-4px] transition-all duration-300 bg-blue-500 hover:bg-blue-700 shadow-lg"
                  >
                    {/* {t("loginButton")} */}Login
                  </button>
                </div>
                {/* Forgot Password */}
                <div className="mt-2 text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    {/* {t("forgotPassword")} */} forgot
                  </Link>
                </div>
              </form>
            </div>
            <div>
              <Button
                onClick={onButtonClick}
                className="mt-6 bg-blue-500 hover:bg-blue-700 mx-20 translate-x-[-50px] hover:translate-y-[-2px] transition-all duration-300"
              >
                Go Back
              </Button>
              <Button
                onClick={() => router.push("/sign-up")}
                className="hover:translate-y-[-4px] transition-all duration-300 bg-blue-500 hover:bg-blue-700"
              >
                Not a user? Sign Up!
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full min-h-[60vh] p-6 shadow-md rounded-md dark:bg-[#363636] flex flex-col items-center"
          >
            <SignUp />
            <Button
              onClick={() => setShowRegister(false)}
              className="hover:translate-y-[-4px] transition-all duration-300 bg-blue-500 hover:bg-blue-700"
            >
              Already have an account? Log In!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginBox;
