'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar2() {
    const router = useRouter();

    const logoutHandler = () =>{
        router.push('/login')
    }
  return (
    <div>
      <button className='bg-indigo-600 rounded-md  px-4 py-2 ' onClick={()=>logoutHandler()} >
        logout 
      </button>
    </div>
  )
}
