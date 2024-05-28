'use client'
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import {Me} from '@/services/apiServices/user/userServices'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export default function Navbar() {
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
    <div className='fixed z-10 h-16 bg-green-600 w-full'>
        <div className='flex justify-end mx-10 items-center h-full gap-3'>
            <span className='text-xl font-bold text-white'>Welcome , {Userdata?.username}</span>
            <button className='bg-red-600  px-2 py-2 rounded-full text-white' onClick={()=>logoutHandler()}>Logout</button>
        </div>
    </div>
  )
}
