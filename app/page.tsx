"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState, useEffect} from "react";
import {produce} from './components/dummyData'
import { FaHome } from "react-icons/fa";
import Hero from "./components/Hero";
import { BiCategory } from "react-icons/bi";
import { TbBrandAmongUs } from "react-icons/tb";
import { signIn, signOut, useSession } from "next-auth/react";
import InteractiveButton from "./components/InteractionButton";



export default function Home() {

const { data: session } = useSession()

  const [category, setCategory] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSelect = (e:any)=>{
    setCategory(e.category)
  }

  // useEffect(()=>{
  //   if(!loggedIn){
  //     redirect('/auth/login')
  //   }
  // },[])


  return (
    <div className="font-sans flex flex-col w-full items-center justify-center min-h-screen md:px-30 px-8  mx-auto">
      
      <div>

        {!session ? (
          <InteractiveButton onClick={() => signIn("google")}>Login with Google</InteractiveButton>
        ) : (
          <>
            <p>Welcome {session.user?.name}</p>
            <button onClick={() => signOut()}>Logout</button>
          </>
        )}
      </div>
        
        <Hero />
            <span className="w-full flex flex-row items-center gap-2">
              <TbBrandAmongUs />
              <hr className="w-[100%] border-green-500" />
            </span>

        <div className="w-full m-0 flex flex-col ">
          {/* Categories and sorting */}
          <p className="text-gray-600">Search and sort produce base on your preference</p><br />
          <h2 className="text-gray-400">Categories: </h2>

              {
              // product categories
              <select name="category" className="text-dark-500 w-[200px] bg-white/10 p-3 rounded-sm border-white/50" value={category} onChange={(e) => setCategory(e.target.value)}>
                {produce.map((product) => (
                  <option key={product.pid} value={product.category} className="bg-gray-800 text-green-400">
                    {product.category}
                  </option>
                    ))}
                  </select>
              }
              <span className="w-full  mt-5 flex fle-row items-center gap-2">
                <BiCategory />
                <hr className="w-[100%] border-green-500" />
              </span>
        </div>
        
        <div className="place-items-center w-full grid md:grid-cols-4 min-h-screen space-3 gap-3 p-3 ">
          {/* Categories Produce  Filter */}
          {produce.filter((product) => product.category === category).map((filteredProduct) => (
            <div key={filteredProduct.pid} className="relative flex items-center justify-center overflow-y-clip bg-white/30 text-dark w-[250px] h-[250px] border border-solid rounded-lg shadowed-xlg">
              <img src={filteredProduct.pic.src} width={100} alt="products" className="w-full rounded-sm h-50" />
              <div className="absolute top-30 w-full rounded-lg p-3 bg-[#121212]/90 glass duration-300 ease-in-out
              ">
                  <h2 className="text-xl font-bold text-green-400">{filteredProduct.pname}</h2>
                  <p className="text-[13px] font-[300] text-[grey]-600">{filteredProduct.desc}</p>
                  <p>Price: N{filteredProduct.price}</p>
                  <button type="button" className="p-1 border w-full mx-auto cursor-pointer rounded-sm btn
                  transform transition-transform hover:bg-green-500 hover:scale-110 
                  ">Order</button>
              </div>
              
            </div>
          ))}
        </div>
    </div>
  );
}
