"use client";
import React, { useState, useEffect, use } from "react";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import FormBorder from "@/app/(public)/Components/FormBorder";
import { PlusIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  GetDistrict,
  GetPalika,
  GetState,
} from "@/services/apiServices/office/officeServices";
import { useQuery } from "@tanstack/react-query";
import {
  CreateRequest,
  GetDetailsWithNumber,
} from "@/services/apiServices/request/requestServices";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();
import { useRouter } from "next/navigation";
import Modal from "@/app/(public)/Components/Modal";
import modelImage from "../../../../../../public/qr.jpeg";
import { ShareRequest } from "@/types/types";

const CreateApplicatonByAdmin = () => {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);

  const [date, setDate] = useState(aa);
  const [searchData, setSearchData] = useState({
    certificateNumber: "",
    contactNumber: "",
  });
  const [fillData, setFillData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    // resolver: zodResolver(applicationResolver),
    defaultValues: {
      _id: "",
      name: "",
      personalImage: "",
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
      checkedNominee: false,
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
  const NomineeTempDistrictId = watch("nominee.temporaryAddress.districtId");
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
  const handleFileChangePersonalImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  const watchFields = watch();
  const temporaryAddress = watch("temporaryAddress");
  useEffect(() => {
    if (watchFields?.checked === true) {
      const { stateId, districtId, palikaId, ward, tole, houseNo } =
        temporaryAddress || {};

      setValue("permanentAddress.stateId", stateId);
      setValue("permanentAddress.districtId", districtId);
      setValue("permanentAddress.palikaId", palikaId);
      setValue("permanentAddress.ward", ward);
      setValue("permanentAddress.tole", tole);
      setValue("permanentAddress.houseNo", houseNo);
    }
  }, [setValue, temporaryAddress, watchFields?.checked]);
  const nomineeTemporaryAddress = watch("nominee.temporaryAddress");
  useEffect(() => {
    if (watchFields?.checkedNominee === true) {
      setValue(
        "nominee.permanentAddress.stateId",
        nomineeTemporaryAddress?.stateId
      );
      setValue(
        "nominee.permanentAddress.districtId",
        nomineeTemporaryAddress?.districtId
      );
      setValue(
        "nominee.permanentAddress.palikaId",
        nomineeTemporaryAddress?.palikaId
      );
      setValue("nominee.permanentAddress.ward", nomineeTemporaryAddress?.ward);
      setValue("nominee.permanentAddress.tole", nomineeTemporaryAddress?.tole);
      setValue(
        "nominee.permanentAddress.houseNo",
        nomineeTemporaryAddress?.houseNo
      );
    }
  }, [setValue, watchFields?.checkedNominee]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log(data);
    formData.set("name", data.name);
    formData.set("personalImage", data?.personalImage[0]);
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
    formData.set("dateofBirth", date);
    const response = await CreateRequest(formData);
    if (response?.status === 200) {
      router.push("/admin/dashboard");
    }
  };

  const getFillDataHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await GetDetailsWithNumber(
        searchData?.certificateNumber,
        searchData?.contactNumber
      );
      if (response?.status === 200) {
        setFillData(response?.data);
        setLoading(false);
      }
      setSearchData({ contactNumber: "", certificateNumber: "" });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setValue("name", fillData?.name);
    setValue("email", fillData?.email);
    setValue("contactNumber", fillData?.contactNumber);
    setValue("personalImage", fillData?.personalImage);
    setPersonalImage(fillData?.personalImage);
    setDate(fillData?.date);
    setValue("grandFatherName", fillData?.grandFatherName);
    setValue("fatherName", fillData?.fatherName);
    setValue("motherName", fillData?.motherName);
    setValue("spouseName", fillData?.spouseName);
    setValue("citizenshipNo", fillData?.citizenshipNo);
    setValue("nid", fillData?.nid);
    setValue("citizenshipFrontImage", fillData?.citizenshipFrontImage);
    setValue("permanentAddress.stateId", fillData?.permanentAddress?.stateId);
    setValue(
      "permanentAddress.districtId",
      fillData?.permanentAddress?.districtId
    );
    setImagePreviewFront(fillData?.citizenshipFrontImage);
    setValue("nominee.name", fillData?.nominee?.name);
    setValue("nominee.email", fillData?.nominee?.email);
    setValue("nominee.contactNumber", fillData?.nominee?.contactNumber);
    setValue("nominee.citizenship", fillData?.nominee?.citizenship);
    setValue("nominee.relation", fillData?.nominee?.relation);
  }, [fillData, setValue]);

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
          <div>
            <div className="flex  gap-3 justify-end">
              <div className="flex flex-col">
                <label htmlFor="" className="labelText">
                  Share certificate number
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="certificate number"
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      certificateNumber: e.target.value,
                    })
                  }
                  value={searchData?.certificateNumber}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="labelText">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="contact number"
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      contactNumber: e.target.value,
                    })
                  }
                  value={searchData?.contactNumber}
                />
              </div>
              <button
                className="bg-green-600 h-10 mt-10 text-white rounded-md shadow-md  px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={(e) => getFillDataHandler(e)}
                disabled={
                  searchData?.certificateNumber == "" &&
                  searchData?.contactNumber == ""
                    ? true
                    : false
                }
              >
                {loading ? "searching" : "Fill Info."}
              </button>
            </div>
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
              <div className="pt-2">
                <label className="labelText">
                  जन्म मिति <span className="text-red-600">*</span>
                </label>
                <NepaliDatePicker
                  inputClassName="inputStyle w-full"
                  className=""
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
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
                <label className="labelText">श्रीमान / श्रीमती </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("spouseName")}
                  placeholder="श्रीमान / श्रीमती"
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
                  <label className="labelText"> राष्ट्रिय परिचय पत्र नं.</label>
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
              <FormBorder title="अस्थायी ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      प्रदेश <span className="text-red-600">*</span>
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
                          <option
                            key={index}
                            value={item.districtId}
                            selected={
                              fillData?.temporaryAddress?.districtId ||
                              0 
                            }
                          >
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
                          <option
                            key={index}
                            value={item.palikaId}
                            selected={
                              fillData?.temporaryAddress?.palikId ||
                              0 
                            }
                          >
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
              <FormBorder title=" स्थाई ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      प्रदेश <span className="text-red-600">*</span>
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
                          <option
                            key={index}
                            value={item.districtId}
                            selected={
                              fillData?.permanentAddress?.districtId ||
                              0 
                            }
                          >
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
                          <option
                            key={index}
                            value={item.palikaId}
                            selected={
                              fillData?.permanentAddress?.palikaId ||
                              0 
                            }
                          >
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
                </div>
              </FormBorder>
            </div>
          </FormBorder>

          {/* nominee  */}
          <FormBorder title="हक्वालाको बिवरण">
            <div className="grid grid-cols-3 gap-3 px-3 py-2">
              <div className="flex flex-col">
                <label className="labelText">
                  नाम <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.name", {
                    required: "Nominee name is required",
                  })}
                  placeholder="नाम"
                />
                {errors?.nominee?.name && (
                  <p className="text-red-600">
                    {errors?.nominee?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="labelText">
                  फोन नम्बर <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.contactNumber", {
                    required: "Nominee contact number is required",
                  })}
                  placeholder="फोन नम्बर "
                />
                {errors?.nominee?.contactNumber && (
                  <p className="text-red-600">
                    {errors?.nominee?.contactNumber?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="labelText">
                  {" "}
                  इमेल <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.email", {
                    required: "Nominee email is required",
                  })}
                  placeholder="इमेल "
                />
                {errors?.nominee?.email && (
                  <p className="text-red-600">
                    {errors?.nominee?.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="labelText">
                  नाता <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.relation", {
                    required: "Relation with nominee is requied",
                  })}
                  placeholder="सम्बन्ध "
                />
                {errors?.nominee?.relation && (
                  <p className="text-red-600">
                    {errors?.nominee?.relation?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="labelText">
                  नागरिकता नं. <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("nominee.citizenship", {
                    required: "Citizenship number is required",
                  })}
                  placeholder="नागरिकता नं. "
                />
                {errors?.nominee?.citizenship && (
                  <p className="text-red-600">
                    {errors?.nominee?.citizenship?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <FormBorder title="अस्थाई ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      प्रदेश <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.temporaryAddress.stateId", {
                        required: "Nominee state is required",
                      })}
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
                    {errors?.nominee?.temporaryAddress?.stateId && (
                      <p className="text-red-600">
                        {errors?.nominee?.temporaryAddress?.stateId?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      जिल्ला <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.temporaryAddress.districtId", {
                        required: "District is required",
                      })}
                    >
                      <option value={0} selected disabled>
                        -- Select District --
                      </option>
                      {NomineeTempDistrict?.map((item: any, index: number) => {
                        return (
                          <option
                            key={index}
                            value={item.districtId}
                            selected={
                              fillData?.nominee?.temporaryAddress?.districtId 
                            }
                          >
                            {item.districtNameNep}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.nominee?.temporaryAddress?.districtId && (
                      <p className="text-red-600">
                        {errors?.nominee?.temporaryAddress?.districtId?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      पालिका <span className="text-red-600">*</span>
                    </label>
                    <select
                      id=""
                      className="inputStyle"
                      {...register("nominee.temporaryAddress.palikaId", {
                        required: "Palika is required",
                      })}
                    >
                      <option value={0} selected disabled>
                        -- Select Palika --
                      </option>
                      {NomineeTempPalika?.map((item: any, index: number) => {
                        return (
                          <option
                            key={index}
                            value={item.palikaId}
                            selected={
                              fillData?.nominee?.temporaryAddress?.palikaId 
                            }
                          >
                            {item.palikaNameNep}
                          </option>
                        );
                      })}
                    </select>

                    {errors?.nominee?.temporaryAddress?.palikaId && (
                      <p className="text-red-600">
                        {errors?.nominee?.temporaryAddress?.palikaId?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      वार्ड नं <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="वार्ड नं"
                      {...register("nominee.temporaryAddress.ward", {
                        required: "Ward is required",
                      })}
                    />

                    {errors?.nominee?.temporaryAddress?.ward && (
                      <p className="text-red-600">
                        {errors?.nominee?.temporaryAddress?.ward?.message}
                      </p>
                    )}
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
                  <div className="flex gap-3 items-center">
                    <label htmlFor="" className="labelText">
                      एउटै ठेगाना ..?
                    </label>
                    <input
                      type="checkbox"
                      className="h-6 w-6"
                      {...register("checkedNominee")}
                      checked={watch("checkedNominee")}
                    />
                  </div>
                </div>
              </FormBorder>
              <FormBorder title="स्थायी ठेगाना">
                <div className="grid grid-cols-2 gap-3 px-3 py-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="labelText">
                      प्रदेश <span className="text-red-600">*</span>
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
                    {errors?.nominee?.permanentAddress?.stateId && (
                      <p className="text-red-600">
                        {errors?.nominee?.permanentAddress?.stateId?.message}
                      </p>
                    )}
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
                          <option
                            key={index}
                            value={item.districtId}
                            selected={
                              fillData?.nominee?.permanentAddress?.districtId
                            }
                          >
                            {item.districtNameNep}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.nominee?.permanentAddress?.districtId && (
                      <p className="text-red-600">
                        {errors?.nominee?.permanentAddress?.districtId?.message}
                      </p>
                    )}
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
                          <option key={index} value={item.palikaId}
                          selected={
                            fillData?.nominee?.permanentAddress?.districtId 
                          }
                          >
                            {item.palikaNameNep}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.nominee?.permanentAddress?.palikaId && (
                      <p className="text-red-600">
                        {errors?.nominee?.permanentAddress?.palikaId?.message}
                      </p>
                    )}
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
                </div>
              </FormBorder>
            </div>
          </FormBorder>
          <FormBorder title="सहरे बिवरण ">
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
                {errors?.shareQuantity && (
                  <p className="text-red-600">
                    {errors?.shareQuantity?.message}
                  </p>
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

              <div className="relative">
                <div className="flex absolute items-center justify-end bottom-2 -right-40">
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
                <div className="flex flex-col">
                  <label htmlFor="" className="labelText">
                    वोउचेर / पय्मेंट स्क्रीन्शोत{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    className="inputStyle"
                    {...register("voucherImage")}
                    placeholder="Voucher Image"
                    onChange={(e) => handleFileChaangeVoucher(e)}
                  />
                  {errors?.voucherImage && (
                    <p className="text-red-600">
                      {errors?.voucherImage?.message}
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

export default CreateApplicatonByAdmin