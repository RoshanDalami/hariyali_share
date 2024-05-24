import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

const Items = ({title,number,Icon}) => {
  return (
    <div className="h-[50px] w-full ">
      <div className=" flex  bg-[#FFFFFF] h-[80px] w-[250px] border-2 rounded-lg m-4 border-blue-800 shadow-md hover:scale-105 ease-in-out duration-300 hover:font-bold">
        <div className="flex flex-col  ml-4  mt-2 ">
          <h1 className="text-gray-400">New Request</h1>
          <p className="text-blue-800 font-semibold text-xl">5</p>
        </div>
        <div className="h-[50px] flex-row " >
          <DocumentTextIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default Items;
