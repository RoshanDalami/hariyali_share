"use client";
import React, { FormEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormBorder from "../Components/FormBorder";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationResolver } from "@/Zod/resolver";
export default function CreateApplicaton() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    watch
  } = useForm({
    // resolver: zodResolver(applicationResolver),
    defaultValues: {
      name: "",
      grandFatherName: "",
      children: [{ childrenName: "" }],

      fatherName: "",
      motherName: "",
      spouseName: "",
      citizenshipNo: "",
      citizenshipFrontImage: "",
      citizenshipBackImage: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      email: "",
      contactNumber: "",
      shareRate: 100,
      shareQuantity: 0,
      totalShareAmount: 0,
      checked:false,
      permanentAddress:{
        stateId:0,
        districtId:0,
        palikaId:0,
        ward:'',
        tole:'',
        houseNo:''
      },
      temporaryAddress:{
        stateId:0,
        districtId:0,
        palikaId:0,
        ward:'',
        tole:'',
        houseNo:''
      }
    },
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "children",
  });
  const appendHandler = (e: FormEvent) => {
    e.preventDefault();
    append({ childrenName: "" });
  };

  const [imagePreviewFront, setImagePreviewFront] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImagePreviewFront(URL.createObjectURL(file));
  };
  const [imagePreviewBack, setImagePreviewBack] = useState("");
  const handleFileChangeBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImagePreviewBack(URL.createObjectURL(file));
  };
  const totalAmount = watch('shareQuantity') * watch('shareRate')
  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(typeof data.citizenshipFrontImage[0]);
  };

  
  return (
    <>
      <FormBorder title="Share Application">
        <form
          action=""
          className=""
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="grid md:grid-cols-2  ">
            <FormBorder title="Personal Information">
              <div className="flex justify-end mx-4">
                <button
                  className="bg-green-500 rounded-md text-white p-1 font-bold"
                  onClick={(e) => appendHandler(e)}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3 px-3 py-3">
                <div className="flex flex-col">
                  <label className="labelText">
                    नाम <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("name", { required: "Name is required" })}
                    placeholder="नाम"
                  />
                  {errors?.name && (
                    <p className="text-red-600">{errors?.name?.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="labelText">
                    इमेल <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    className="inputStyle"
                    {...register("email", { required: "Email is required" })}
                    placeholder="इमेल"
                  />
                  {errors?.email && (
                    <p className="text-red-600">{errors?.email?.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="labelText">
                    फोन नम्बर <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    className="inputStyle"
                    {...register("contactNumber", {
                      required: "Phone number is required",
                    })}
                    placeholder="फोन नम्बर"
                  />
                  {errors?.contactNumber && (
                    <p className="text-red-600">
                      {errors?.contactNumber?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="labelText">
                    हजुरबुबाको नाम <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("grandFatherName", {
                      required: "GrandFather Name is required",
                    })}
                    placeholder="हजुरबुबाको नाम"
                  />
                  {errors?.grandFatherName && (
                    <p className="text-red-600">
                      {errors?.grandFatherName?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="labelText">
                    बुबाको नाम <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("fatherName", {
                      required: "Father's name is required",
                    })}
                    placeholder="बुबाको नाम"
                  />
                  {errors?.fatherName && (
                    <p className="text-red-600">
                      {errors?.fatherName?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="labelText">
                    आमाको नाम <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("motherName", {
                      required: "Mother's name is required",
                    })}
                    placeholder="आमाको नाम"
                  />
                  {errors?.motherName && (
                    <p className="text-red-600">
                      {errors?.motherName?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="labelText">दम्पतिको नाम</label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("spouseName")}
                    placeholder="दम्पतिको नाम"
                  />
                </div>

                <div>
                  {fields?.map((field, index) => {
                    return (
                      <div
                        key={field.id}
                        className="flex items-center gap-3 justify-center"
                      >
                        <div className="flex flex-col">
                          <label className="labelText">बालबालिकाको नाम</label>
                          <input
                            type="text"
                            className="inputStyle"
                            {...register(`children.${index}.childrenName`)}
                            placeholder="बालबालिकाको नाम"
                          />
                        </div>
                        {fields?.length > 1 && (
                          <button
                            className="bg-red-600 rounded-md text-white font-bold p-1 mt-8"
                            onClick={() => remove(index)}
                          >
                            <PlusIcon className="h-6 w-6 rotate-45" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FormBorder>
            <FormBorder title="Citizenship Details">
              <div className="px-3 py-3 flex flex-col gap-3">
                {/* <div className="flex flex-col">
                  <label htmlFor="" className="labelText">
                    नागरिकता नं. <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    className="inputStyle"
                    {...register("citizenshipNo")}
                    placeholder="नागरिकता नं."
                  />
                </div> */}
                <div className="flex flex-col">
                  <label className="labelText">
                    नागरिकता नं. <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="Number"
                    className="inputStyle"
                    {...register("citizenshipNo", {
                      required: "Citizenship number is required",
                    })}
                    placeholder="नागरिकता नं."
                  />
                  {errors?.citizenshipNo && (
                    <p className="text-red-600">
                      {errors?.citizenshipNo?.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      नागरिकता अगाडि फोटो{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className="inputStyle"
                      {...register("citizenshipFrontImage", {
                        required: "Front image is required",
                      })}
                      placeholder="नागरिकता फ़्रोन्त फोटो"
                      onChange={(e) => handleFileChange(e)}
                    />
                    {errors?.citizenshipFrontImage && (
                      <p className="text-red-600">
                        {errors?.citizenshipFrontImage?.message}
                      </p>
                    )}
                    {imagePreviewFront ? (
                      <Image
                        alt=""
                        src={imagePreviewFront}
                        width={100}
                        height={100}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="labelText">
                    नागरिकता पछाडि फोटो <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    className="inputStyle"
                    {...register("citizenshipBackImage", {
                      required: "Back image is required",
                    })}
                    placeholder="नागरिकता पछाडि फोटो"
                    onChange={(e) => handleFileChangeBack(e)}
                  />
                  {errors?.citizenshipBackImage && (
                    <p className="text-red-600">
                      {errors?.citizenshipBackImage?.message}
                    </p>
                  )}
                  {imagePreviewBack ? (
                    <Image
                      alt=""
                      src={imagePreviewBack}
                      width={100}
                      height={100}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </FormBorder>
          </div>
          <div>
            <FormBorder title="Address Details">
              <div className="grid grid-cols-2">
                <FormBorder title="Permanent Address">
                  <div className="grid grid-cols-2 gap-3 px-3 py-2">
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        परदेश <span className="text-red-600">*</span>
                      </label>
                      <select name="" id="" className="inputStyle">
                        <option value="">-- Select State --</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        जिल्ला <span className="text-red-600">*</span>
                      </label>
                      <select name="" id="" className="inputStyle">
                        <option value="">-- Select State --</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        पालिका <span className="text-red-600">*</span>
                      </label>
                      <select name="" id="" className="inputStyle">
                        <option value="">-- Select State --</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        वार्ड नं <span className="text-red-600">*</span>
                      </label>
                      <input type="text" className="inputStyle" placeholder="वार्ड नं"/>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">टोल </label>
                      <input type="text" className="inputStyle" placeholder="टोल " />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">घर नं</label>
                      <input type="text" className="inputStyle" placeholder="घर नं" />
                    </div>
                    <div className="flex gap-3 items-center">
                    <label htmlFor="" className="labelText">एउटै ठेगाना ..?</label>
                    <input type="checkbox" className="h-6 w-6" {...register('checked')} checked={watch('checked')}  />
                    </div>
                  </div>
                </FormBorder>
                <FormBorder title="Temporary Address">
                  <div className="grid grid-cols-2 gap-3 px-3 py-2">
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        परदेश <span className="text-red-600">*</span>
                      </label>
                      <select name="" id="" className="inputStyle">
                        <option value="">-- Select State --</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        जिल्ला <span className="text-red-600">*</span>
                      </label>
                      <select name="" id="" className="inputStyle">
                        <option value="">-- Select State --</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        पालिका <span className="text-red-600">*</span>
                      </label>
                      <select name="" id="" className="inputStyle">
                        <option value="">-- Select State --</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">
                        वार्ड नं <span className="text-red-600">*</span>
                      </label>
                     <input type="text" className="inputStyle" placeholder="वार्ड नं" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">टोल </label>
                      <input type="text" className="inputStyle" placeholder="टोल " />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="labelText">घर नं</label>
                      <input type="text" className="inputStyle" placeholder="घर नं" />
                    </div>
                  </div>
                </FormBorder>
                
              </div>
            </FormBorder>
          </div>

          <FormBorder title="Share Details">
            <div className="px-4 py-2 grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <label htmlFor="" className="labelText">
                शेयर मात्रा <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  className="inputStyle"
                  {...register("shareQuantity", {
                    required: "Bank name is required",
                  })}
                  placeholder=" बैंक नाम"
                />
                {errors?.bankName && (
                  <p className="text-red-600">{errors?.bankName?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="labelText">
                शेयर दर <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  className="inputStyle"
                  {...register("shareRate", {
                    required: "Account Holder's name is required",
                  })}
                  value={100}
                  readOnly
                  placeholder=""
                />
                {errors?.accountHolderName && (
                  <p className="text-red-600">
                    {errors?.accountHolderName?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="labelText">
                शेयर कुल रकम <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  className="inputStyle"
                  {...register("totalShareAmount", {
                    required: "Account number is required",
                  })}
                  value={totalAmount}
                  placeholder="शेयर कुल रकम"
                />
                {errors?.accountNumber && (
                  <p className="text-red-600">
                    {errors?.accountNumber?.message}
                  </p>
                )}
              </div>
            </div>
          </FormBorder>
          <div className="flex justify-end mr-10">
            <button
              className="bg-green-600 rounded-md shadow-md text-white px-4 py-2 my-2 disabled:bg-gray-300 disabled:cursor-not-allowed "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting ..." : "Apply"}
            </button>
          </div>
        </form>
      </FormBorder>
    </>
  );
}
