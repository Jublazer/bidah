"use client"

import Image from "next/image"
import contactLogo from '../../public/Bidah Logo-05.png'
import { GrContact } from "react-icons/gr"
import { MdEmail } from "react-icons/md"
import { TfiEmail } from "react-icons/tfi"
import { BiPhone } from "react-icons/bi"
import { GoLocation } from "react-icons/go"
import ButtonHoverTapEffect from "../../components/ButtonHoverTapEffect"
import {motion, AnimateSharedLayout } from "framer-motion"
import ComponentsScroll from "../../components/ComponentEntranceExit"
import { Send } from "lucide-react"

export default function Contact(){

    return(
        <div className="md:w-full w-full bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className=" w-full flex justify-start pl-10 flex-col gap-5 ">
                            <ComponentsScroll>
                                <Image src={contactLogo}  className="w-md h-md" height={450} loading="lazy" alt="contact logo" />
                            </ComponentsScroll>
                        </div>
            
            
                        <div className=" w-full h-full overflow-y-clip flex flex-col gap-2 items-center  justify-center">
                        <ComponentsScroll>
                            <section className="w-[100%] px-20" >
                                <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Contact us</h1>
                                
                                <span className="w-full  mt-2 flex fle-row items-center gap-2 text-justify">
                                    <span className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-green-500"><GrContact  className="text-green-500" /></span>
                                    <hr className="w-[100%] border-green-500" />
                                </span>
                                    {/* Contact Form */}
                                    <div className="w-full shiny-effect h-auto flex flex-col gap-5 items-center justify-center text-sm">
                                      
                                        <div className="flex flex-col shadow-2xl items-center h-auto py-10 justify-center gap-5 bg-white/10 md:w-full mt-5 w-full rounded-lg border-b-10 border-b-green-500">
                                            <form action="" className="form w-full flex flex-col gap-5 p-5 md:p-10">
                                                <input type="text" name="usefullname" id="fullname" placeholder="John Doe" className=" w-full p-1 bg-white/10 border-[#2f2f2f]/20 rounded-sm shadow-md" />
                                                
                                                <input type="email" name="email" id="email" placeholder="johndoe@example.com" className="  w-full p-1 bg-white/10 border-[#2f2f2f]/20 rounded-sm shadow-md" />
                                                
                                                <input type="tel" name="tel" id="tel" placeholder="+234 802 993 554" className="  w-full p-1 bg-white/10 border-[#2f2f2f]/20 rounded-sm shadow-md" />
                                                
                                                <input type="text" name="usefullname" id="fullname" placeholder="John Doe" className="  w-full p-1 bg-white/10 border-[#2f2f2f]/20 rounded-sm shadow-md" />
                                                
                                                <textarea name="message" id="message" placeholder="Hello, please enter your message here" className="  w-full p-1 bg-white/10 border-[#2f2f2f]/20 rounded-sm shadow-md" />

                                                <ButtonHoverTapEffect type="submit" className="flex flex-row text-green-500 justify-center gap-5 items-center btn border border-green-500 border-solid w-full bg-transparent p-2 rounded-sm cursor-pointer hover:bg-green-500 dark:text-green-500
                                                    transform transition-transform hover:scale-100 duration-300 ease-in-out
                                                "><Send size={20} /> Send</ButtonHoverTapEffect>
                                            </form>
                                        </div>

                                    </div>
                          
                            </section>
                            
                            <br /> <br />
                            <section className="w-[99%] h-auto px-20">
                                <h1 className="md:text-4xl text-2xl font-bold md:font-extrabold text-green-500 text-justify">Reach us via</h1>
                                
                                <span className="w-full  mt-5 flex fle-row items-center gap-2 text-justify">
                                    <span className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-green-500"><MdEmail className="dark:text-green-500" /></span>
                                    <hr className="w-[100%] border-green-500" />
                                </span>

                                    <div className="flex flex-col justify-start items-start gap-5">
                                        <br />
                                        <span className="flex flex-row justify-center items-center gap-5"><GoLocation size={30} className="dark:text-gray-200" />  <p className="text-lg text-justify p-0 leading-5 dark:text-gray-400">No. EE4, Abba Kyari, Zone E Legislative Quarter Apo.</p></span>
                                        <span className="flex flex-row justify-center items-center gap-5"><BiPhone size={30} className="dark:text-gray-200" />  <p className="text-lg text-justify p-0 leading-5 dark:text-gray-400">+234 - 7019 207 099</p></span>
                                        <span className="flex flex-row justify-center items-center gap-5"><TfiEmail size={30} className="dark:text-gray-200" /> <p className="text-lg text-justify p-0 leading-5 dark:text-gray-400">info@bidah.com</p></span>

                                    </div>
                            </section>
                        </ComponentsScroll>
                        </div>
        </div>
    )
}