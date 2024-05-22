"use client";
import React from "react";
import TableContent from "../../Components/TableContent";
import { useQuery } from "@tanstack/react-query";
import { GetRequest } from "@/services/apiServices/request/requestServices";
import { ShareRequest } from "@/types/types";
const NewRequest = () => {
  const getRequestData = async () => {
    const { data } = await GetRequest();
    return data;
  };
  const { data: shareRequestList } = useQuery({
    queryKey: ["Share"],
    queryFn: getRequestData,
  });
  return (
    <div className="">
      {shareRequestList?.map((item: ShareRequest, index: number) => {
        return (
          <TableContent
            id={item._id}
            name={item.name}
            date={item.date}
            open={item.isOpened}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default NewRequest;
