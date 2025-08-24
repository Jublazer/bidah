"use client"

import { BiCategory, BiSearch } from "react-icons/bi"
import { produce } from "../components/dummyData"
import React, { useState } from "react"


export const metadata = {
    title: "Market",
    description: "Welcome to the Market"
}


export default function Market(){
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    

}


// Categories
export const Categories = ()=>{

    const [category, setCategory] = useState('')
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedCat, setSelectedCat] = useState('Legumes')
    
      const handleSelect = (e:any)=>{
        setCategory(e.category);
        // setSelectedCat(e.category)
      }


    return(
        <>
                <div className="w-full m-0 flex flex-col ">
                    {/* Categories and sorting */}
                    <p className="text-gray-600">Search and sort produce base on your preference</p><br />
                    <h2 className="text-gray-400">Categories: </h2>
        
                        {
                        // product categories
                        <select name="category" className="text-dark-500 w-[200px] bg-white/10 p-3 rounded-sm border-white/50" value={category!=='' ? category : selectedCat } onChange={(e) => setCategory(e.target.value)}>
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
                
                <div className="place-items-center w-full grid md:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5 min-h-screen space-3 gap-3 md:gap-5 lg:gap-5 sm:gap-3 p-3 ">
                    {/* Categories Produce  Filter */}
                    {produce.filter((product) => product.category === (category!=='' ? category : selectedCat)).map((filteredProduct) => (
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
        </>
    )
}