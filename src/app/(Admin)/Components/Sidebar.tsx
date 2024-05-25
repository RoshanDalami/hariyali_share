"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShieldCheckIcon,
  ArchiveBoxXMarkIcon,
  DocumentTextIcon,
  FolderOpenIcon
} from "@heroicons/react/24/solid";
const Sidebar = () => {

  const pathname = usePathname();
  
  const arr = [
    {
      title: "Fiscal Year ",
      Link: "/admin/fiscalyear",
      icon: (
        <FolderOpenIcon
          className={`h-6 w-6  ${
            pathname === "/admin/fiscalyear" ? "text-white" : "text-indigo-600"
          }  `}
        />
      ),
    },
    {
      title: "Dashboard",
      Link: "/admin/dashboard",
      icon: (
        <HomeIcon
          className={`h-6 w-6  ${
            pathname === "/admin/dashboard" ? "text-white" : "text-[#22c55e]"
          }  `}
        />
      ),
    },
    {
      title: "New Request",
      Link: "/admin/newrequest",
      icon: (
        <DocumentTextIcon
          className={`h-6 w-6  ${
            pathname === "/admin/newrequest" ? "text-white" : "text-rose-600"
          }  `}
        />
      ),
    },
    {
      title: "Approved",
      Link: "/admin/approved",
      icon: (
        <ShieldCheckIcon
          className={`h-6 w-6  ${
            pathname === "/admin/approved" ? "text-white" : "text-green-600"
          }  `}
        />
      ),
    },
    {
      title: "Declined",
      Link: "/admin/declined",
      icon: (
        <ArchiveBoxXMarkIcon
          className={`h-6 w-6  ${
            pathname === "/admin/declined" ? "text-white" : "text-red-600"
          }  `}
        />
      ),
    },
  ];
  return (
    <div className=" flex flex-col fixed w-[20%]  text-center   bg-white h-screen mt-[88px] border-r border-gray-300">
      {arr.map((item, index) => {
        const isActive = pathname == item.Link;
        return (
          <Link
            href={item.Link}
            key={index}
            className={`border-b border-gray-300 py-4  font-semibold ${
              isActive
                ? "text-white bg-green-600 "
                : "hover:bg-green-600 hover:text-white"
            }`}
          >
            <div
              className={` flex items-center  justify-center gap-5
            }`}
            >
              {item.icon}
              <p>{item.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
