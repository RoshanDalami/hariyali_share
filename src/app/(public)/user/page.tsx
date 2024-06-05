"use client";
import React from "react";
import DashboardCard from "./Components/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import {
  GetUserShareAmount,
  GetUserShareQuantity,
  GetUserApprovedRequest,
  GetUserDeclinedRequest,
  GetUserPendingRequest,
  GetUserTotalShareRequest,
} from "@/services/apiServices/request/requestServices";
import { ArrowTrendingUpIcon , MinusCircleIcon , ShieldCheckIcon,HandRaisedIcon} from "@heroicons/react/24/outline";
import { CircularProgress } from "@mui/material";
import CountUp from 'react-countup'
export default function Home() {
  const getShareAmount = async () => {
    const { data } = await GetUserShareAmount();
    return data;
  };
  const getShareQuantity = async () => {
    const { data } = await GetUserShareQuantity();
    return data;
  };
  const getUserTotalShareRequest = async () => {
    const { data } = await GetUserTotalShareRequest();
    return data;
  };
  const getUserPendingShareRequest = async () => {
    const { data } = await GetUserPendingRequest();
    return data;
  };
  const getUserApprovedShareRequest = async () => {
    const { data } = await GetUserApprovedRequest();
    return data;
  };
  const getUserDeclinedShareRequest = async () => {
    const { data } = await GetUserDeclinedRequest();
    return data;
  };

  const { data: ShareAmount } = useQuery({
    queryKey: ["ShareAmount"],
    queryFn: getShareAmount,
  });
  const { data: ShareQuantity } = useQuery({
    queryKey: ["Quantity"],
    queryFn: getShareQuantity,
  });
  const { data: TotalRequest } = useQuery({
    queryKey: ["Total Request"],
    queryFn: getUserTotalShareRequest,
  });
  const { data: PendingRequest } = useQuery({
    queryKey: ["Pending Request"],
    queryFn: getUserPendingShareRequest,
  });
  const { data: ApprovedRequest } = useQuery({
    queryKey: ["Approved"],
    queryFn: getUserApprovedShareRequest,
  });
  const { data: DeclinedRequest } = useQuery({
    queryKey: ["Declined"],
    queryFn: getUserDeclinedShareRequest,
  });

  const DashboardCardArray = [
    {
      title: "Share Amount",
      data: ShareAmount,
      icon: <ArrowTrendingUpIcon className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Share Quantity",
      data: ShareQuantity,
      icon: <ArrowTrendingUpIcon className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Total Share Request",
      data: TotalRequest,
      icon: <ArrowTrendingUpIcon className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Pending Request",
      data: PendingRequest,
      icon: <HandRaisedIcon className="h-12 w-12 text-rose-600" />,
    },
    {
      title: "Approved Request",
      data: ApprovedRequest,
      icon: <ShieldCheckIcon className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Declined Request",
      data: DeclinedRequest,
      icon: <MinusCircleIcon className="h-10 w-10 ml-5 text-red-600" />,
    },
  ];
  return (
    <div className="grid grid-cols-3 w-[78vw]   items-center gap-4">
      {DashboardCardArray?.map((item, index) => {
        return (
          <DashboardCard
            title={item.title}
            data={item.data}
            icon={item.icon}
            key={index}
          />
        );
      })}
      <div>
        
      </div>
    </div>
  );
}
