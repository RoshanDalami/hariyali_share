"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetFiscal } from "@/services/apiServices/office/officeServices";
import { FiscalYear } from "@/types/types";
import Switch from "@mui/material/Switch";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
const label = { inputProps: { "aria-label": "Switch demo" } };
import TableBorder from "@/app/(public)/Components/TableBorder";
import addFiscal from '../../../../../public/addFiscal.svg'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Error from "../../Components/Error";
export default function FiscalIndex() {
  const getFiscal = async () => {
    const { data } = await GetFiscal();
    return data;
  };
  const {
    data: FiscalYearList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Fiscal"],
    queryFn: getFiscal,
  });

  if(FiscalYearList?.length < 1){
    return (
      <div className="flex h-screen w-[80vw] border items-center -mt-20 justify-center">
        <div  className="flex flex-col items-center">

        <Image src={addFiscal} alt="" width={400} height={400}/>
        <Link href={'/admin/fiscalyear/createfiscal'} >
        <button className="bg-green-600 text-white px-10 py-3 rounded-md shadow-md">Create Fiscal Year</button>
        </Link>
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <div className="h-screen w-[80vw] flex items-center justify-center">
        <CircularProgress size={100} />
      </div>
    );

    if(isError) {
      return (
       <Error/>
      )
    }

  return (
    <TableBorder
      title1="Fiscal Year List"
      url={`/admin/fiscalyear/createfiscal`}
    >
      <div className="w-[75vw] px-4 py-6 " suppressHydrationWarning>
        <table className="w-full  ">
          <tr>
            <th className="border border-white px-4 text-white py-3 bg-green-500">
              S No.
            </th>
            <th className="border border-white px-4 text-white py-3 bg-green-500">
              Fiscal Year
            </th>
            <th className="border border-white px-4 text-white py-3 bg-green-500">
              Status
            </th>
            <th className="border border-white px-4 text-white py-3 bg-green-500">
              Update Status
            </th>
            <th className="border border-white px-4 text-white py-3 bg-green-500">
              Action
            </th>
          </tr>

          {FiscalYearList?.map((item: FiscalYear, index: number) => {
            return (
              <tr key={index}>
                <td className="px-3 py-2 border border-black">{index + 1}</td>
                <td className="px-3 py-2 border border-black">{item.fiscalYear}</td>
                <>
                  {item.status ? (
                    <td className="text-green-600 font-bold px-3 py-2 border border-black">Active</td>
                  ) : (
                    <td className="text-red-600 font-bold px-3 py-2 border border-black">Deactive</td>
                  )}
                </>
                <td className="px-3 py-2 border border-black">
                  <Switch {...label} checked={item?.status } />
                </td>
                <td className="px-3 py-2 border border-black flex items-center">
                  <div className="bg-green-600 px-3 py-2 text-white rounded-md">

                  <PencilSquareIcon className="h-6 w-6 " />
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </TableBorder>
  );
}
