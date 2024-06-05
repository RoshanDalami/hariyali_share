"use client";

import React from "react";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { DonutChart } from "@tremor/react";
import {
  GetNewRequestCount,
  GetApprovedCount,
  GetDeclinedCount,
} from "@/services/apiServices/request/requestServices";
import CountUp from "react-countup";
import { BarChart } from "@tremor/react";
export default function Admin() {
  const getNewRequestCount = async () => {
    const { data } = await GetNewRequestCount();
    return data;
  };
  const getApprovedCount = async () => {
    const { data } = await GetApprovedCount();
    return data;
  };
  const getDeclined = async () => {
    const { data } = await GetDeclinedCount();
    return data;
  };
  const {
    data: NewRequest,
    isError: NewRequestError,
    isLoading: NewRequestLoading,
  } = useQuery({
    queryKey: ["new request count"],
    queryFn: getNewRequestCount,
  });

  const { data: Approved } = useQuery({
    queryKey: ["approved request count"],
    queryFn: getApprovedCount,
  });
  const { data: Declined } = useQuery({
    queryKey: ["declined request count"],
    queryFn: getDeclined,
  });

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

  const datahero = [
    {
      name: "New Request",
      value: NewRequest,
      borderColor: "transparent",
      borderWidth: 0,
    },
    {
      name: "Approved Request",
      value: Approved,
      borderColor: "transparent",
      borderWidth: 0,
    },
    {
      name: "Declined Request",
      value: Declined,
      borderColor: "transparent",
      borderWidth: 0,
    },
  ];

  const chartdata = [
    {
      name: "New Request",
      "Request Details": NewRequest,
    },
    {
      name: "Approved",
      "Request Details": Approved,
    },
    {
      name: "Declined",
      "Request Details": Declined,
    },
  ];

  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <div className="flex flex-col gap-10 pb-10 ">
      <div className="flex  ">
        {arr.map((item: any, index: number) => {
          return (
            <div className="h-[50px] w-full  " key={index}>
              <div className=" flex justify-between  bg-[#FFFFFF] h-[80px] w-[350px] border-2 rounded-lg m-4 border-blue-800 shadow-md hover:scale-105 ease-in-out duration-300 hover:font-bold">
                <div className="flex flex-col  ml-4  mt-2 ">
                  <h1 className="text-gray-400">{item.title}</h1>
                  <p className="text-blue-800 font-semibold text-xl">
                    <CountUp start={0} end={item.number} />
                  </p>
                </div>
                <div className="h-[50px] flex-row mr-2">{item.icon}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 ml-10  ">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold">Request Information</h1>
          <DonutChart
            data={datahero}
            variant="pie"
            showAnimation
            showTooltip
            showLabel
            className="h-96 w-96"
            colors={["gray", "green", "red"]}
            valueFormatter={dataFormatter}
          />
        </div>
        <div className="px-6 mt-10">
          <h1 className="text-2xl font-bold ">Share Request Information</h1>

          <div className="">
            <BarChart
              data={chartdata}
              index="name"
              categories={["Request Details"]}
              colors={["lime"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
