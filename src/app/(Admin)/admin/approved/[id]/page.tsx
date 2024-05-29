"use client";

import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useRef } from "react";
import Image from "next/image";
import { ShareRequest } from "@/types/types";
import Certificatee from "@/app/(Admin)/Components/Certificatee";
import {
  GetRequestById,
  AcceptRequest,
  DeclineRequest,
  GenerateCertificate,
} from "@/services/apiServices/request/requestServices";
import FormBorder from "@/app/(public)/Components/FormBorder";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
export default function IndividualRequest() {
  const { id }: { id: string } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content:() => componentRef.current!,
  })
  const router = useRouter();
  const getRequestById = async (id: string) => {
    const { data }: { data: ShareRequest } = await GetRequestById(id);
    return data;
  };
  const {
    data: IndividualRequest,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Individual request", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });

  const generateCertificate = async () => {
    const response = await GenerateCertificate(id);
    if (response?.status === 200) {
    }
  };

  if (isLoading)
    return (
      <div className="h-screen w-[80vw] flex items-center justify-center">
        <CircularProgress size={100} />
      </div>
    );

  return (
    <div className=" flex flex-col min-w-[80vw]  ">
      <div className="mb-6">
        {IndividualRequest?.shareCertificateNumber ? (
          <></>
        ) : (
          <div className="my-4 flex justify-end mx-10">
            <button
              className="bg-green-600 rounded-md shadow-md text-white px-4 py-2 font-bold"
              onClick={() => generateCertificate()}
            >
              Generate Certificate
            </button>
          </div>
        )}

        <FormBorder title="व्यक्तिगत विवरण">
          <div className=" grid grid-cols-3 px-3 py-6">
            <p className="font-bold capitalize">
              Name : {IndividualRequest?.name}
            </p>
            <p className="font-bold capitalize  my-2">
              Grandfather Name: {IndividualRequest?.grandFatherName}
            </p>
            <p className="font-bold capitalize my-2">
              Father Name : {IndividualRequest?.fatherName}
            </p>
            <p className="font-bold capitalize my-2">
              Mother Name : {IndividualRequest?.motherName}
            </p>
            <p className="font-bold capitalize my-2">
              Spouse Name : {IndividualRequest?.spouseName}
            </p>
            <p className="font-bold ">Email : {IndividualRequest?.email}</p>
            <div className="my-2 ">
              <h1 className="font-bold py-2">Personal Image</h1>

              <Image
                src={IndividualRequest?.personalImage!}
                alt=""
                width={200}
                height={200}
                className="max-h-68"
              />
            </div>{" "}
          </div>
        </FormBorder>
        <FormBorder title="हकवाला">
          <div className=" grid grid-cols-3 px-3 py-6">
            <p className="font-bold capitalize">
              Name : {IndividualRequest?.nominee?.name}
            </p>
            <p className="font-bold capitalize  my-2">
              Contact Number: {IndividualRequest?.nominee?.contactNumber}
            </p>
            <p className="font-bold capitalize my-2">
              Email : {IndividualRequest?.nominee?.email}
            </p>
            <p className="font-bold capitalize my-2">
              Citizenship Number : {IndividualRequest?.nominee?.citizenship}
            </p>
            <p className="font-bold capitalize my-2">
              Relation : {IndividualRequest?.nominee?.relation}
            </p>
          </div>
        </FormBorder>

        {/* <div className="grid grid-cols-2">
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
        </div> */}

        <FormBorder title="Citizenship Details">
          <div className="px-3 py-4 flex justify-between ">
            <p className="text-lg font-bold">
              Citizenship No:<span> {IndividualRequest?.citizenshipNo}</span>
            </p>
            <p className="text-lg font-bold">
              National Identity Number:<span> {IndividualRequest?.nid}</span>
            </p>

            <div>
              <h1 className="font-bold">Citizenship Image</h1>
              <Image
                src={IndividualRequest?.citizenshipFrontImage!}
                alt=""
                width={200}
                height={200}
                className="max-h-68 "
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
        <div>
          {
            IndividualRequest?.shareCertificateNumber  ?
        <div className="flex items-center justify-center mt-6 ny-4">
          <Certificatee IndividualRequest={IndividualRequest!} />
        </div>: <></>
          }
          
        </div>

        {/* <div className="my-3  flex gap-4 justify-end mx-9">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md"
            onClick={() => handleDecline()}
          >
            Decline
          </button>   
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md"
            onClick={() => handleConfirm()}
          >
            Accept
          </button>
        </div> */}
      </div>
    </div>
  );
}
