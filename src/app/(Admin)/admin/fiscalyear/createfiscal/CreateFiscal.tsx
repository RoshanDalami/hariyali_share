"use client";
import React, { useState } from "react";
import FormBorder from "@/app/(public)/Components/FormBorder";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
export default function CreateFiscal() {
  const aa = new BikramSambat(new Date()).toBS();
  const [startDate, setStartDate] = useState(aa);
  const [endDate, setEndDate] = useState(aa);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async()=>{

  }
  return (
    <div>
      <FormBorder title="Create Fiscal Year">
        <form className="w-[75vw] px-4 py-3 " onSubmit={handleSubmit(onSubmit)} >
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
                inputClassName="form-control  focus:outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex flex-col">
              <label className="labelText">
                End Date<span className="text-red-600">*</span>
              </label>
              <NepaliDatePicker
                inputClassName="form-control  focus:outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
          </div>
          <div className="my-4">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed  "
              disabled={isSubmitting} type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </FormBorder>
    </div>
  );
}
