"use client"

import { useParams, useRouter } from "next/navigation";
import { produceData } from "../../components/dummyData";
import { BsBack } from "react-icons/bs";

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
        <div>
            <img src={produceItem.pic.src} width={100} height={100} loading="lazy" alt="" />
            <button onClick={()=>router.back()}><BsBack /> </button>
            <h1>{produceItem.pname}</h1>
            <h2>Type: {produceItem.category}</h2>
            <p>Type: {produceItem.desc}</p>
        </div>
    )
}