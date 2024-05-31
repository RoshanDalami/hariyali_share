'use client'
import React,{useState} from 'react'
import { useQuery } from "@tanstack/react-query";
import {Me} from '@/services/apiServices/user/userServices'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Modal from '../../Components/Modal';
export default function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()
    const getMe = async() =>{
        const {data} = await Me();
        return data
    }
    const {data:Userdata} = useQuery({
        queryKey:["Me"],
        queryFn:getMe
    })
    const logoutHandler = () =>{
        router.push("/")
        Cookies.remove('token')
    }
  return (
    <>
    {
     showModal &&   
    <Modal >
    <div className=" flex items-center justify-center ">
            <div className="bg-white h-28 rounded-md   w-2/4">
              <h1 className="text-2xl font-bold text-center mt-5 ">
                Confirm logout ?
              </h1>
              <div className="flex justify-center mt-4">
                <div className="flex gap-3  ">
                  <button className="bg-gray-300 rounded-md px-4 py-2 text-white font-bold " onClick={()=>setShowModal(false)} >
                    Cancel
                  </button>
                  <button className="bg-red-600 rounded-md shadow-md text-white px-4 py-2 font-bold" onClick={()=>logoutHandler()} >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
    </Modal>
    }
    <div className='fixed z-10 h-16 bg-green-600 w-full'>
        <div className='flex justify-end mx-10 items-center h-full gap-3'>
            <span className='text-xl font-bold text-white'>Welcome , {Userdata?.username}</span>
            <button className='bg-red-600  px-2 py-2 rounded-full text-white' onClick={()=>setShowModal(true)}>Logout</button>
        </div>
    </div>
    </>
  )
}
