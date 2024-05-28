"use client";
import React, { FormEvent, use, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormBorder from "../../Components/FormBorder";
import { PlusIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  GetDistrict,
  GetPalika,
  GetState,
} from "@/services/apiServices/office/officeServices";
import { useQuery } from "@tanstack/react-query";
import { CreateRequest } from "@/services/apiServices/request/requestServices";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useRouter } from "next/navigation";
import Modal from "../../Components/Modal";
import modelImage from "../../../../../public/st.jpg";
export default function CreateApplicaton() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    watch,
  } = useForm({
    // resolver: zodResolver(applicationResolver),
    defaultValues: {
      name: "",
      personalImage:'',
      grandFatherName: "",
      fatherName: "",
      motherName: "",
      spouseName: "",
      citizenshipNo: "",
      citizenshipFrontImage: "",
      citizenshipBackImage: "",
      email: "",
      contactNumber: "",
      shareRate: 100,
      shareQuantity: 0,
      totalShareAmount: 0,
      checked: false,
      permanentAddress: {
        stateId: 0,
        districtId: 0,
        palikaId: 0,
        ward: "",
        tole: "",
        houseNo: "",
      },
      temporaryAddress: {
        stateId: 0,
        districtId: 0,
        palikaId: 0,
        ward: "",
        tole: "",
        houseNo: "",
      },
      password: "",
      voucherImage: "",
      nominee: {
        name: "",
        contactNumber: "",
        email: "",
        relation: "",
        citizenship: "",
        permanentAddress: {
          stateId: 0,
          districtId: 0,
          palikaId: 0,
          ward: "",
          tole: "",
          houseNo: "",
        },
        temporaryAddress: {
          stateId: 0,
          districtId: 0,
          palikaId: 0,
          ward: "",
          tole: "",
          houseNo: "",
        },
      },
      nid: "",
    },
  });

  const getState = async () => {
    const { data } = await GetState();
    return data;
  };
  const pernamentstateId = watch("permanentAddress.stateId");
  const pernamentDistrictId = watch("permanentAddress.districtId");
  const tempStateId = watch("temporaryAddress.stateId");
  const tempDistrictId = watch("temporaryAddress.districtId");

  const NomineePernamentStateId = watch("nominee.permanentAddress.stateId");
  const NomineePernamentDistrictId = watch(
    "nominee.permanentAddress.districtId"
  );
  const NomineeTempStateId = watch("nominee.temporaryAddress.stateId");
  const NomineeTempDistrictId = watch("nominee.permanentAddress.districtId");
  const getDistrict = async (id: number) => {
    const { data } = await GetDistrict(id);
    return data;
  };

  const getPalika = async (id: number) => {
    const { data } = await GetPalika(id);
    return data;
  };

  const {
    data: states,
    error: stateError,
    isLoading: isLoadingState,
  } = useQuery({
    queryKey: ["state"],
    queryFn: getState,
  });

  const {
    data: district,
    error: districtError,
    isLoading: isLoadingDistrict,
  } = useQuery({
    queryKey: ["District", pernamentstateId],
    queryFn: () => getDistrict(pernamentstateId),
    enabled: !!pernamentstateId,
  });

  const {
    data: palika,
    isError: palikaError,
    isLoading: isLoadingPalika,
  } = useQuery({
    queryKey: ["palika", pernamentDistrictId],
    queryFn: () => getPalika(pernamentDistrictId),
    enabled: !!pernamentDistrictId,
  });

  const {
    data: tempDistrict,
    isError: tempDistrictError,
    isLoading: tempIsLoadingDistrict,
  } = useQuery({
    queryKey: ["Temp District", tempStateId],
    queryFn: () => getDistrict(tempStateId),
    enabled: !!tempStateId,
  });

  const {
    data: tempPalika,
    isError: tempPalikaError,
    isLoading: tempIsLoadingPalika,
  } = useQuery({
    queryKey: ["Temp Palika", tempDistrictId],
    queryFn: () => getPalika(tempDistrictId),
    enabled: !!tempDistrictId,
  });

  const {
    data: NomineePerDistrict,
    isError: NomineePerError,
    isLoading: NomineePerLoading,
  } = useQuery({
    queryKey: ["Nominee pernament disrtict", NomineePernamentStateId],
    queryFn: () => getDistrict(NomineePernamentStateId),
  });
  const {
    data: NomineeTempDistrict,
    isError: NomineeTempError,
    isLoading: NomineeTempLoading,
  } = useQuery({
    queryKey: ["Nominee temp disrtict", NomineeTempStateId],
    queryFn: () => getDistrict(NomineeTempStateId),
  });

  const { data: NomineePerPalika } = useQuery({
    queryKey: ["Nominee Pernament Palika", NomineePernamentDistrictId],
    queryFn: () => getPalika(NomineePernamentDistrictId),
  });
  const { data: NomineeTempPalika } = useQuery({
    queryKey: ["Nominee Pernament Palika", NomineeTempDistrictId],
    queryFn: () => getPalika(NomineeTempDistrictId),
  });

  const [imagePreviewFront, setImagePreviewFront] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImagePreviewFront(URL.createObjectURL(file));
  };
  const [personalImagePreview, setPersonalImage] = useState("");
  const handleFileChangePersonalImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setPersonalImage(URL.createObjectURL(file));
  };
  const [voucherImagePreview, setVoucherImagePreview] = useState("");
  const handleFileChaangeVoucher = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setVoucherImagePreview(URL.createObjectURL(file));
  };
  const totalAmount = watch("shareQuantity") * watch("shareRate");

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log(data);
    formData.set("name", data.name);
    formData.set("personalImage",data?.personalImage[0])
    formData.set("grandFatherName", data.grandFatherName);
    formData.set("children", JSON.stringify(data.children));
    formData.set("fatherName", data.fatherName);
    formData.set("motherName", data.motherName);
    formData.set("spouseName", data.spouseName);
    formData.set("citizenshipNo", data.citizenshipNo);
    formData.set("citizenshipFrontImage", data?.citizenshipFrontImage[0]);
    formData.set("email", data?.email);
    formData?.set("contactNumber", data.contactNumber);
    formData.set("shareRate", data.shareRate);
    formData.set("shareQuantity", data?.shareQuantity);
    formData.set("totalShareAmount", JSON.stringify(totalAmount));
    formData.set("permanentAddress", JSON.stringify(data.permanentAddress));
    formData.set("temporaryAddress", JSON.stringify(data.temporaryAddress));
    formData.set("date", aa);
    formData.set("password", data.password);
    formData.set("voucherImage", data?.voucherImage[0]);
    formData.set("nominee", JSON.stringify(data?.nominee));
    const response = await CreateRequest(formData);
    if (response?.status === 200) {
      router.push("/");
    }
  };

  return (
    <>
      {showQR && (
        <Modal>
          <div className="flex items-center justify-center bg-white/40 rounded-md relative">
            <div className="bg-white/70 absolute top-3 right-3 rounded-full cursor-pointer">
              <PlusIcon
                className="h-10 w-10 rotate-45"
                onClick={(e) => {
                  e.preventDefault();
                  setShowQR(false);
                }}
              />
            </div>
            <Image
              src={modelImage}
              alt="where is image "
              width={500}
              height={500}
            />
          </div>
        </Modal>
      )}
      <FormBorder title="Share Application">
        <form
          action=""
          className=""
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex items-center justify-end mx-10">
            <button
              className="flex items-center gap-3 bg-green-500 text-white font-semibold px-5 py-2 rounded-md shadow-md"
              onClick={(e) => {
                e.preventDefault();
                setShowQR(true);
              }}
            >
              <QrCodeIcon className="h-6 w-6" />
              Show QR
            </button>
          </div>

          <FormBorder title="व्यक्तिगत विवरण">
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
                  <label htmlFor="" className="labelText">
                  व्यक्तिगत फोटो <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    className="inputStyle"
                    {...register("personalImage", {
                      required: "Personal Image is required",
                    })}
                    placeholder="नागरिकता फ़्रोन्त फोटो"
                    onChange={(e) => handleFileChangePersonalImage(e)}
                  />
                  {errors?.personalImage && (
                    <p className="text-red-600">
                      {errors?.personalImage?.message}
                    </p>
                  )}
                  {personalImagePreview ? (
                    <Image
                      alt=""
                      src={personalImagePreview}
                      width={100}
                      height={100}
                    />
                  ) : (
                    ""
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
                  <p className="text-red-600">{errors?.fatherName?.message}</p>
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
                  <p className="text-red-600">{errors?.motherName?.message}</p>
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
            </div>
            <FormBorder title="नागरिकता विवरण">
              <div className="px-3 py-3 grid grid-cols-3 gap-3">
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
                <div className="flex flex-col">
                  <label className="labelText">परिचय पत्र नं.</label>
                  <input
                    type="Number"
                    className="inputStyle"
                    {...register("nid")}
                    placeholder="नागरिकता नं."
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="labelText">
                    नागरिकता फोटो <span className="text-red-600">*</span>
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
            </FormBorder>

            <div className="grid grid-cols-2">
              <FormBorder title="स्थाई ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      परदेश <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("permanentAddress.stateId")}
                    >
                      <option value={0} selected disabled>
                        -- Select State --
                      </option>
                      {states?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.stateId}>
                            {item.stateNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      जिल्ला <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("permanentAddress.districtId")}
                    >
                      <option value={0} selected disabled>
                        -- Select District --
                      </option>
                      {district?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.districtId}>
                            {item.districtNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      पालिका <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("permanentAddress.palikaId")}
                    >
                      <option value={0} selected disabled>
                        -- Select Palika --
                      </option>
                      {palika?.map((item: any, index: any) => {
                        return (
                          <option key={index} value={item.palikaId}>
                            {item.palikaNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      वार्ड नं <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="वार्ड नं"
                      {...register("permanentAddress.ward")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      टोल{" "}
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="टोल "
                      {...register("permanentAddress.tole")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      घर नं
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="घर नं"
                      {...register("permanentAddress.houseNo")}
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <label htmlFor="" className="labelText">
                      एउटै ठेगाना ..?
                    </label>
                    <input
                      type="checkbox"
                      className="h-6 w-6"
                      {...register("checked")}
                      checked={watch("checked")}
                    />
                  </div>
                </div>
              </FormBorder>
              <FormBorder title="अस्थायी ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      परदेश <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("temporaryAddress.stateId")}
                    >
                      <option value={0} selected disabled>
                        -- Select State --
                      </option>
                      {states?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.stateId}>
                            {item.stateNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      जिल्ला <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("temporaryAddress.districtId")}
                    >
                      <option value={0} selected disabled>
                        -- Select District --
                      </option>
                      {tempDistrict?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.districtId}>
                            {item.districtNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      पालिका <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("temporaryAddress.palikaId")}
                    >
                      <option value={0} selected disabled>
                        -- Select Palika --
                      </option>
                      {tempPalika?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.palikaId}>
                            {item.palikaNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      वार्ड नं <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="वार्ड नं"
                      {...register("temporaryAddress.ward")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      टोल{" "}
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="टोल "
                      {...register("temporaryAddress.tole")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      घर नं
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="घर नं"
                      {...register("temporaryAddress.houseNo")}
                    />
                  </div>
                </div>
              </FormBorder>
            </div>
          </FormBorder>

          {/* nominee  */}
          <FormBorder title="Nominee">
            <div className="grid grid-cols-3 gap-3 px-3 py-2">
              <div className="flex flex-col">
                <label className="labelText">नाम</label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.name")}
                  placeholder="नाम"
                />
              </div>
              <div className="flex flex-col">
                <label className="labelText">फोन नम्बर </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.contactNumber")}
                  placeholder="फोन नम्बर "
                />
              </div>
              <div className="flex flex-col">
                <label className="labelText"> इमेल</label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.email")}
                  placeholder="इमेल "
                />
              </div>
              <div className="flex flex-col">
                <label className="labelText">सम्बन्ध </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.relation")}
                  placeholder="इमेल "
                />
              </div>
              <div className="flex flex-col">
                <label className="labelText">नागरिकता नं. </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.citizenship")}
                  placeholder="इमेल "
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <FormBorder title="स्थाई ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      परदेश <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.permanentAddress.stateId")}
                    >
                      <option value={0} selected disabled>
                        -- Select State --
                      </option>
                      {states?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.stateId}>
                            {item.stateNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      जिल्ला <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.permanentAddress.districtId")}
                    >
                      <option value={0} selected disabled>
                        -- Select District --
                      </option>
                      {NomineePerDistrict?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.districtId}>
                            {item.districtNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      पालिका <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.permanentAddress.palikaId")}
                    >
                      <option value={0} selected disabled>
                        -- Select Palika --
                      </option>
                      {NomineePerPalika?.map((item: any, index: any) => {
                        return (
                          <option key={index} value={item.palikaId}>
                            {item.palikaNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      वार्ड नं <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="वार्ड नं"
                      {...register("nominee.permanentAddress.ward")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      टोल{" "}
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="टोल "
                      {...register("nominee.permanentAddress.tole")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      घर नं
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="घर नं"
                      {...register("nominee.permanentAddress.houseNo")}
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <label htmlFor="" className="labelText">
                      एउटै ठेगाना ..?
                    </label>
                    <input
                      type="checkbox"
                      className="h-6 w-6"
                      {...register("checked")}
                      checked={watch("checked")}
                    />
                  </div>
                </div>
              </FormBorder>
              <FormBorder title="अस्थायी ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      परदेश <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.temporaryAddress.stateId")}
                    >
                      <option value={0} selected disabled>
                        -- Select State --
                      </option>
                      {states?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.stateId}>
                            {item.stateNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      जिल्ला <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.temporaryAddress.districtId")}
                    >
                      <option value={0} selected disabled>
                        -- Select District --
                      </option>
                      {NomineeTempDistrict?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.districtId}>
                            {item.districtNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      पालिका <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.temporaryAddress.palikaId")}
                    >
                      <option value={0} selected disabled>
                        -- Select Palika --
                      </option>
                      {NomineeTempPalika?.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.palikaId}>
                            {item.palikaNameNep}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      वार्ड नं <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="वार्ड नं"
                      {...register("nominee.temporaryAddress.ward")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      टोल{" "}
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="टोल "
                      {...register("nominee.temporaryAddress.tole")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      घर नं
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="घर नं"
                      {...register("nominee.temporaryAddress.houseNo")}
                    />
                  </div>
                </div>
              </FormBorder>
            </div>
          </FormBorder>
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
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="labelText">
                  शेयर कुल रकम <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("totalShareAmount", {
                    valueAsNumber: true,
                    required: "Account number is required",
                  })}
                  value={totalAmount}
                  placeholder="शेयर कुल रकम"
                />
              </div>
              <div>
                <div className="flex flex-col">
                  <label htmlFor="" className="labelText">
                    Voucher / Payment Screenshot{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    className="inputStyle"
                    {...register("voucherImage")}
                    placeholder="Voucher Image"
                    onChange={(e) => handleFileChaangeVoucher(e)}
                  />
                  {errors?.citizenshipFrontImage && (
                    <p className="text-red-600">
                      {errors?.citizenshipFrontImage?.message}
                    </p>
                  )}
                  {voucherImagePreview ? (
                    <Image
                      alt=""
                      src={voucherImagePreview}
                      width={100}
                      height={100}
                    />
                  ) : (
                    ""
                  )}
                </div>
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
