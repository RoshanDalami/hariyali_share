"use client";
import React, { useState,useEffect } from "react";
import FormBorder from "@/app/(public)/Components/FormBorder";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import { useRouter } from "next/navigation";
import { CreateFiscal } from "@/services/apiServices/office/officeServices";
import { FiscalYear } from "@/types/types";
export default function CreateFiscalComp({clickedDataId}:{clickedDataId?:FiscalYear}) {
  const aa = new BikramSambat(new Date()).toBS();
  const [startDate, setStartDate] = useState(aa);
  const [endDate, setEndDate] = useState(aa);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter()
  const onSubmit = async (data: FieldValues) => {
    data  = {
      ...data,
      startDate: startDate,
      endDate: endDate,
    };
   const response = await CreateFiscal(data);
   if(response?.status === 200){
    router.push('/admin/fiscalyear')
   }
  };
  useEffect(()=>{
    if(clickedDataId){
      setValue('_id',clickedDataId?._id)
      setValue('fiscalYear',clickedDataId?.fiscalYear);
      setValue('startYear',clickedDataId?.startYear)
      setValue('endYear',clickedDataId?.endYear)
      setStartDate(clickedDataId?.startDate);
      setEndDate(clickedDataId?.endDate);
      setValue('status',clickedDataId?.status)

    }
  },[clickedDataId,setValue])
  return (
    <div>
      <FormBorder title="Create Fiscal Year">
        <form
          className="w-[75vw] px-4 py-3 "
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col">
              <label className="labelText">
                Fiscal Year <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register("fiscalYear")}
                className="inputStyle"
                placeholder="Fiscal Year "
              />
            </div>
            <div className="flex flex-col">
              <label className="labelText">
                Start Year <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register("startYear")}
                className="inputStyle"
                placeholder="Start Year"
              />
            </div>
            <div className="flex flex-col">
              <label className="labelText">
                End Year <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register("endYear")}
                className="inputStyle"
                placeholder="End Year"
              />
            </div>
            <div className="flex flex-col">
              <label className="labelText">
                Start Date<span className="text-red-600">*</span>
              </label>
              <NepaliDatePicker
                inputClassName="inputStyle w-full"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className=""
              />
            </div>
            <div className="flex flex-col">
              <label className="labelText">
                End Date<span className="text-red-600">*</span>
              </label>
              <NepaliDatePicker
                inputClassName="inputStyle w-full"
                value={endDate}
                onChange={(e) => setEndDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className=""
              />
            </div>
            <div className="flex items-center mt-4 gap-3">
              <label className="labelText">Status</label>
              <input type="checkbox" className="h-6 w-6" {...register('status')} />
            </div>
          </div>
          <div className="my-4">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed  "
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </FormBorder>
    </div>
  );
}
