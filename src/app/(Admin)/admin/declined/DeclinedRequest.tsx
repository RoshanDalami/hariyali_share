"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetDeclinedRequest } from "@/services/apiServices/request/requestServices";
import { ShareRequest } from "@/types/types";
import TableContent from "../../Components/TableContent";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import decline from "../../../../../public/decline.svg";
import Error from "../../Components/Error";
export default function DeclinedRequest() {
  const getDeclinedRequest = async () => {
    const { data } = await GetDeclinedRequest();
    return data;
  };
  const {
    data: DeclinedRequest,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["declined"],
    queryFn: getDeclinedRequest,
  });
  // Ensure DeclinedRequest is always an array
 
  if (DeclinedRequest?.length < 1) {
    return (
      <div className=" min-w-[80vw] -mt-20 flex items-center justify-center h-screen">
        <div>
          <Image src={decline} alt="" width={500} height={500} />
          <h1 className="text-3xl text-center font-bold text-green-600">
            No Declined Applications ...
          </h1>
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

  if (isError) {
    return <Error />;
  }
  return (
    <div>
      {DeclinedRequest?.map((item: ShareRequest, index: number) => {
        return (
          <TableContent
            key={index}
            name={item.name}
            date={item.date}
            id={item._id}
            open={item.isOpened}
            sufix="Declined Request of ::"
            link="/admin/declined"
          />
        );
      })}
    </div>
  );
}
