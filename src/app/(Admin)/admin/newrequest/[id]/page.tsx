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
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
export default function IndividualRequest() {
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const getRequestById = async (id: string) => {
    const { data }: { data: ShareRequest } = await GetRequestById(id);
    return data;
  };
  const [remarks, setRemarks] = useState("");
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
      shareApprovedDate: aa,
    };
    setLoading(true);
    const response = await AcceptRequest(data);

    if (response?.status === 200) {
      setLoading(false);
      router.push("/admin/approved");
    }
  };
  const handleDecline = async () => {
    const data = {
      id: id,
      remarks: remarks,
    };
    setDeclineLoading(true);
    const response = await DeclineRequest(data);
    if (response?.status === 200) {
      setDeclineLoading(false);
      router.push("/admin/declined");
    }
  };

  return (
    <>
      {modelOpen && (
        <Model>
          <div className="bg-white px-3 py-5 rounded-md">
            <div>
              <label htmlFor="" className="labelText text-red-600">
                अस्वीकृत हुनुको कारण
              </label>
              <input
                type="text"
                className="inputStyle w-full"
                onChange={(e) => setRemarks(e.target.value)}
              />
              <div className="my-3 flex justify-end gap-3 items-center">
                <button
                  className="bg-gray-400 text-white px-6 py-2 rounded-md shadow-md font-bold"
                  onClick={() => setModelOpen(false)}>
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onClick={() => handleDecline()}>
                  {declineLoading ? " Declining ..." : "Decline"}
                </button>
              </div>
            </div>
          </div>
        </Model>
      )}
      <div className=" flex flex-col min-w-[80vw]  ">
        <div className="mb-6">
          <FormBorder title="Personal Details">
            <div className=" grid grid-cols-3 px-3 py-6">
              <p className="font-bold capitalize">
                नाम: {IndividualRequest?.name}
              </p>
              <p className="font-bold capitalize">
                हजुरबुवाको नाम : {IndividualRequest?.grandFatherName}
              </p>
              <p className="font-bold capitalize">
                बुवाको नाम : {IndividualRequest?.fatherName}
              </p>
              <p className="font-bold capitalize">
                आमाको नाम : {IndividualRequest?.motherName}
              </p>
              <p className="font-bold capitalize">
                पति / पत्नीको नाम: {IndividualRequest?.spouseName}
              </p>
              <p className="font-bold ">Email : {IndividualRequest?.email}</p>
            </div>
          </FormBorder>

          <div className="grid grid-cols-2">
            <FormBorder title="Pernament Address">
              <div className="px-3 py-5">
                <h1 className="font-bold capitalize">
                  प्रदेश : {IndividualRequest?.pernamentStateName}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  जिल्ला : {IndividualRequest?.pernamentDistrictName}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  पालिका : {IndividualRequest?.pernamentPalikaName}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  वार्ड नं : {IndividualRequest?.permanentAddress?.ward}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  टोल : {IndividualRequest?.permanentAddress?.tole}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  घर नं : {IndividualRequest?.permanentAddress?.houseNo}{" "}
                </h1>
              </div>
            </FormBorder>
            <FormBorder title="Temp Address">
              <div className="px-3 py-5">
                <h1 className="font-bold capitalize">
                  प्रदेश : {IndividualRequest?.tempStateName}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  जिल्ला : {IndividualRequest?.tempDistrictName}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  पालिका : {IndividualRequest?.tempPalikaName}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  वार्ड नं : {IndividualRequest?.temporaryAddress?.ward}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  टोल : {IndividualRequest?.temporaryAddress?.tole}{" "}
                </h1>
                <h1 className="font-bold capitalize">
                  घर नं: {IndividualRequest?.temporaryAddress?.houseNo}{" "}
                </h1>
              </div>
            </FormBorder>
          </div>

          <FormBorder title="Citizenship Details">
            <div className="px-3 py-4 flex justify-between ">
              <p className="text-lg font-bold">
                नागरिताको नम्बर :
                <span> {IndividualRequest?.citizenshipNo}</span>
              </p>
              <p className="text-lg font-bold">
                राष्ट्रिय परिचय पत्र नम्बर :
                <span> {IndividualRequest?.nid}</span>
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
                शेयरको कित्ता : {IndividualRequest?.shareQuantity}
              </p>
              <p className="font-bold">
                प्रति कित्ता शेयर:{IndividualRequest?.shareRate}
              </p>
              <p className="font-bold">
                शेयर कुल रकम:{IndividualRequest?.totalShareAmount}
              </p>
              <p className="font-bold">
                {" "}
                शेयर आबेदन दिएको मिति : {IndividualRequest?.date}
              </p>
            </div>
          </FormBorder>
          <div className="my-3  flex gap-4 justify-end mx-9">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => setModelOpen(true)}
              disabled={declineLoading}>
              {declineLoading ? " Declining ..." : "Decline"}
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => handleConfirm()}
              disabled={loading}>
              {loading ? "Accepting..." : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
