"use client"

import { BiCategory } from "react-icons/bi"
import ScrollFadeText from "../components/ScrollFadeSlide"

export default function Services(){

    return(
        <div className="w-full flex flex-col md:flex-row items-center mt-20 justify-center md:px-40 p-5 ">
            <ScrollFadeText>

            
            <div className="md:w-[20%] w-[20%] mb-30 flex  justify-center h-[200px] md:h-screen ">
                <h1 className="text-8xl font-bold text-gray-700">Services</h1>
            </div>
            </ScrollFadeText>


            <div className="md:w-[80%] w-full h-screen flex flex-col gap-5 items-center  justify-center">
                <section className="w-[99%] md:max-w-[650px]" >
                   
                   <ScrollFadeText>
                    <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Bridging the Gap Between Farm and Market</h1>
                    
                    <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                        <BiCategory />
                        <hr className="w-[100%] border-green-500" />
                    </span>
                    </ScrollFadeText>

                    <p className="text-base text-justify p-0 leading-7">
                        We are building a vibrant digital marketplace that connects crop farmers and processors in the Middle Belt of Nigeria with reliable buyers across the country and beyond. Our mission is to empower local farmers, streamline agricultural trade, and ensure that farm produce and locally processed goods find the right markets at the right time.

                        The Middle Belt is one of Nigeria’s most fertile regions, producing a wide range of crops such as yams, cassava, maize, soybeans, rice, and more. Yet, many farmers face challenges accessing markets, fair pricing, and modern trade infrastructure.

                        <br /> <br />
                        Our platform changes that.

                        With our web app, farmers can showcase their harvests, processors can list value-added products, and buyers from individuals to large-scale distributors can connect directly with trusted suppliers.
                    </p>
                </section>
                
                <br /> <br />
                <section className="w-[99%] h-200 md:max-w-[650px]">
                    <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Our Mission</h1>
                    
                    <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                        <BiCategory />
                        <hr className="w-[100%] border-green-500" />
                    </span>

                    <p className="text-base text-justify p-0 leading-7">To create a sustainable, transparent, and profitable agricultural ecosystem in Nigeria’s Middle Belt by empowering local farmers and processors through technology and market access.</p>
                </section>
                
                <br /> <br />
                <section className="w-[99%] h-200 md:max-w-[650px]">
                    <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Our Vision</h1>
                    
                    <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                        <BiCategory />
                        <hr className="w-[100%] border-green-500" />
                    </span>

                    <p className="text-base text-justify p-0 leading-7">A connected agricultural community where every farmer and processor in Nigeria can thrive through access to markets, resources, and fair trade.</p>
                </section>
            </div>
            
        </div>
    )
}