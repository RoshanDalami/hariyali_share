import React from "react";
import Image from "next/image";
const Navbar = () => {
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
      <div className=" flex items-center  ml-auto mr-12">
        <p className="text-green-600  text-2xl font-bold">
          <span className="text-black font-normal">Welcome!!</span> Super Admin
        </p>
      </div>
    </div>
  );
};

export default Navbar;
