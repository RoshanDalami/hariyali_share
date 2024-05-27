import React from "react";
import Image from "next/image";
import logo from "/public/logo_circle.jpeg";
import { ShareRequest } from "@/types/types";

const Certificatee = ({IndividualRequest}:{IndividualRequest:ShareRequest}) => {
  return (
    <div className="h-[700px] w-[910px] border-2 border-green-500 mt-4 ml-36">
      <div className="  h-[650px] w-[900px]  ">
        <div className=" flex  w-full h-[100px] ml-2  ">
          <Image width={100} height={40} src={logo} alt="certi" />
          <h1 className="text-5xl uppercase text-[#049353] text-bold ml-24 mt-4 ">
            hariyali abhiyan
          </h1>
        </div>
        <div className="flex  flex-col justify-center items-center   ">
          <p className="flex text-sm font-semibold">रजिष्टर्ड कार्यालय: कामनाडौं</p>
          <p className=" flex text-sm font-semibold">(शेयरमा सीमित दायित्व भएको)</p>
          <p className="flex  text-lg text-[#049353] font-bold ">(सस्थापक समूह)</p>
        </div>

        <div className="grid grid-cols-3 items-center mt-2  h-[200px]">
          <h1></h1>
          <h1 className=" flex text-4xl text-[#EB1924] font-semibold">
            शेयर प्रमाण-पत्र
          </h1>
          <div className="flex justify-end mr-2  font-semibold">
            <div className="space-y-4">

              <p>शेयर प्रमाणपत्र नं.: .............................</p>
              {/* <p>शेयरधनी नं.: .......................................</p> */}
              <p>शेयर कित्ता संख्या: .............................</p>

            </div>
          </div>
          <div className=" flex flex-col gap-6 col-span-3 h-[300px] w-full p-4  text-sm mx-10 font-semibold">
            <p>
              {" "}
              श्री
              ........{IndividualRequest?.grandFatherName}.....................................................को
              नाति/नातिनी श्री
              ..............{IndividualRequest?.fatherName}..........................................
            </p>
            <p>
              को छोरा/छोरी श्री
              .............................................................................
              को पटनी,
              ...........................................................................जिल्ला
            </p>
            <p>
              ................................................................महा/उप/नगर/गाउँपालिका
              वडा नं. ........................बस्ने श्रीमान/श्रीमती
              {/* ................................... महा/उप/नगर/गाउँपालिक वडा नं. */}
              ......................................{" "}
            </p>
            <p>
              ले यस यस कम्पनीको रु. १००।- दरको शेयर नं.
              ........................................................................................................................................
            </p>
            <p>
              {" "}
              देखी ............................ सम्मा को जम्मा
              ................................... कित्ता शेयर बाफत रु.
              ...................................{" "}
            </p>
            <p>
              (शब्द मा ................................... मात्र)बुझाइ हो
              संस्थाको खरिद
            </p>
            <p>
              कम्पनीको छाप लागेको यो प्रमाण पत्र प्रदान गरिएको छ। कम्पनीको छाप
              लागेको यो प्रमाण पत्र प्रदान गरिएको छ।
            </p>
          </div>
          {/* <div className="grid grid-rows-4 grid-flow-col gap-4 font-bold  text-sm">
            <div className=" ">
              <p>कम्पनीको छाप</p>
              <p>मिति:२०८०।१९।२५</p>
            </div>
            <div>
              <p>....................................................</p>
              <p>कम्पनीको सचित/प्रमुख कार्यलय अधिकृत सन्चलख</p>
            </div>
            <div className="">
              <p>...................................</p>
              <p>अध्याक्ष</p>
            </div>
          </div> */}

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
  );
};

export default Certificatee;
