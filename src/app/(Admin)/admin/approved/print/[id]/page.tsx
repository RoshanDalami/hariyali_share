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
import CertificateImage from "../../../../../../../public/certificate.jpeg";
import FormBorder from "@/app/(public)/Components/FormBorder";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

export default function IndividualRequest() {
  const { id }: { id: string } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
  });
  const router = useRouter();
  const getRequestById = async (id: string) => {
    const { data }: { data: ShareRequest } = await GetRequestById(id);
    return data;
  };
  const {
    data: IndividualRequest,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Individual request", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });

  const generateCertificate = async () => {
    const response = await GenerateCertificate(id);
    if (response?.status === 200) {
      refetch();
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
      <div className="flex items-center justify-center">
        <Certificatee IndividualRequest={IndividualRequest!} />
      </div>
      {/* <div className="relative">
        <Image src={CertificateImage} alt="" height={900} width={900} className="h-[600px] w-[800px]" />
            <span className=" absolute top-[250px] left-[100px]">roshan dalami</span>
        </div> */}
    </div>
  );
}
