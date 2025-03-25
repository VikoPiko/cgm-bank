"use client";

import { useState } from "react";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PlanOption {
  id: string;
  name: string;
  price: string;
  billing: string;
  features: string[];
}

export function UpgradeProDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");

  const plans: PlanOption[] = [
    {
      id: "monthly",
      name: t("proPlan"),
      price: "$9.99",
      billing: t("monthly"),
      features: [
        t("unlimitedTransactions"),
        t("prioritySupport"),
        t("advancedAnalytics"),
        t("customizableAlerts"),
      ],
    },
    {
      id: "yearly",
      name: t("proPlan"),
      price: "$99.99",
      billing: t("yearly"),
      features: [
        t("unlimitedTransactions"),
        t("prioritySupport"),
        t("advancedAnalytics"),
        t("customizableAlerts"),
        t("twoMonthsFree"),
      ],
    },
  ];

  const handleUpgrade = async () => {
    //implement actual upgrade logic
    console.log(`Upgrading to ${selectedPlan} plan`);
    // Close the dialog after successful upgrade or redirect
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-blue-600" />
            {t("upgradeToPro")}
          </DialogTitle>
          <DialogDescription>{t("upgradeProDescription")}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="grid gap-4"
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg border p-4 transition-all ${
                  selectedPlan === plan.id
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                    : "hover:border-blue-200 dark:hover:border-blue-800"
                }`}
              >
                <RadioGroupItem
                  value={plan.id}
                  id={plan.id}
                  className="absolute right-4 top-4"
                />
                <Label
                  htmlFor={plan.id}
                  className="flex cursor-pointer flex-col space-y-3"
                >
                  <div className="flex justify-between">
                    <span className="text-base font-medium">
                      {plan.name} - {plan.billing}
                    </span>
                    <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                      {plan.price}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="sm:w-auto w-full">
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            onClick={handleUpgrade}
            className="sm:w-auto w-full bg-blue-600 hover:bg-blue-700"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {t("proceedToPayment")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
