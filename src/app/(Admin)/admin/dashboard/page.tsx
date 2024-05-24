import React from "react";
import Items from "../../Components/Items";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/solid";

const arr = [
  {
    title: "New Request",
    number: "5",
    icon: (
      <DocumentTextIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-red-600" />
    ),
  },
  {
    title: "Approved",
    number: "5",
    icon: (
      <ShieldCheckIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-green-600" />
    ),
  },
  {
    title: "Declined",
    number: "5",
    icon: (
      <ArchiveBoxXMarkIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-red-600" />
    ),
  },
];
export default function Admin() {
  return (
    <div className="flex  ">
      {/* <Items />
      <Items />
      <Items /> */}
      {arr.map((item: any, index: number) => {
        return (
          <div className="h-[50px] w-full  " key={index}>
            <div className=" flex justify-between  bg-[#FFFFFF] h-[80px] w-[350px] border-2 rounded-lg m-4 border-blue-800 shadow-md hover:scale-105 ease-in-out duration-300 hover:font-bold">
              <div className="flex flex-col  ml-4  mt-2 ">
                <h1 className="text-gray-400">{item.title}</h1>
                <p className="text-blue-800 font-semibold text-xl">
                  {item.number}
                </p>
              </div>
              <div className="h-[50px] flex-row mr-2">{item.icon}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
