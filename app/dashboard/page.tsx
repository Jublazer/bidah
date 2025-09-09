"use client"
import { useUser, SignedIn, SignedOut, SignOutButton, SignInButton } from "@clerk/nextjs";
import { Produce, usersType, produceData, users } from "../components/dummyData";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import { startTransition } from "react";

export default function DashboardPage() {
  const { user } = useUser()


  return (
    <div className="w-full flex justify-center items-center flex-col">
        <h1>Dashboard</h1>
        <div className="max-h-[400px] w-[60%] bg-gray-400/10 rounded-lg shadow-lg backdrop-blur flex flex-col justify-start items-center p-5 mb-5">
            <h2>Dashboard Stats here
                
            </h2>
        </div>


          {/* Clerk API */}
          <div>

                <SignedIn>
                  <div>
                    <SignOutButton />
                    <div>
                      <img src={user?.imageUrl} alt={`${user?.firstName}'s profile`} className="rounded-full w-24 h-24" />
                    </div>
                    <div className="flex flex-col">
                      <h2>Welcome, {user?.firstName}!</h2>
                      <h2>Welcome, {user?.lastName}!</h2>
                      <h2>Username: {user?.username}</h2>
                      <p>Your email: {user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                </SignedIn>
                <SignedOut>
                  <p>Please sign in to view your dashboard.</p>
                    
                  <SignInButton />
                </SignedOut>
          </div>
    </div>
  );
}
