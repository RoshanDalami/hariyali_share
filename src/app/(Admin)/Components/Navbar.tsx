"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Modal from "@/app/(public)/Components/Modal";
const Navbar = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleLogoutFromAdmin = () => {
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <>
      {showModal && (
        <Modal>
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
                  <button className="bg-red-600 rounded-md shadow-md text-white px-4 py-2 font-bold" onClick={()=>handleLogoutFromAdmin()} >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
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
          text-green-600 font-bold"
          >
            Hariyali Share
          </p>
        </div>
        <div className=" flex items-center gap-3  ml-auto mr-12">
          <p className="text-green-600  text-2xl font-bold">
            <span className="text-black font-normal">Welcome!!</span> Super
            Admin
          </p>
          <button
            className="bg-red-600 rounded-md shadow-md text-white px-3 py-2"
            onClick={() => setShowModal(true)}
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
