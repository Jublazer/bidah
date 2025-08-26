"use client"

import { useParams, useRouter } from "next/navigation";
import { produceData } from "../../components/dummyData";
import { BsBack } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

export default function ProducePage(){
    const params = useParams()
    const router = useRouter()
    const { pid } = params;
    
    console.log(pid)

    // find the produce item by id
    const produceItem = produceData.find(item=>item.pid===Number(pid));

    if(!produceItem){
        return<div>Not Found</div>;
    }

    return(
        <div className="card w-3xl p-3 bg-white/10 justify-center items-center glass">
            <div className="w-full p-3 bg-white/10 mb-10 justify-start"><button className="scale-100 transform-scale transition hover:scale-180 duration-300 ease-in-out" onClick={()=>router.back()}><BiArrowBack /> </button></div>
            <div className="w-full flex flex-row justify-between mb-10 item-center container">

                <img className="scale-100 transform-scale transition hover:scale-180 select:translate-y-50 duration-300 ease-in-out" src={produceItem.pic.src} width={100} height={100} loading="lazy" alt="" />
                
                <div>
                
                    <h1>{produceItem.pname}</h1>
                    <h2>Type: {produceItem.category}</h2>
                    <p>Type: {produceItem.desc}</p>

                </div>

            </div>
        </div>
    )
}