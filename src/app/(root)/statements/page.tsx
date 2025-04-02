"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Download, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { generatePDF } from "@/lib/actions/actions";
import { toast } from "sonner";
import { useUser } from "@/components/custom/UserContext";
import { Accounts, Transactions } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

const transactions = [
  {
    id: "1",
    date: new Date(2023, 2, 15),
    description: "Grocery Store",
    category: "Shopping",
    amount: -85.32,
    balance: 1243.45,
  },
  {
    id: "2",
    date: new Date(2023, 2, 14),
    description: "Salary Deposit",
    category: "Income",
    amount: 2500.0,
    balance: 1328.77,
  },
  {
    id: "3",
    date: new Date(2023, 2, 13),
    description: "Electric Bill",
    category: "Utilities",
    amount: -124.56,
    balance: -1171.23,
  },
  {
    id: "4",
    date: new Date(2023, 2, 10),
    description: "Restaurant",
    category: "Dining",
    amount: -56.78,
    balance: -1046.67,
  },
  {
    id: "5",
    date: new Date(2023, 2, 8),
    description: "Gas Station",
    category: "Transportation",
    amount: -45.23,
    balance: -989.89,
  },
  {
    id: "6",
    date: new Date(2023, 2, 5),
    description: "Online Shopping",
    category: "Shopping",
    amount: -123.45,
    balance: -944.66,
  },
  {
    id: "7",
    date: new Date(2023, 2, 1),
    description: "Rent Payment",
    category: "Housing",
    amount: -1200.0,
    balance: -821.21,
  },
];

const categories = [
  "All Categories",
  "Shopping",
  "Income",
  "Utilities",
  "Dining",
  "Transportation",
  "Housing",
];

export default function StatementsPage() {
  const { user, getTransactions, getAccounts, refreshUser } = useUser();
  const [transactionz, setTransactions] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Accounts[]>([]);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource("/api/server-events/updates");

      const accs = getAccounts();
      const txs = getTransactions();
      setAccounts(accs || []);
      setTransactions(txs || []);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setAccounts(data.accounts || []);
        setTransactions(data.transactions || []);
      };
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

  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    new Date(2025, 2, 1)
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date(2025, 2, 31));
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleCategory = (category: string) => {
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"]);
      return;
    }

    let newCategories = [...selectedCategories];

    // Remove "All Categories" if it's selected
    if (newCategories.includes("All Categories")) {
      newCategories = newCategories.filter((c) => c !== "All Categories");
    }

    // Toggle the selected category
    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category);
      // If no categories are selected, select "All Categories"
      if (newCategories.length === 0) {
        newCategories = ["All Categories"];
      }
    } else {
      newCategories.push(category);
    }

    setSelectedCategories(newCategories);
  };

  const filteredTransactions = transactionz.filter((transaction) => {
    // Ensure the dates are compared without the time component
    const transactionDate = new Date(transaction.date).setHours(0, 0, 0, 0);
    const fromDate = dateFrom ? dateFrom.setHours(0, 0, 0, 0) : null;
    const toDate = dateTo ? dateTo.setHours(0, 0, 0, 0) : null;

    // Date matches
    const dateMatches =
      (!fromDate || transactionDate >= fromDate) &&
      (!toDate || transactionDate <= toDate);

    // Category matches (when enabled)
    const categoryMatches =
      selectedCategories.includes("All Categories") ||
      selectedCategories.some((cat) => cat === transaction.category);

    // Return transactions that match both date and category
    return dateMatches && categoryMatches;
  });
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(filteredTransactions, dateFrom, dateTo);
      toast.success(`Generated PDF.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Account Statements</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>
              Current balance and account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {accounts.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Number
                  </p>
                  <p className="font-medium">
                    **** **** **** {accounts[0].mask}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current Balance
                  </p>
                  <p className="text-2xl font-bold">
                    ${accounts[0].availableBalance.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Credit
                  </p>
                  <p className="font-medium">
                    ${accounts[0].currentBalance.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading account information...</p>
            )}
          </CardContent>
        </Card>

        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Statement Options</CardTitle>
            <CardDescription>
              Filter and download your statements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">From Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">To Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Categories</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter Categories
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={handleDownload} disabled={isGenerating}>
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {dateFrom && dateTo
              ? `Showing transactions from ${format(
                  dateFrom,
                  "PPP"
                )} to ${format(dateTo, "PPP")}`
              : "Showing all transactions"}
          </CardDescription>
          <div className="flex flex-1 gap-2">
            <Button
              onClick={refreshUser}
              className="flex justify-center w-7 h-7"
            >
              <RefreshCw />
            </Button>
            <p className="text-sm font-semibold">
              refresh user data manually. (when stale)
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => ( */}
                {transactionz.length > 0 ? (
                  transactionz.map((transaction) => (
                    <TableRow key={transaction.transactionId}>
                      <TableCell>
                        {format(transaction.date, "MMM d, yyyy h:mm a")}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell
                        className={cn(
                          "text-right",
                          transaction.transactionType === "DEPOSIT" ||
                            transaction.transactionDirection === "TO"
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {transaction.transactionType === "DEPOSIT" ||
                        transaction.transactionDirection === "TO"
                          ? "+"
                          : "-"}
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${transaction.balanceAfter.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No transactions found for the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {transactionz.length} of {transactionz.length} transactions
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
