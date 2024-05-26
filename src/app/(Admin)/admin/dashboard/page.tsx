"use client";

import React from "react";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";

import {
  GetNewRequestCount,
  GetApprovedCount,
  GetDeclinedCount,
} from "@/services/apiServices/request/requestServices";

export default function Admin() {
  const getNewRequestCount = async () => {
    const { data } = await GetNewRequestCount();
    return data;
  };
  const getApprovedCount = async () => {
    const { data } = await GetApprovedCount();
    return data;
  };
  const getDeclined = async()=>{
    const {data} = await GetDeclinedCount();
    return data
  }
  const {
    data: NewRequest,
    isError: NewRequestError,
    isLoading: NewRequestLoading,
  } = useQuery({
    queryKey: ["new request count"],
    queryFn: getNewRequestCount,
  });
  const { data: Approved } = useQuery({
    queryKey: ["approved request"],
    queryFn: getApprovedCount,
  });
  const {data:Declined} = useQuery({
    queryKey:['declined'],
    queryFn:getDeclined
  })
  const arr = [
    {
      title: "New Request",
      number: NewRequest,
      icon: (
        <DocumentTextIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-red-600" />
      ),
    },
    {
      title: "Approved",
      number: Approved,
      icon: (
        <ShieldCheckIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-green-600" />
      ),
    },
    {
      title: "Declined",
      number: Declined,
      icon: (
        <ArchiveBoxXMarkIcon className="h-[50px] w-[50px] ml-16 mt-2 px-1 text-red-600" />
      ),
    },
  ];
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
