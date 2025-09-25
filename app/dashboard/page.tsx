"use client"
import { useUser, SignedIn, SignedOut, SignOutButton, SignInButton } from "@clerk/nextjs";
import { Produce, usersType, produceData, users } from "../components/dummyData";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import { startTransition } from "react";

export default function DashboardPage() {
  const { user } = useUser()


  return (
    <div className="w-full flex justify-center items-center md:flex-row flex-col">
        
        <div className="md:h-screen md:w-[20%] w-full dark:bg-white/300 bg-teal-200/10 rounded-sm shadow-lg backdrop-blur flex flex-col justify-start items-center p-5">
            <h1>Dashboard</h1>
        </div>

        {/* Main body */}
        <div className="md:h-screen md:w-[80%] w-full bg-gray-200/10 rounded-sm shadow-lg backdrop-blur flex flex-col justify-flex-start items-center p-5">
            <h1>Dashboard</h1>
            <h2>Dashboard Stats here</h2>
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
