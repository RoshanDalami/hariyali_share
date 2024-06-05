"use client";
import React from "react";
import {
  GetAcceptedRequest,
  GenerateCertificate,
} from "@/services/apiServices/request/requestServices";
import { useQuery } from "@tanstack/react-query";
import { ShareRequest } from "@/types/types";
import Image from "next/image";
import approve from "../../../../../public/approved.svg";
import { CircularProgress } from "@mui/material";
import Error from "../../Components/Error";
import { PrinterIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { useReactToPrint } from "react-to-print";
import { convertNumberToNepaliText, englishToNepali } from "@/utils/Utility";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ApprovedRequest() {
  const router = useRouter()
  const getApprovedRequest = async () => {
    const { data } = await GetAcceptedRequest();
    return data;
  };
  const {
    data: ApprovedRequest,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approved"],
    queryFn: getApprovedRequest,
  });

  if (ApprovedRequest?.length < 1) {
    return (
      <div className=" min-w-[80vw] -mt-20 flex items-center justify-center h-screen">
        <div>
          <Image src={approve} alt="" width={500} height={500} />
          <h1 className="text-3xl text-center font-bold text-green-600">
            No Approved Applications ...
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
      {ApprovedRequest?.map((item: ShareRequest, index: number) => {
        return (
          <div
            className={` ${
              item?.isOpened ? "bg-gray-200/60" : "font-bold bg-white "
            } group flex items-center justify-between min-w-[80vw]  h-[52px] border-b-2 border-b-gray-100  text-center  hover:shadow-xl hover:pointer hover:bg-[#F2F6FC] hover:text-black hover:font-semibold p-2 cursor-pointer relative`}
            key={index}
          >
            <div className="ml-4  text-[14px] ">
              {" "}
              {"Approved Request of ::"}{" "}
              <span className=" uppercase ">{item?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 ">
                {item?.shareCertificateNumber ? (
                  <div className="icon-container">
                    <PrinterIcon className="h-6 w-6 text-green-600" onClick={()=> router.push(`/admin/approved/print/${item?._id}`)} />
                    <span className="text-on-hover">Print Certificate</span>
                  </div>
                ) : (
                  <div className="icon-container">
                    <DocumentCheckIcon
                      className="h-5 w-5 text-blue-600"
                      onClick={async () => {
                        const response = await GenerateCertificate(item._id);
                        if (response?.status === 200) {
                          toast.success("Certificate Generated Successfully");
                          refetch();
                        } else {
                          toast.error("Certificate Generation failed");
                        }
                      }}
                    />
                    <span className="text-on-hover">Generate Certificate</span>
                  </div>
                )}
              </div>

              <div className="text-md mr-10">{item?.shareApprovedDate}</div>
            </div>
            {!open ? (
              <div className="absolute h-2 w-2 bg-blue-600 rounded-full right-6 "></div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
      
    </div>
  );
}
