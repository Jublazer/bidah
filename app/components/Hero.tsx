"use client"

import { url } from "inspector"
import { FaHome } from "react-icons/fa"
import { TbBrandAmongUs } from "react-icons/tb"
import bg from '../../public/assets/products/FarmCrops.jpg'

export default function Hero(){

    return(
        <div style={{
            width: '100%',
            minHeight: '100vh',
            // background: url()
            backgroundImage: "url('../../public/assets/products/FarmCrops.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} >
            <div className="mx-auto flex flex-col items-center justify-center w-full ">
                    <p className=""><span className="font-bold text-green-500">Bidah</span> Fresh Farm</p>
                    <h1 className="text-6xl font-semibold ">Produce</h1>
            </div>
            
        </div>
    )
}