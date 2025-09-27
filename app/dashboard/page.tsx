"use client"

import { Produce, usersType, produceData, users } from "../../components/dummyData";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import { startTransition } from "react";

export default function DashboardPage() {

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
            <h1>Welcome home</h1>
          </div>
    </div>
  );
}
