"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState, useEffect, Suspense} from "react";
import {produce} from './components/dummyData'
import { FaHome } from "react-icons/fa";
import Hero from "./components/Hero";
import { BiCategory } from "react-icons/bi";
import { TbBrandAmongUs } from "react-icons/tb";
import ComponentsScroll from "./components/ComponentEntranceExit";
import BlogPage from "./api/blog/page";
import { Categories, ProduceSearch } from "./market/Market";

export default function Home() {

  const [category, setCategory] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCat, setSelectedCat] = useState('Legumes')

  const handleSelect = (e:any)=>{
    setCategory(e.category);
    // setSelectedCat(e.category)
  }

  // const handleSelectedCat = (e:any)=>{
    
  // }

  useEffect(()=>{
    // if(!loggedIn){
    //   redirect('/auth/login')
    // }
  },[])


  return (
    <div className="font-sans flex flex-col w-full items-center justify-center min-h-screen md:px-30 px-8  mx-auto">
        
        <Hero />
            <span className="w-full flex flex-row items-center gap-2">
              <TbBrandAmongUs />
              <hr className="w-[100%] border-green-500" />
            </span>

        <Suspense fallback={<div className="loading loading-circle">Loading...</div>}>
            <Categories />
        </Suspense>
       
        <ComponentsScroll>
            {/* <BlogPage /> */}
            <h1>Market</h1>
        </ComponentsScroll>
    </div>
  );
}
