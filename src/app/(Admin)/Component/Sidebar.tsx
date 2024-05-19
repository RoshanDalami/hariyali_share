"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const arr = [
    { title: "New Request", Link: "/admin/newrequest" },
    { title: "Approved", Link: "/admin/approved" },
    { title: "Declined", Link: "/admin/declined" },
  ];
  return (
    <div className=" flex flex-col fixed w-[20%]  text-center   bg-white h-screen mt-[88px] border-r-2 border-gray-300">
      {arr.map((item, index) => {
        const isActive = pathname == item.Link;
        return (
          //   <div key={index} className="border-b border-b-black py-2 hover:text-green-700 font-semibold">
          <div
            key={index}
            className={`border-b border-b-black py-4  font-semibold ${
              isActive ? "text-white bg-green-700 " : "hover:bg-green-700 hover:text-white"
            }`}>
            <Link href={item.Link}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
