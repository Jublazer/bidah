"use client"

import { Suspense } from "react"
import ComponentsScroll from "../components/ComponentEntranceExit"
import { ProduceSearch } from "./Market"

export default function Market(){

    return(
        <div className="w-full flex flex-col items-center justify-center">
            <h1>Welcome to the Agro Market</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ComponentsScroll>
                    <ProduceSearch />
                </ComponentsScroll>
            </Suspense>
        </div>
    )
}