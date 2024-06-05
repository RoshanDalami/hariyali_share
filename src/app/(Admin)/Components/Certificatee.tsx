"use client";

import React, { LegacyRef, useRef } from "react";
import Image from "next/image";
import logo from "/public/logo_circle.jpeg";
import { ShareRequest } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  GetDistrict,
  GetState,
  GetPalika,
} from "@/services/apiServices/office/officeServices";
import { useReactToPrint } from "react-to-print";
import { convertNumberToNepaliText, englishToNepali } from "@/utils/Utility";

interface District {
  districtCode: string | null;
  districtId: number;
  districtName: string;
  districtNameNep: string;
  state: string | null;
  stateId: number;
}
interface Palika {
  districtId: number;
  palikaCode: string | null;
  palikaId: number;
  palikaName: string;
  palikaNameNep: string;
  __v: number;
  _id: string;
}
const Certificatee = ({
  IndividualRequest,
}: {
  IndividualRequest: ShareRequest;
}) => {
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current!,
  });
  const getState = async () => {
    const { data } = await GetState();
    return data;
  };
  const getDistrict = async () => {
    const { data } = await GetDistrict(
      IndividualRequest?.permanentAddress?.stateId
    );
    return data;
  };

  const getPalika = async () => {
    const { data } = await GetPalika(
      IndividualRequest?.permanentAddress?.districtId
    );
    return data;
  };

  const { data: State } = useQuery({
    queryKey: ["state"],
    queryFn: getState,
  });
  const { data: District } = useQuery({
    queryKey: ["district"],
    queryFn: getDistrict,
  });
  const { data: Palika } = useQuery({
    queryKey: ["palika"],
    queryFn: getPalika,
  });
  console.log(State, District, Palika);
  const DistrictName = District?.find(
    (item: District) =>
      item.districtId === IndividualRequest?.permanentAddress?.districtId
  );
  const PalikaName = Palika?.find(
    (item: Palika) =>
      item.palikaId === IndividualRequest?.permanentAddress?.palikaId
  );

  return (
    <div className="flex gap-3">
      
      <div
        className="h-[725px] w-[920px] border-4 border-green-500 mt-4 p-2"
        ref={componentRef}
      >
        <div className="border-4 h-[700px] border-[#DDA73D] p-1.5">
          <div className="  h-[600px] w-[900px]  ">
            <div className=" flex  w-full h-[100px] ml-2  ">
              <Image width={100} height={40} src={logo} alt="certi" />
              <h1 className="text-5xl uppercase text-[#049353] text-bold ml-28 mt-4 ">
                hariyali abhiyan
              </h1>
            </div>
            <div className="flex  flex-col justify-center items-center   ">
              <p className="flex text-sm font-semibold">
                रजिष्टर्ड कार्यालय: कामनाडौं
              </p>
              <p className=" flex text-sm font-semibold">
                (शेयरमा सीमित दायित्व भएको)
              </p>
              <p className="flex  text-lg text-[#049353] font-bold ">
                (सस्थापक समूह)
              </p>
            </div>

            <div className="grid grid-cols-3 items-center mt-2  h-[200px] mr-4">
              <h1></h1>
              <h1 className=" flex text-4xl text-[#EB1924] font-semibold">
                शेयर प्रमाण-पत्र
              </h1>
              <div className="flex justify-end mr-2  font-semibold">
                <div className="space-y-4 mb-5">
                  <p>
                    शेयर प्रमाणपत्र नं.:{" "}
                    <span className="border-b-2 border-dotted border-black  px-6">
                      {IndividualRequest?.shareCertificateNumber?.split("-")[0]}
                      {"-"}
                      {englishToNepali(
                        IndividualRequest?.shareCertificateNumber?.split("-")[1]
                      )}
                    </span>
                  </p>

                  <p>
                    शेयर कित्ता संख्या:
                    <span className="border-b-2 border-dotted border-black  px-6">
                      {englishToNepali(IndividualRequest?.shareQuantity)}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" flex flex-col gap-8 col-span-3 h-[300px] w-full p-4  text-sm  font-semibold mt-8">
                <p
                  className="h-[28px] w-full leading-10 mr-2"
                  style={{
                    wordSpacing: "4px",
                    // letterSpacing: "2px",
                    textAlign: "justify",
                  }}
                >
                  {" "}
                  श्री
                  <span className="border-b-2 border-dotted border-black  px-6 w-full">
                    {IndividualRequest?.grandFatherName}
                  </span>
                  को नाति/नातिनी श्री{" "}
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {IndividualRequest?.fatherName}
                  </span>
                  को छोरा/छोरी श्री
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {IndividualRequest?.spouseName}
                  </span>
                  को पति / पत्नी
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {DistrictName?.districtNameNep}
                  </span>
                  जिल्ला{" "}
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {PalikaName?.palikaNameNep}
                  </span>
                  वडा नं.
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {IndividualRequest?.permanentAddress?.ward}
                  </span>{" "}
                  बस्ने श्रीमान/श्रीमती
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {IndividualRequest?.name}
                  </span>
                  ले यस यस कम्पनीको रु. १००।- दरको शेयर नं.
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {" "}
                    {IndividualRequest?.shareNumberStart == 0
                      ? englishToNepali(1)
                      : englishToNepali(IndividualRequest?.shareNumberStart)}
                  </span>
                  देखी{" "}
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {englishToNepali(IndividualRequest?.shareNumberEnd)}
                  </span>
                  सम्मा को जम्मा{" "}
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {englishToNepali(IndividualRequest?.shareQuantity)}.
                  </span>
                  कित्ता शेयर बाफत रु
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {englishToNepali(IndividualRequest?.totalShareAmount)}
                  </span>{" "}
                  
                  (शब्द मा :-{" "}
                  <span className="border-b-2 border-dotted border-black  px-6">
                    {convertNumberToNepaliText(
                      IndividualRequest?.totalShareAmount.toString()
                    )}
                  </span>{" "}
                  )बुझाइ हो संस्थाको खरिद कम्पनीको छाप लागेको यो प्रमाण पत्र
                  प्रदान गरिएको छ। कम्पनीको छाप लागेको यो प्रमाण पत्र प्रदान
                  गरिएको छ।
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 mb-4 text-sm font-semibold">
            <div className="col-span-1 ml-12">
              {" "}
              <p>कम्पनीको छाप</p>
              <p>
                मिति: {englishToNepali(IndividualRequest?.shareApprovedDate)}
              </p>
            </div>
            <div className="col-span-1 grid place-items-center">
              {" "}
              <p className="w-full">
                <span className="border-b-2 border-dotted border-black  px-6 w-full text-center block "></span>
              </p>
              <p className="whitespace-nowrap ">
                कम्पनी सचिव /प्रमुख कार्यकारी अधिकृत / सञ्चालक
              </p>
            </div>
            <div className="col-span-1 ml-12 grid place-items-center  mb-2">
              <p className="w-full">
                <span className="border-b-2 border-dotted border-black px-6 w-full text-center block"></span>
              </p>
              <p className="">अध्यक्ष</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end  mt-4">
        <button
          className="bg-indigo-600 px-4 h-10 py-2 shadow-md rounded-md text-white "
          onClick={() => handlePrint()}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default Certificatee;
