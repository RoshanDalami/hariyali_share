"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Image from "next/image";
import { ShareRequest } from "@/types/types";
import {
  GetRequestById,
  AcceptRequest,
  DeclineRequest,
} from "@/services/apiServices/request/requestServices";
import FormBorder from "@/app/(public)/Components/FormBorder";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Model from "@/app/(Admin)/Components/Model";
export default function IndividualRequest() {
    const [modelOpen,setModelOpen] = useState(false)
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const getRequestById = async (id: string) => {
    const { data }: { data: ShareRequest } = await GetRequestById(id);
    return data;
  };
  const [remarks,setRemarks] = useState('')
  const {
    data: IndividualRequest,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Individual", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="h-screen w-[80vw] flex items-center justify-center">
        <CircularProgress size={100} />
      </div>
    );

  const handleConfirm = async () => {
    const data = {
      id: IndividualRequest?._id,
      shareQuantity: IndividualRequest?.shareQuantity,
    };
    const response = await AcceptRequest(data);
    if (response?.status === 200) {
      router.push("/admin/newrequest");
    }
  };
  const handleDecline = async () => {
    const data = {
        id:id,
        remarks:remarks
    }
    const response = await DeclineRequest(data);
    if (response?.status === 200) {
      router.push("/admin/newrequest");
    }
  };

  return (
    <>
      { modelOpen &&
        <Model>
          <div className="bg-white px-3 py-5 rounded-md">
            <div>
                <label htmlFor="" className="labelText text-red-600">Reason to Decline</label>
              <input type="text" className="inputStyle w-full" onChange={(e)=>setRemarks(e.target.value)} />
              <div className="my-3 flex justify-end gap-3 items-center">
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded-md shadow-md font-bold"
                onClick={() => setModelOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md"
                onClick={() => handleDecline()}
              >
                Decline
              </button>

              </div>
            </div>
          </div>
        </Model>
      }
      <div className=" flex flex-col min-w-[80vw]  ">
        <div className="mb-6">
          <FormBorder title="Personal Details">
            <div className=" grid grid-cols-3 px-3 py-6">
              <p className="font-bold capitalize">
                Name : {IndividualRequest?.name}
              </p>
              <p className="font-bold capitalize">
                Grandfather Name: {IndividualRequest?.grandFatherName}
              </p>
              <p className="font-bold capitalize">
                Father Name : {IndividualRequest?.fatherName}
              </p>
              <p className="font-bold capitalize">
                Mother Name : {IndividualRequest?.motherName}
              </p>
              <p className="font-bold capitalize">
                Spouse Name : {IndividualRequest?.spouseName}
              </p>
              <p className="font-bold ">Email : {IndividualRequest?.email}</p>
            </div>
          </FormBorder>

          <div className="grid grid-cols-2">
            <FormBorder title="Pernament Address">
              <div className="px-3 py-5">
                <h1 className="font-bold capitalize">
                  State : {IndividualRequest?.permanentAddress?.stateId}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  District : {IndividualRequest?.permanentAddress?.districtId}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  Palika : {IndividualRequest?.permanentAddress?.palikaId}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  Ward : {IndividualRequest?.permanentAddress?.ward}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  Tole : {IndividualRequest?.permanentAddress?.tole}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  House No : {IndividualRequest?.permanentAddress?.houseNo}{" "}
                </h1>
              </div>
            </FormBorder>
            <FormBorder title="Temp Address">
              <div className="px-3 py-5">
                <h1 className="font-bold capitalize">
                  State : {IndividualRequest?.temporaryAddress?.stateId}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  District : {IndividualRequest?.temporaryAddress?.districtId}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  Palika : {IndividualRequest?.temporaryAddress?.palikaId}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  Ward : {IndividualRequest?.temporaryAddress?.ward}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  Tole : {IndividualRequest?.temporaryAddress?.tole}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  House No : {IndividualRequest?.temporaryAddress?.houseNo}{" "}
                </h1>
              </div>
            </FormBorder>
          </div>

          <FormBorder title="Citizenship Details">
            <div className="px-3 py-4 flex justify-between ">
              <p className="text-lg font-bold">
                Citizenship No:<span> {IndividualRequest?.citizenshipNo}</span>
              </p>
              <div>
                <h1 className="font-bold">Citizenship Front Image</h1>
                <Image
                  src={IndividualRequest?.citizenshipFrontImage!}
                  alt=""
                  width={200}
                  height={200}
                  className="max-h-68 "
                />
              </div>
              <div>
                <h1 className="font-bold">Citizenship Back Image</h1>

                <Image
                  src={IndividualRequest?.citizenshipBackImage!}
                  alt=""
                  width={200}
                  height={200}
                  className="max-h-68"
                />
              </div>
            </div>
          </FormBorder>
          <FormBorder title="Share Details">
            <div className="px-3 py-5 grid grid-cols-4">
              <p className="font-bold">
                Share Quantity : {IndividualRequest?.shareQuantity}
              </p>
              <p className="font-bold">
                Per Share Rate: {IndividualRequest?.shareRate}
              </p>
              <p className="font-bold">
                Total Share Amount:{IndividualRequest?.totalShareAmount}
              </p>
              <p className="font-bold">
                {" "}
                Share Applied Date : {IndividualRequest?.date}
              </p>
            </div>
          </FormBorder>
          <div className="my-3  flex gap-4 justify-end mx-9">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md"
              onClick={()=>setModelOpen(true)}
            >
              Decline
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md"
              onClick={() => handleConfirm()}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
