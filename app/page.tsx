"use client"


import React, { useState, useEffect, Suspense} from "react";
import Hero from "../components/Hero";
import { TbBrandAmongUs } from "react-icons/tb";
import ComponentsScroll from "../components/ComponentEntranceExit";
import { Categories} from "./market/Market";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {

  const [category, setCategory] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCat, setSelectedCat] = useState('Legumes')

  const handleSelect = (e:any)=>{
    setCategory(e.category);
    // setSelectedCat(e.category)
  }


  return (
    <div className="font-sans flex flex-col w-full bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 items-center justify-center min-h-screen md:px-30 px-8  mx-auto">
        
        <Hero />
            <span className="w-full flex flex-row items-center gap-2">
              <TbBrandAmongUs />
              <hr className="w-[100%] border-green-500" />
            </span>
        <SignedIn>
          <Suspense fallback={<div className="loading loading-circle">Loading...</div>}>
              <Categories />
          </Suspense>
        </SignedIn>
       
        <ComponentsScroll>
            {/* <BlogPage /> */}
            <h1>Market</h1>
        </ComponentsScroll>
    </div>
  );
}
