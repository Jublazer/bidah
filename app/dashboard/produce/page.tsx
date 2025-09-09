"use client"

import { produceData, users, usersType } from "@/app/components/dummyData"
import React, {useState} from "react"
import { BsPlusCircle } from "react-icons/bs";

export default function DashboardProducePage(){
    const [produceForm, setProduceForm]=useState([{
                    pid: "",                    
                    uid: "",
                    pname: "",
                    category: "",
                    state: "",
                    price: "",
                    popularity: "",
                    qty: "",
                    desc: "",
                    time_stamp: "",
                    pic: "",
    }]);
    const [modalOpen,setModalOpen] = useState(false)
    const [products, setProducts]=useState(produceData)


    // get user from produce data
      const postBy =(uid:number)=>{
      const userId = produceData[uid]?.uid;
    
      const matchUser = users.find((u) => (u as usersType).uid === userId);
      return matchUser?.username || 'Unknown User';
    }
    
      // handle form
      const handleFormSubmit = (e:any)=>{
        setProduceForm(e.target.value['name'])
      }
    
      // handle change 
      const handleChange = (e:any)=>{
        const {name, value} = e.target;
    
        setProduceForm((prev)=>({
          ...prev, [name]:value
        }))
      }
      

    // Create handle state
    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        console.log(produceForm)
        // setProducts((prev)=>[{...prev, produceForm}])
    }

    return(
                <div className="w-full flex flex-col justify-center items-center " >
                    <div className="max-h-[400px] w-[60%] bg-gray-400/10 rounded-lg shadow-lg backdrop-blur flex flex-col justify-start items-center p-5 mb-5">
                        <h2>Search and filter categories here</h2>
                    </div>



                {/* Product Menue */}
            <div className="flex flex-col justify-center items-center p-10 w-full relative ">
                    <h1>Current Produce</h1>
                    <hr />
                    <div onClick={()=>setModalOpen(true)} className="absolute top-1 right-40 cursor-pointer p-5 bg-gray-200 rounded-full shadow-lg transform-scale hover:scale-110 duration-300 ease-in-out" >
                    <BsPlusCircle className="text-green-700" />
                    </div>
                    {
                    modalOpen && (
                            <div onClick={()=>setModalOpen(false)} className="w-full absolute top-0 left-0 h-screen flex justify-center items-center bg-dark-900/20 backdrop top-[50%] left-[50%] z-20">
                            <div className="w-[400px] h-[400px] p-5 bg-gray-200 rounded-lg shadow-lg transform-transition transition-all duration-300 ease-in-out" > 
                            </div>
                            </div>
                    )
                    }
                
            </div>




                    <div className="max-h-[400px] w-[60%] bg-gray-400 rounded-lg overflow-y-scroll shadow-lg backdrop-blur flex flex-col justify-start items-center p-5 mb-10">
                            {/* Produce mapping here */}
                            <div className="w-full flex flex-col">
                                <span>
                                    <h2 className="text-green-800 font-bold text-2xl min-w-[120px] mb-10">Total Produce: { products.length    }</h2>
                                </span>
                                {
                                    products.map((item)=>(
                                        <div key={item.pid} className="w-full p-5 flex flex-row mb-3 rounded-lg justify-start items-center bg-gray-100/30">
                                            <span className="text-green-800 font-bold md:text-2xl text-base  min-w-[150px] mr-5">
                                                {item.pname}
                                            </span>
                                            <div className="w-full flex flex-row items-center justify-around">
                                                <span className="text-gray-900 text-base min-w-[120px]">{item.category}</span>
                                                <span className="text-gray-900 text-base min-w-[120px]">{item.price}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    </div>
                 
                </div>
    )
}