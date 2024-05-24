"use client";
import React from "react";
import { GetAcceptedRequest } from "@/services/apiServices/request/requestServices";
import { useQuery } from "@tanstack/react-query";
import TableContent from "../../Components/TableContent";
import { ShareRequest } from "@/types/types";
import Image from "next/image";
import approve from '../../../../../public/approved.svg'
import { CircularProgress } from "@mui/material";
export default function ApprovedRequest() {
  const getApprovedRequest = async () => {
    const { data } = await GetAcceptedRequest();
    return data;
  };
  const {
    data: ApprovedRequest,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["approved"],
    queryFn: getApprovedRequest,
  });

  if (ApprovedRequest?.length < 1) {
    return (
      <div className=" min-w-[80vw] -mt-20 flex items-center justify-center h-screen">
        <div>
        <Image src={approve} alt="" width={500} height={500} />
        <h1 className="text-3xl text-center font-bold text-green-600">No Approved Applications ...</h1>
        </div>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="h-screen w-[80vw] flex items-center justify-center">
        <CircularProgress size={100} />
      </div>
    );
  return (
    <div>
      {ApprovedRequest?.map((item: ShareRequest, index: number) => {
        return (
          <TableContent
            key={index}
            name={item.name}
            date={item.date}
            id={item._id}
            open={item.isOpened}
            sufix="Approved Request of ::"
            link="/admin/approved"
          />
        );
      })}
    </div>
  );
}
