"use client"

import { ProduceSearch } from "./Market"

export default function Market(){

    return(
        <div className="w-full flex items-center justify-center">
            <h1>Welcome to the Agro Market</h1>
            <ProduceSearch />
        </div>
    )
}