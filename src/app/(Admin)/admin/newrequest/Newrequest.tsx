"use client";
import React from "react";
import TableContent from "../../Components/TableContent";
import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/services/apiServices/request/requestServices";
import { ShareRequest } from "@/types/types";

import Image from "next/image";
import note from '../../../../../public/note.svg'
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../../Components/Error";

const NewRequest = () => {
  const getRequestData = async () => {
    const { data } = await GetRequest();
    return data;
  };
  let {
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
        <Error/>
      )
    }
  return (
    <div className="">

        {/* <table className="w-full border-collapse">
          <tr>
            <th className="border border-black px-3 py-4">S.N</th>
            <th className="border border-black px-3 py-4">Applicant Name</th>
            <th className="border border-black px-3 py-4">Applicant Father Name</th>
            <th className="border border-black px-3 py-4">Applied Date</th>
            <th className="border border-black px-3 py-4">Action</th>
          </tr>
          {
            shareRequestList?.map((item:ShareRequest,index:number)=>{
              return(
                <tr key={index}>

                  <th className="border border-black px-3 py-4">{index + 1}</th>
                  <th className="border border-black px-3 py-4">{item.name}</th>
                  <th className="border border-black px-3 py-4">{item.fatherName}</th>
                  <th className="border border-black px-3 py-4">{item.date}</th>
                  <th className="border border-black px-3 py-4">
                    <div>
                      <button>
                        
                      </button>
                    </div>
                    </th>

                </tr>
              )
            })
          }
        </table> */}
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
