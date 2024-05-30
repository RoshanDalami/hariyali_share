'use client'
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Navbar = () => {
  const router = useRouter()
  const handleLogoutFromAdmin = ()=>{
      Cookies.remove('token');
      router.push('/')
  }
  return (
    <div className="flex fixed bg-white h-[88px] w-full  z-10 border-b border-gray-300 ">
      <div className="flex items-center ml-12 gap-4">
        <Image
          className=" flex h-[80px] w-[80px] rounded-full"
          src="/logo_circle.jpeg"
          alt="hariyali share"
          height={150}
          width={200}
        />
        <p
          className=" text-2xl 
          text-green-600 font-bold">
          Hariyali Share
        </p>
      </div>
      <div className=" flex items-center gap-3  ml-auto mr-12">
        <p className="text-green-600  text-2xl font-bold">
          <span className="text-black font-normal">Welcome!!</span> Super Admin
        </p>
        <button className="bg-red-600 rounded-md shadow-md text-white px-3 py-2" onClick={()=>handleLogoutFromAdmin()} >logout</button>
      </div>
    </div>
  );
};

export default Navbar;
