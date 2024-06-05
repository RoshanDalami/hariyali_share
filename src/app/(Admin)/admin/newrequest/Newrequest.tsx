"use client";
import React from "react";
import TableContent from "../../Components/TableContent";
import { useQuery } from "@tanstack/react-query";
import {
  GetRequest,
  DeleteRequest,
  UpdateOpenStatus,
  AcceptRequest
} from "@/services/apiServices/request/requestServices";
import { ShareRequest } from "@/types/types";
import {
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import note from "../../../../../public/note.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../../Components/Error";
import { useRouter } from "next/navigation";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();

const NewRequest = () => {
  const router = useRouter();
  const getRequestData = async () => {
    const { data } = await GetRequest();
    return data;
  };
  let {
    data: shareRequestList,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["Share"],
    queryFn: getRequestData,
  });
  if (shareRequestList?.length < 1) {
    return (
      <div className=" min-w-[80vw] -mt-20 flex items-center justify-center h-screen">
        <div>
          <Image src={note} alt="" width={500} height={500} />
          <h1 className="text-2xl py-2 text-center cursor-pointer bg-green-600 rounded-md shadow-md text-white " onClick={()=>router.push('/admin/newrequest/createRequest')} >
           Create Request

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
    <>
    <div className="flex justify-end mx-5 my-2">
      <button className="bg-green-600 rounded-md shadow-md text-white px-4 py-2" onClick={()=>router.push('/admin/newrequest/createRequest')} >Create Request</button>
    </div>
    <div className="mt-2">
      {shareRequestList?.map((item: ShareRequest, index: number) => {
        return (
          <div
            className={` ${
              item.isOpened ? "bg-gray-200/60" : "font-bold bg-white "
            } group flex items-center justify-between min-w-[80vw]   border-b-2 border-b-gray-100  text-center  hover:shadow-xl hover:pointer hover:bg-[#F2F6FC] hover:text-black hover:font-semibold p-2 cursor-pointer relative`}
            key={index}
          >
            <div className="ml-4  text-lg ">
              {" "}
              {"New Share Request By ::"}{" "}
              <span className=" uppercase ">{item.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 ">
                <div className="icon-container">
                  <CheckCircleIcon className="h-6 w-6 font-bold text-lime-700 " onClick={async()=>{
                    const data = {
                      id:item._id,
                      shareQuantity:item.shareQuantity,
                      shareApprovedDate:aa
                    }
                    const response = await AcceptRequest(data)
                    if(response?.status === 200){
                      refetch()
                    }
                  }} />
                  <span className="text-on-hover"
                    
                  >Approve</span>
                </div>
                <div className="icon-container">
                  <ExclamationCircleIcon
                    className="h-7 w-7 font-bold"
                    onClick={async() => {
                      await UpdateOpenStatus(item._id);
                      router.push(`/admin/newrequest/${item._id}`)
                    }}
                  />
                  <span className="text-on-hover">Details</span>
                </div>
                <div className="icon-container">
                  <PencilIcon
                    className="h-5 w-5 text-blue-600"
                    onClick={() =>
                      router.push(`/admin/newrequest/edit/${item._id}`)
                    }
                  />
                  <span className="text-on-hover">Edit</span>
                </div>
                <div className="icon-container">
                  <TrashIcon
                    className="h-7 w-7 text-red-600"
                    onClick={async () =>{ 
                      const response =await DeleteRequest(item._id)
                      if(response?.status === 200){
                        refetch()
                      }
                      
                    }}
                  />
                  <span className="text-on-hover">Delete</span>
                </div>
              </div>

              <div className="text-lg mr-10">{item.date}</div>
            </div>
            {!open ? (
              <div className="absolute h-2 w-2 bg-blue-600 rounded-full right-6 "></div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
      {/* <TableContent
        id={item._id}
        name={item.name}
        date={item.date}
        open={item.isOpened}
        key={index}
        sufix="New Share Request By ::"
        link="/admin/newrequest"
      />  */}
      {/* <div>

      <div className="icon-container bg-green-300 border p-2 border-black flex justify-center items-center h-screen ">
        <TrashIcon className="h-8 w-8"/>
        <span className="text-on-hover">delete</span>
      </div>
</div> */}
    </div>
    </>
  );
};

export default NewRequest;
