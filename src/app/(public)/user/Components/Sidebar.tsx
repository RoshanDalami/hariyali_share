"use client";

import React from "react";
import Image from "next/image";
import logo from "/public/logo_circle.jpeg";
import Link from "next/link";
import {} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname()
  const MenuList = [
    {
      link: "/user",
      title: "Dashboard",
    },
    // {
    //   link: "/user/profile",
    //   title: "Profile",
    // },
    {
      link: "/user/application",
      title: "Application",
    },
  ];

  return (
    <div className=" fixed z-20 h-screen w-[18%] bg-green-600">
      <div className="flex justify-center">
        <div className="mt-5 flex items-center flex-col">
          <Image
            className="rounded-full"
            width={100}
            height={40}
            src={logo}
            alt="logo"
          />
          <h1 className="my-3 font-bold text-white  text-xl px-2">
            Hariyali Share Platform
          </h1>
        </div>
      </div>
      <div className="h-[1px] bg-gray-100"></div>
      <div className="mt-4 ">
        {MenuList?.map((item, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <Link href={item.link}>
              <div
                className={` ${pathname === item.link ? 'text-green-600 bg-gray-200  ':"text-white "} text-xl font-bold hover:bg-gray-200 hover:text-green-600 px-3 py-3`}
              >
                {item.title}
              </div>
                </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
