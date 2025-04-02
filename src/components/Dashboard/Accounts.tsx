"use client";
import { useState, useEffect } from "react";
import { Transactions, type Accounts, type Banks } from "@prisma/client";
import { PlaidType, useUser } from "@/components/custom/UserContext";
import { toast } from "sonner";
import { DollarSign, ArrowUpRight, BarChart3, Clock } from "lucide-react";
import { AccountSkeleton } from "@/components/custom/account-skeleton";
import { RecentActivity } from "@/components/custom/recent-activity";
import { AccountCard } from "@/components/custom/account-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { SpendingBreakdown } from "./SpendingChart";
import { useTranslation } from "react-i18next";

const Accounts = () => {
  const [account, setAccount] = useState<Accounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [payProceed, setPayProceed] = useState(false);
  const { user, getAccounts, getPlaidBanks } = useUser();
  const [plaidAccounts, setPlaidAccounts] = useState<PlaidType[]>([]);
  const [proceed, setProceed] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  const [amount, setAmount] = useState<string>("0.00");
  const [routingNumber, setRoutingNumber] = useState("");
  const [recieverIban, setRecieverIban] = useState("");
  const [inputType, setInputType] = useState("routing");
  const [reason, setReason] = useState("Tranfer");
  const [position, setPosition] = useState("Blink");

  const [payeeName, setPayeeName] = useState("");

  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const handleTransfer = async () => {
    try {
      if (user?.userId && account.length > 0) {
        const response = await fetch(
          "/api/prisma/transactions/handle-transfer",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.userId,
              amount: Number(amount),
              currentBalance: account[0].availableBalance,
              senderId: account[0].accountNumber,
              recieverId: routingNumber,
              senderIban: account[0].iban,
              recieverIban: recieverIban,
              pending: true,
              category: "Transfer",
              type: "TRANSFER",
              description: `Transfer from ${user.firstName} ${user.lastName}: ${account[0].iban} to ${routingNumber} successful.`,
              image: "Send",
              channel: "Notification",
              method: inputType,
              message: reason,
            }),
          }
        );

        if (response.ok) {
          const updatedAccount = [...account];
          updatedAccount[0].availableBalance -= Number(amount);
          setAccount(updatedAccount);
          setProceed(false);
          setOpen(false);
          toast.success(
            `Transfered $${Math.abs(Number(amount))} Successfully.`
          );
        } else {
          toast.error(`Transfer Failed.`);
        }
      } else {
        toast.error("User not found. Please log in.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while processing the transaction.");
    }
  };

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource("/api/server-events/updates");
      const plaidAccs = getPlaidBanks();
      const acc = getAccounts();

      setAccount(acc || []);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setAccount(data.accounts || []);
        // setBanks(data.banks || []);
        setTransactions(data.transactions || []);
      };
      setPlaidAccounts(plaidAccs || []);
      setLoading(false);

      eventSource.onerror = () => {
        console.error("SSE connection lost");
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [user]);

  const handleDeposit = async (enteredAmount: number) => {
    await handleTransaction(enteredAmount, "Deposit");
  };

  const handleWithdraw = async (enteredAmount: number) => {
    const negativeAmount = -Math.abs(enteredAmount);
    await handleTransaction(negativeAmount, "Withdraw");
  };

  const handleTransaction = async (
    transactionAmount: number,
    action: string
  ) => {
    try {
      if (user?.userId && account.length > 0) {
        // Update balance in the account state
        const updatedAccount = [...account];
        updatedAccount[0].availableBalance += transactionAmount;
        setAccount(updatedAccount);

        const response = await fetch("/api/prisma/accounts/update-account", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.userId,
            amount: transactionAmount,
          }),
        });

        if (response.ok) {
          const updatedBalance = await response.json();
          updatedAccount[0].availableBalance = updatedBalance.availableBalance;
          setAccount(updatedAccount);
          toast.success(
            `${action} $${Math.abs(transactionAmount)} Successfully.`
          );
        } else {
          toast.error(`${action} Failed.`);
        }
      } else {
        toast.error("User not found. Please log in.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while processing the transaction.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleBlur = () => {
    const formattedAmount = parseFloat(amount).toFixed(2);
    setAmount(formattedAmount);
  };

  const handlePayment = async () => {
    try {
      if (user?.userId && account.length > 0) {
        const response = await fetch(
          "/api/prisma/transactions/handle-transfer",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.userId,
              amount: Number(amount),
              currentBalance: account[0].availableBalance,
              senderId: account[0].accountNumber,
              recieverId: routingNumber,
              senderIban: account[0].iban,
              recieverIban: recieverIban,
              pending: true,
              category: "Payment",
              type: "PAYMENT",
              description: `Payment from ${user.firstName} ${user.lastName}: ${account[0].iban} to ${routingNumber} successful.`,
              image: "DollarSign",
              channel: "Notification",
              method: inputType,
              message: reason,
            }),
          }
        );

        if (response.ok) {
          const updatedAccount = [...account];
          updatedAccount[0].availableBalance -= Number(amount);
          setAccount(updatedAccount);
          setPayProceed(false);
          setPayOpen(false);
          toast.success(
            `Paid $${Math.abs(Number(amount))} to ${payeeName} Successfully.`
          );
        } else {
          toast.error(`Payment Failed.`);
        }
      } else {
        toast.error("User not found. Please log in.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while processing the payment.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#101010]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 dark:text-white">
              {t("financialDashboard")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-lg">
              {t("welcomeBack")}{" "}
              <span className="dark:text-blue-400 text-black font-semibold text-lg tracking-wide">
                {user ? `, ${user.firstName || "User"}` : ""}
              </span>
            </p>
          </div>

          <div className="gap-2 flex flex-row">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="border border-gray-300 p-2 rounded-md text-center w-28 h-10"
            />
            <Button
              // onClick={() => handleDeposit(parseFloat(amount), "Deposit")}
              onClick={() => handleDeposit(parseFloat(amount))}
              disabled={parseFloat(amount) <= 0}
            >
              {t("deposit")}
            </Button>
            <Button
              onClick={() => handleWithdraw(parseFloat(amount))}
              disabled={parseFloat(amount) <= 0}
            >
              {t("withdraw")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                {t("connectedAccounts")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <>
                    <AccountSkeleton />
                    <AccountSkeleton />
                    <AccountSkeleton />
                    <AccountSkeleton />
                  </>
                ) : (
                  <>
                    <div className="p-4 border rounded-lg dark:border-stone-700 hover:shadow-md bg-gradient-to-br from-blue-500/30 to-indigo-500/30 hover:from-blue-600/30 hover:to-indigo-600/30 dark:from-blue-900/20 dark:to-indigo-900/20 hover:translate-y-[-5px]  duration-200 transition-all hover:dark:from-blue-900/40 hover:dark:to-indigo-900/40">
                      <h3 className="text-sm text-stone-700 dark:text-stone-300 mb-0.5">
                        {t("myAccount")}
                      </h3>
                      <p className="text-xl font-semibold -mb-[4px]">
                        {account[0]?.availableBalance?.toFixed(2) ||
                          "Loading..."}
                      </p>
                      <sub className="mb-0.5">IBAN: {account[0]?.iban}</sub>
                      <p className="text-xs text-stone-700 dark:text-stone-300">
                        Primary Account
                      </p>
                    </div>
                    {plaidAccounts && plaidAccounts.length > 0 ? (
                      plaidAccounts.map((account, index) => (
                        <AccountCard key={index} account={account} />
                      ))
                    ) : (
                      <div className="p-4 border rounded-lg dark:border-stone-700 flex flex-col justify-center items-center hover:translate-y-[-5px]  duration-200 transition-all">
                        <h1>No Plaid Accounts Connected.</h1>
                        <p className="text-xs">
                          Tip: To Connect plaid account click on connect bank.
                        </p>
                        <p className="text-sm">
                          username: user_good | password: pass_good
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                {t("recentActivity")}
              </h2>
              {loading ? (
                <div className="h-[300px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
              ) : (
                <RecentActivity transactions={transactions} />
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-lg font-medium mb-4 dark:text-white">
              {t("quickActions")}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                {
                  name: t("transfer"),
                  icon: <ArrowUpRight />,
                  action: () => setOpen(true),
                },
                {
                  name: t("payBills"),
                  icon: <DollarSign />,
                  action: () => setPayOpen(true),
                },
                { name: t("insights"), icon: <BarChart3 /> },
                {
                  name: t("history"),
                  icon: <Clock />,
                  action: () => router.push("/statements"),
                },
              ].map((action, i) => (
                <button
                  key={i}
                  className="p-4 border rounded-lg dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 flex flex-col items-center justify-center gap-2 transition-colors duration-0"
                  onClick={action.action}
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium dark:text-white">
                    {action.name}
                  </span>
                </button>
              ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transfer Money</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-white mb-1">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    {/* Dropdown Selector */}
                    <label className="block text-sm font-medium dark:text-white mb-1">
                      Select Account Number Type ("IBAN"/"Routing")
                    </label>
                    <Select
                      onValueChange={(value) => setInputType(value)}
                      defaultValue={inputType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select input type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routing">Routing Number</SelectItem>
                        <SelectItem value="iban">IBAN</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Conditional Input Field */}
                    <div className="mt-3">
                      <label className="block text-sm font-medium dark:text-white mb-1">
                        {inputType === "routing" ? "Routing Number" : "IBAN"}
                      </label>
                      <Input
                        type="text"
                        placeholder={`Enter ${
                          inputType === "routing" ? "routing number" : "IBAN"
                        }`}
                        value={
                          inputType === "routing" ? routingNumber : recieverIban
                        }
                        onChange={(e) =>
                          inputType === "routing"
                            ? setRoutingNumber(e.target.value)
                            : setRecieverIban(e.target.value)
                        }
                      />
                    </div>
                    <p className="text-sm">
                      Sample IBAN number "Viktor" : BG48CGMBANK017492459758
                    </p>
                  </div>
                  <div>
                    <label className="mr-3 text-sm font-medium dark:text-white">
                      Payment system:
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {position.toUpperCase()}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={position}
                          onValueChange={setPosition}
                        >
                          <DropdownMenuRadioItem value="blink">
                            BLINK
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bisera">
                            BISERA
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="rings">
                            RINGS
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <label>Reason / Message</label>
                    <Input
                      type="text"
                      placeholder="Enter message"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setProceed(true)}>Transfer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={proceed} onOpenChange={setProceed}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <h3>
                  Clicking Send will finalize the tranfer. Are you sure you want
                  to continue?
                </h3>
                <h4>Make sure all entered data is correct.</h4>
                <Button onClick={handleTransfer}>Transfer</Button>
                <Button variant="outline" onClick={() => setProceed(false)}>
                  Cancel
                </Button>
              </DialogContent>
            </Dialog>

            <Dialog open={payOpen} onOpenChange={setPayOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-white mb-1">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-white mb-1">
                      Select Way Of Payment ("IBAN"/"Routing")
                    </label>
                    <Select
                      onValueChange={(value) => setInputType(value)}
                      defaultValue={inputType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select input type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routing">Routing Number</SelectItem>
                        <SelectItem value="iban">IBAN</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Conditional Input Field */}
                    <div className="mt-3">
                      <label className="block text-sm font-medium dark:text-white mb-1">
                        {inputType === "routing" ? "Routing Number" : "IBAN"}
                      </label>
                      <Input
                        type="text"
                        placeholder={`Enter ${
                          inputType === "routing" ? "routing number" : "IBAN"
                        }`}
                        value={
                          inputType === "routing" ? routingNumber : recieverIban
                        }
                        onChange={(e) =>
                          inputType === "routing"
                            ? setRoutingNumber(e.target.value)
                            : setRecieverIban(e.target.value)
                        }
                      />
                    </div>
                    <p className="text-sm">
                      Sample IBAN number "Viktor" : BG48CGMBANK017492459758
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-white mb-1">
                      Recipient Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter recipient's name"
                      value={payeeName}
                      onChange={(e) => setPayeeName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mr-3 text-sm font-medium dark:text-white">
                      Payment system:
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {position.toUpperCase()}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={position}
                          onValueChange={setPosition}
                        >
                          <DropdownMenuRadioItem value="blink">
                            BLINK
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bisera">
                            BISERA
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="rings">
                            RINGS
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <label>Reason / Message</label>
                    <Input
                      type="text"
                      placeholder="Enter message / customer number(id)"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setPayOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setPayProceed(true)}>Pay</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={payProceed} onOpenChange={setPayProceed}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Payment 2</DialogTitle>
                </DialogHeader>
                <h3>
                  Clicking Confirm will finalize the payment. Are you sure you
                  want to continue?
                </h3>
                <h4>Make sure all entered data is correct!</h4>
                <Button onClick={handlePayment}>Confirm</Button>
                <Button variant="outline" onClick={() => setPayProceed(false)}>
                  Cancel
                </Button>
              </DialogContent>
            </Dialog>

            <h2 className="text-lg font-medium mb-4 dark:text-white mt-[44px]">
              Spending Breakdown
            </h2>
            {loading ? (
              <div className="h-[300px] border rounded-lg dark:border-stone-700 animate-pulse bg-stone-100 dark:bg-stone-800"></div>
            ) : (
              <SpendingBreakdown />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
