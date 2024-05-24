import React from "react";
import {UpdateOpenStatus} from '@/services/apiServices/request/requestServices';
import { useRouter } from "next/navigation";
export default function TableContent({
  name,
  date,
  open,
  id,
  sufix,
  link
}: {
  name: string;
  date: string;
  open: Boolean;
  id:string;
  sufix:string;
  link:string
}) {
    const router = useRouter();
    const handleRotuer = async()=>{
        await UpdateOpenStatus(id);
        router.push(`${link}/${id}`)
    }
  return (
    <div
      className={` ${
        open ? "bg-gray-200/60" : "font-bold bg-white "
      } flex items-center justify-between min-w-[80vw]  h-[52px] border-b-2 border-b-gray-100  text-center  hover:shadow-xl hover:pointer hover:bg-[#F2F6FC] hover:text-black hover:font-semibold p-2 cursor-pointer relative`}

     onClick={()=>handleRotuer()}
    >
      <div className="ml-4  text-[14px] "> {sufix}{" "}{" "} 
      <span className=" uppercase ">

      {name}
      </span>
      
      </div>
      <div className="text-[12px] mr-10">{date}</div>
      {!open ? (
        <div className="absolute h-2 w-2 bg-blue-600 rounded-full right-6 "></div>
      ) : (
        <></>
      )}
    </div>
  );
}
