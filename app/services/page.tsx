"use client"

import { BiCategory } from "react-icons/bi"
import ScrollFadeText from "../../components/ScrollFadeSlide"
import Blog from "./Blog"

export default function Services(){

    return(
        <div className="w-full bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shiny-effectflex flex-col md:flex-row items-center justify-center md:px-20 ">

            <div className="md:w-[220px] flex items-center p-5 justify-start h-auto md:h-auto ">
                <ScrollFadeText>
                    <h1 className="text-5xl font-bold dark:text-gray-400 text-gray-700">Services</h1>
                </ScrollFadeText>
            </div>         


            <div className="md:w-[80%] shadow-xl mt-20 mb-20 backdrop-blur-lg w-full h-auto flex flex-col gap-5 items-center  justify-center">
                <section className="px-20" >
                   
                <ScrollFadeText>
                    <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Bridging the Gap Between Farm and Market</h1>
                    
                    <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                        <BiCategory />
                        <hr className="w-[100%] border-green-500" />
                    </span>
                    
                    <p className="text-base dark:text-gray-500 text-justify p-0 leading-7">
                        We are building a vibrant digital marketplace that connects crop farmers and processors in the Middle Belt of Nigeria with reliable buyers across the country and beyond. Our mission is to empower local farmers, streamline agricultural trade, and ensure that farm produce and locally processed goods find the right markets at the right time.

                        The Middle Belt is one of Nigeria’s most fertile regions, producing a wide range of crops such as yams, cassava, maize, soybeans, rice, and more. Yet, many farmers face challenges accessing markets, fair pricing, and modern trade infrastructure.

                        <br />
                        Our platform changes that.

                        With our web app, farmers can showcase their harvests, processors can list value-added products, and buyers from individuals to large-scale distributors can connect directly with trusted suppliers.
                    </p>
                </ScrollFadeText>
                </section>
                
                <br />
                <section className="w-[99%] h-auto px-20">
                    <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Our Mission</h1>
                    
                    <span className="w-full  mt-1 flex fle-row items-center gap-2 text-justify">
                        <BiCategory />
                        <hr className="w-[100%] border-green-500" />
                    </span>

                    <p className="text-base text-justify dark:text-gray-500 p-0 leading-7">To create a sustainable, transparent, and profitable agricultural ecosystem in Nigeria’s Middle Belt by empowering local farmers and processors through technology and market access.</p>
                </section>
                
                <br />
                <section className="w-[99%] mb-5 h-auto px-20">
                    <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Our Vision</h1>
                    
                    <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                        <BiCategory />
                        <hr className="w-[100%] border-green-500" />
                    </span>

                    <p className="text-base text-justify p-0 leading-7 dark:text-gray-500">A connected agricultural community where every farmer and processor in Nigeria can thrive through access to markets, resources, and fair trade.</p>
                </section>
            </div>
            
        </div>
    )
}