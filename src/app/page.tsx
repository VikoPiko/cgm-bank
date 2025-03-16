import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const user = await getUser();

  if (typeof user === "string") {
    return <h1>{user}</h1>; // Displays "Unable to Find user"
  }

  return (
    <div className="m-5">
      <Card>
        <CardHeader>
          <CardTitle>
            Name: {user.firstName} {user.middleName} {user.lastName} | userId:{" "}
            {user.userId}
          </CardTitle>
          <CardDescription>{user.role}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={user.avatar}
            width={100}
            height={100}
            alt="User"
            className="rounded-lg"
          />
          <div className="mt-2">
            <p>city: {user.city}</p>
            <p>address: {user.address1}</p>
            <p>date of birth: {user.dateOfBirth}</p>
            <p>email: {user.email}</p>
          </div>
        </CardContent>
        <CardFooter className="gap-4">
          <Button asChild variant="outline">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <Link href={"/"}>
              <ChevronRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
