"use client";

import React,{LegacyRef, useRef} from "react";
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
import {convertNumberToNepaliText , englishToNepali } from '@/utils/Utility'

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
  const componentRef:any = useRef();
const handlePrint = useReactToPrint({
  content:() => componentRef?.current!,
})
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
    (item:District) =>
      item.districtId === IndividualRequest?.permanentAddress?.districtId
  );
  const PalikaName = Palika?.find(
    (item:Palika) => item.palikaId === IndividualRequest?.permanentAddress?.palikaId
  );

  return (
    <div>
    <div className="h-[700px] w-[910px] border-[6px] border-green-500" ref={componentRef}>
      <div className="  h-[690px] w-[900px]  border-[3px] border-yellow-500  ">
        <div className=" flex  w-full h-[100px] ml-2  ">
          <Image width={100} height={40} src={logo} alt="certi" />
          <h1 className="text-5xl uppercase text-[#049353] text-bold ml-24 mt-4 ">
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

        <div className="grid grid-cols-3 items-center mt-2  h-[200px]">
          <h1></h1>
          <h1 className=" flex text-4xl text-[#EB1924] font-semibold">
            शेयर प्रमाण-पत्र
          </h1>
          <div className="flex justify-end mr-2  font-semibold">
            <div className="space-y-4">
              <p>
                शेयर प्रमाणपत्र नं.:  {" "}
                {IndividualRequest?.shareCertificateNumber?.split('-')[0]}{"-"}{englishToNepali(IndividualRequest?.shareCertificateNumber?.split('-')[1])} .........
              </p>
              {/* <p>शेयरधनी नं.: .......................................</p> */}
              <p>
                शेयर कित्ता संख्या: .........{englishToNepali(IndividualRequest?.shareQuantity)}
                ............
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-6 col-span-3 mt-5  w-[900px] h-[300px] px-4 items-center text-sm  font-semibold">
            <p>
              {" "}
              श्री ........
              <span className="  border-b-2  border-black border-dotted" >{IndividualRequest?.grandFatherName}</span>
              .....................................................को
              नाति/नातिनी श्री ..............{IndividualRequest?.fatherName}
              ..........................................
            </p>
            <p>
              को छोरा/छोरी श्री ...............{IndividualRequest?.spouseName}
              .................................... को पति /पत्नी ,
              ..................
              {DistrictName?.districtNameNep}
              ...................................जिल्ला
            </p>
            <p>
              ..................{PalikaName?.palikaNameNep}
              ...................... वडा नं. ........
              {IndividualRequest?.permanentAddress?.ward}.....बस्ने श्री
              .............{IndividualRequest?.name}............{" "}
            </p>
            <p>
              ले यस यस कम्पनीको रु. १००।- दरको शेयर नं. .....................
              {IndividualRequest?.shareNumberStart == 0
                ? englishToNepali(1)
                : englishToNepali(IndividualRequest?.shareNumberStart)}
              ......................
            </p>
            <p>
              {" "}
              देखी .....{englishToNepali(IndividualRequest?.shareNumberEnd)}.... सम्मा को जम्मा
              ....{englishToNepali(IndividualRequest?.shareQuantity)}..... कित्ता शेयर बाफत रु.
              .....{englishToNepali(IndividualRequest?.totalShareAmount)}.....{" "}
            </p>
            <p>
              (शब्द मा :- { convertNumberToNepaliText(IndividualRequest?.totalShareAmount.toString()) }){" "}बुझाइ हो
              संस्थाको खरिद
            </p>
            <p>
              कम्पनीको छाप लागेको यो प्रमाण पत्र प्रदान गरिएको छ। कम्पनीको छाप
              लागेको यो प्रमाण पत्र प्रदान गरिएको छ।
            </p>
          </div>
          <div className="flex  w-[880px]  justify-around mt-12 mx-6 ">
            <div className="   w-full  mt-2 ml-2 ">
              <p>कम्पनीको छाप</p>
              <p>मिति:२०८०।१९।२५</p>
            </div>
            <div className=" flex flex-col w-full  justify-center ">
              <p>....................................................</p>
              <p>कम्पनीको सचित/प्रमुख कार्यलय अधिकृत सन्चलख</p>
            </div>
            <div className=" flex flex-col w-full justify-end">
              <p>...................................</p>
              <p>अध्याक्ष</p>
            </div>
          </div>
          {/* <div className="grid grid-cols-3  w-full">
            <div className="bg-red-500">
              <p>कम्पनीको छाप</p>
              <p>मिति:२०८०।१९।२५</p>
            </div>
            <div>
              <p>....................................................</p>
              <p>कम्पनीको सचित/प्रमुख कार्यलय अधिकृत सन्चलख</p>
            </div>
            <div>
              <p>...................................</p>
              <p>अध्याक्ष</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    <div className="flex justify-end  mt-4">
            <button className="bg-indigo-600 px-4 py-2 shadow-md rounded-md text-white " onClick={()=>handlePrint()} >Print</button>
          </div>
    </div>
  );
};

export default Certificatee;
