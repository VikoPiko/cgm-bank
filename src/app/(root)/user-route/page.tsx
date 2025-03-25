"use client";
import React, { useContext } from "react";
import { UserContext } from "@/components/custom/UserContext"; // Adjust the import based on your file structure
import { Button } from "@/components/ui/button";

const UserPage = () => {
  const userContext = useContext(UserContext); // Access the UserContext

  if (!userContext) {
    // Handle the case where the context is undefined (shouldn't happen if the provider is set up correctly)
    return <p>Loading user data...</p>;
  }

  const { user, refreshUser } = userContext; // Destructure user and refreshUser

  return (
    <div className="min-h-screen ml-20 mt-10 flex">
      {user ? (
        <div>
          <h1>
            Welcome, {user.firstName} {user.lastName[0]}.
          </h1>
          <p>Email: {user.email}</p>
          <Button onClick={refreshUser} className="hover:cursor-pointer">
            Refresh User Data
          </Button>
        </div>
      ) : (
        <p>No user found. Please log in.</p>
      )}
    </div>
  );
};

export default UserPage;
