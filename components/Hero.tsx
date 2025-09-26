"use client"

import { url } from "inspector"
import { FaHome } from "react-icons/fa"
import { TbBrandAmongUs } from "react-icons/tb"
import ToggleBox from "./ComponentEntranceExit"
import ComponentsScroll from "./ComponentEntranceExit"

export default function Hero(){

    return(
        <div className="relative w-full h-screen bg-cover bg-no-repeat" style={{backgroundImage: "url('/assets/FarmCrops.jpg')"}}>
            <div className="absolute inset-0 w-full h-screen place-item-center justify-center items-center bg-black/50">
            
                <ComponentsScroll>
                    <div className="mx-auto h-screen flex flex-col items-center justify-center w-full ">
                        <p className=""><span className="font-bold text-green-500">Bidah</span> Fresh Farm</p>
                        <hr className="w-[70%] border-green-500" />
                        <h1 className="text-6xl font-semibold ">Produce</h1>
                    </div>
                </ComponentsScroll>
            
            </div>    
            <div className="absolute w-30 h-30 balls rounded-full top-20 left-40 z-index-10"></div>                   
            <div className="absolute w-15 h-15 balls rounded-full top-20 right-50 z-index-10"></div>                   
            <div className="absolute w-10 h-10 balls rounded-full top-100 left-40 z-index-10"></div>                   
        </div>
    )
}