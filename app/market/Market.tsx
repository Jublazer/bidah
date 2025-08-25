"use client"

import { BiCategory, BiSearch } from "react-icons/bi"
import { Produce, produceData } from "../components/dummyData"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { div } from "framer-motion/client"

export const metadata = {
    title: "Market",
    description: "Welcome to the Market"
}


export default function Market(){
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    

}

// Get unique Categories and states for filters
const categories = [...new Set(produceData.map(item=>item.category))];
const states = [...new Set(produceData.map(item=>item.state))].sort();

 export const ProduceSearch = ()=>{
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredResults, setFilterResults] = useState<Produce[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedState, setSelectedState] = useState("All");
    const [sortOption, setSortOption] = useState("popularity");
    const [isLoading, SetIsLoading] = useState(false);
    const router = useRouter();

    // Innitialize mounting of state
    useEffect(()=>{
        console.log("Produce data loaded:",produceData.length,'items')

        setFilterResults(produceData);
        SetIsLoading(false)
    },[]);

    // filter and sort result
    useEffect(()=>{
        let results = [...produceData];

        // apply search filter
        if(searchTerm){
            results = results.filter(item=>item.pname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }

        // Apply Search filter
        if(searchTerm.trim()){
            results = results.filter(item=>item.pname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim()))
        }

        // Apply Categry
        if(selectedCategory !== 'All'){
            results = results.filter(item => item.category === selectedCategory);
        }
        if(selectedState !== 'All'){
            results = results.filter(item => item.state === selectedState);
}

        // Apply sorting
        switch(sortOption){
            case "name":
                results.sort((a,b)=>a.pname.localeCompare(b.pname));
            break;
            case "price-low":
                results.sort((a,b)=>a.price-b.price);
            break;
            case "price-high":
                results.sort((a,b)=>b.price-a.price);
            break;
            case "popularity":
            default:
                results.sort((a,b)=>b.popularity-a.popularity)
            break;
        }

        setFilterResults(results);
    },[searchTerm,selectedCategory,selectedState,sortOption]);

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(e.target.value);
    }

    // Handle Produce click

    const handleProduceCLick = (pid:number)=>{
       router.push(`/market/${pid}`, {
        scroll: true,
       });
    };

    const clearFilters = ()=>{
        setSearchTerm('')
        setSelectedCategory('All')
        setSelectedState('All')
        setSortOption('popularity')
    };

    if(isLoading){
        return
        (
            <div className="min-h-screen bg-white/20 py-8 px-4 flex items-centerjustify-center">
                <div className="text-center">
                    <div className="animated-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto"></div>
                    <p className="mt-4 text-green-800">No Vex! Loading produce data...</p>
                </div>

            </div>
        );
    }

    return(
        <div className="w-full h-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full glass mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Agricultural Produce Search</h1>
                    <p className="text-green-600">Find the best produce from farms in Nigeria</p>
                </div>
                
                {/* Search and Filter Section */}
                <div className="rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-white-200 mb-1">
                            Search Produce
                        </label>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search by name..."
                            className="w-full p-1 border border-white-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-white-200 mb-1">
                            Sort By
                        </label>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="popularity">Popularity</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="price-low">Price (Low to High)</option>
                            <option value="price-high">Price (High to Low)</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                    <label htmlFor="category" className="block text-sm font-medium text-white-700 mb-1">
                        Filter by Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 bg-dark focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="All">All Categories</option>
                        {categories.map(category => (
                        <option  key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    </div>
                    
                    <div>
                    <label htmlFor="state" className="block text-sm font-medium text-white-700 mb-1">
                        Filter by State/Region
                    </label>
                    <select
                        id="state"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="All">All States/Regions</option>
                        {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                    Clear Filters
                    </button>
                </div>
                </div>
                
                {/* Results Section */}
                <div className="bg-white/80 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                    {filteredResults.length} {filteredResults.length === 1 ? 'Result' : 'Results'}
                </h2>
                
                {filteredResults.length === 0 ? (
                    <div className="text-center py-8">
                    <p className="text-gray-500">No produce found matching your criteria.</p>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResults.map((item) => (
                        <div
                        key={item.pid}
                        onClick={() => handleProduceCLick(item.pid)}
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-green-800">{item.pname}</h3>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {item.category}
                            </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>From: {item.state}</p>
                            <p className="mt-1">Price: N{item.price.toFixed(2)} per unit</p>
                            <div className="flex items-center mt-1">
                            <span className="mr-1">Popularity:</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                                <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${item.popularity}%` }}
                                ></div>
                            </div>
                            <span className="ml-2 text-xs">{item.popularity}%</span>
                            </div>
                        </div>
                        <div className="mt-3 text-right">
                            <span className="text-green-600 text-sm font-medium">View details →</span>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
            </div>

    )
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
                        {produceData.map((produceData) => (
                            <option key={produceData.pid} value={produceData.category} className="bg-gray-800 text-green-400">
                            {produceData.category}
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
                    {produceData.filter((product) => product.category === (category!=='' ? category : selectedCat)).map((filteredProduct) => (
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