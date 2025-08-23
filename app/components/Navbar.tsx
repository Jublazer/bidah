"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { hover, useScroll } from "framer-motion"
import logo from '../../public/Bidah Logo-01.png'
import Image from "next/image"
import { AiFillHome, AiOutlineBank, AiOutlineClose, AiOutlineContacts, AiOutlineHome, AiOutlineInfo, AiOutlineMenu, AiOutlineMessage, AiOutlineMoneyCollect, AiOutlineShop } from "react-icons/ai"


export default function Hero(){
    const [linkNav, setLinkNav] = useState(false)

    const toggleNav = ()=>{
        setLinkNav(!linkNav)
    }

    const closeNav = ()=>{
        setLinkNav(false)
    }

    const navLinks = [
        {id: 1, link: '/', title:'Home', icn:<AiOutlineHome size={25} className=" transform transition-transfomr hover:scale-150 duration-300 ease-in-out " />},
        {id: 2, link: '/market', title:'Market', icn:<AiOutlineShop size={25} className=" transform transition-transfomr hover:scale-150 duration-300 ease-in-out " />},
        {id: 3, link: '/services', title:'Services', icn:<AiOutlineBank size={25} className=" transform transition-transfomr hover:scale-150 duration-300 ease-in-out " />},
        {id: 4, link: '/contact', title:'Contact', icn:<AiOutlineMessage size={25} className=" transform transition-transfomr hover:scale-150 duration-300 ease-in-out " />},

    ]
    return(
        <nav className="flex md:w-full w-[256px] flex-col md:flex-row mt-5 md:px-30 mb-5 items-center justify-center gap-30 backdrop-blur-10">
            <div className="flex w-full justify-center space-between items-center gap-10">
                <Link href={'/'} className="font-extrabold justify-start text-green-300">
                    <Image src={logo.src} width={45} height={45} alt="site logo" />
                </Link>

                <div className="transform transition-transform duration-3000 ease-in-out md:hidden">
                   {
                    linkNav ? <AiOutlineClose onClick={()=>setLinkNav(false)} size={25} /> : <AiOutlineMenu onClick={()=>setLinkNav(true)} size={25}/>
                   } 
                </div>
            </div>
            <div className="hidden md:flex gap-4">
                {
                    navLinks.map(item=>(
                        <Link key={item.id} href={item.link} className="relative group mx-auto">
                            {item.icn} 
                            <span className=" absolute bottom-[-12px] mt-1 left-0 w-full h-1 transform scale-y-0 group-hover:scale-y-100 
                            transition transform duration-300 ease-in-out"><p className="font-regular text-xs text-green-500">{item.title}</p></span>
                        </Link>
                    ))
                }
                
            </div>

            <div className="w-full ">
                { linkNav ? (
                        <div className="flex flex-col w-full h-screen bg-dark transform hover:text-white duration-3000 ease-in-out  md:hidden">
                            { 
                            navLinks.map(item=>(
                                <Link key={item.id} href={item.link} onClick={closeNav} className="flex flex-row mx-auto text-green-300 gap-5 w-full p-3 border-b">
                                    {item.icn} 
                                    <span className=""><p className="font-regular flex justify-center items-center text-sm text-white-500">{item.title}</p></span>
                                </Link>
                                )) 
                            }
                        </div>
                    ) : null
                }
            </div>
        </nav>
    )
}