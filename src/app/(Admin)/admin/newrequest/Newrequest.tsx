"use client";
import React from "react";
import TableContent from "../../Components/TableContent";
import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/services/apiServices/request/requestServices";
import { ShareRequest } from "@/types/types";
import Image from "next/image";
import ErrorImage from '../.../../../../../../public/error.svg'
import note from '../../../../../public/note.svg'
import CircularProgress from "@mui/material/CircularProgress";

const NewRequest = () => {
  const getRequestData = async () => {
    const { data } = await GetRequest();
    return data;
  };
  const {
    data: shareRequestList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Share"],
    queryFn: getRequestData,
  });
  if (shareRequestList?.length < 1) {
    return (
      <div className=" min-w-[80vw] -mt-20 flex items-center justify-center h-screen">
        <div>
        <Image src={note} alt="" width={500} height={500} />
        <h1 className="text-3xl text-center font-bold text-green-600">No New Request ...</h1>
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

    if(isError){
      return (
        <div >
          <Image src={ErrorImage} alt="" width={500} height={500} />
          <h1></h1>


        </div>
      )
    }
  return (
    <div className="">
      {shareRequestList?.map((item: ShareRequest, index: number) => {
        return (
          <TableContent
            id={item._id}
            name={item.name}
            date={item.date}
            open={item.isOpened}
            key={index}
            sufix="New Share Request By ::"
            link="/admin/newrequest"
          />
        );
      })}
    </div>
  );
};

export default NewRequest;
