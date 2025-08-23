"use client"

import Image from "next/image"
import contactLogo from '../../public/Bidah Logo-05.png'
import { GrContact } from "react-icons/gr"
import { MdEmail } from "react-icons/md"
import { TfiEmail } from "react-icons/tfi"
import { BiPhone } from "react-icons/bi"
import { GoLocation } from "react-icons/go"
import ButtonHoverTapEffect from "../components/ButtonHoverTapEffect"
import {motion, AnimateSharedLayout } from "framer-motion"

export default function Contact(){

    return(
        <div className="md:w-full w-full pt-20 grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className=" w-full flex justify-start pl-10 flex-col gap-5 ">
                            <h1 className="text-4xl font-bold text-gray-700">Contact</h1>
                            <Image src={contactLogo} width={850} height={450} alt="contact logo" />
                        </div>
            
            
                        <motion.div className=" w-full h-full overflow-y-clip flex flex-col gap-5 items-center  justify-center">
                            <section className="w-[99%] md:max-w-[650px]" >
                                <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Contact us</h1>
                                
                                <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                                    <span className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-green-500"><GrContact /></span>
                                    <hr className="w-[100%] border-green-500" />
                                </span>
                                <br />
                                
                                    {/* Contact Form */}
                                    <div className="container glass w-full h-[100vh] flex flex-col gap-5 items-center justify-center text-sm">
                                      
                                        <div className="flex p-0 flex-col shadow-2xl backdrop-blur-500 items-center min-h-[500px] justify-center gap-5 bg-white/20 md:w-full p-15  w-[100%] rounded-lg border border-white/20 border-left-green-500">
                                            <form action="" className="form p-5 w-full flex flex-col gap-5 p-2">
                                                <label htmlFor="fullname">Full Name:</label>
                                                <input type="text" name="usefullname" id="fullname" placeholder="John Doe" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                                                
                                                <label htmlFor="email">Email:</label>
                                                <input type="email" name="email" id="email" placeholder="johndoe@example.com" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                                                
                                                <label htmlFor="tel">Phone:</label>
                                                <input type="tel" name="tel" id="tel" placeholder="+234 802 993 554" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                                                
                                                <label htmlFor="fullname">Full Name:</label>
                                                <input type="text" name="usefullname" id="fullname" placeholder="John Doe" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                                                
                                                <label htmlFor="message">Message:</label>
                                                <textarea name="message" id="message" placeholder="Hello, please enter your message here" className=" w-full p-2 bg-dark-500 border rounded-sm shadow-lg" />
                                                
                                                <br />

                                                <ButtonHoverTapEffect type="submit" className="btn border border-green-500 border-solid w-[250px] bg-transparent p-3 rounded-sm cursor-pointer hover:bg-green-500 text-white
                                                    transform transition-transform hover:scale-110 duration-300 ease-in-out
                                                ">Login</ButtonHoverTapEffect>
                                            </form>
                                        </div>

                                    </div>
                          
                            </section>
                            
                            <br /> <br />
                            <section className="w-[99%] h-200 md:max-w-[650px]">
                                <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Reach us via</h1>
                                
                                <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                                    <span className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-green-500"><MdEmail /></span>
                                    <hr className="w-[100%] border-green-500" />
                                </span>

                                    <div className="flex flex-col justify-start items-start gap-5">
                                        <br />
                                        <span className="flex flex-row justify-center items-center gap-5"><GoLocation />  <p className="text-[1.5rem] text-justify p-0 leading-7">No. EE4, Abba Kyari, Zone E Legislative Quarter Apo.</p></span>
                                        <span className="flex flex-row justify-center items-center gap-5"><BiPhone />  <p className="text-[1.5rem] text-justify p-0 leading-7">+234 - 7019 207 099</p></span>
                                        <span className="flex flex-row justify-center items-center gap-5"><TfiEmail /> <p className="text-[1.5rem] text-justify p-0 leading-7">info@bidah.com</p></span>

                                    </div>
                            </section>
                            
                            <br /> <br />
                            {/* <section className="w-[99%] h-200 md:max-w-[650px]">
                                <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Our Vision</h1>
                                
                                <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                                    <BiCategory />
                                    <hr className="w-[100%] border-green-500" />
                                </span>
            
                                <p className="text-base text-justify p-0 leading-7">A connected agricultural community where every farmer and processor in Nigeria can thrive through access to markets, resources, and fair trade.</p>
                            </section> */}
                        </motion.div>
        </div>
    )
}