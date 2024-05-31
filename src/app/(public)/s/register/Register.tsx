"use client";
import React, { useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/Zod/resolver";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Register} from '@/services/apiServices/user/userServices';
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function RegisterUser() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    // resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
   try {
        const response = await Register(data);
        if(response?.status === 200){
          toast.success('User registered successfully')
            router.push('/s/login')
        }
   } catch (error) {
      toast.error('User registered failed')
   }
  };

  return (
    <>
      
    <div className=" border border-gray-100 shadow-lg shadow-green-200  flex  rounded-md  px-10 py-12 ">
      
      <div className="w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-green-700">
            Welcome User to Hariyali Share Platform !
          </h1>
          <h1 className="text-xl">Register User</h1>
        </div>
        <form
          action=""
          className="flex flex-col gap-3 mt-6 "
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex flex-col">
            <label className="labelText">Username</label>
            <input
              type="text"
              className="inputStyle"
              placeholder="username"
              {...register("username")}
            />
            {/* {
              errors?.email && <p className="text-red-600">{errors?.email?.message}</p>
            } */}
          </div>
          <div className="flex flex-col">
            <label className="labelText">Email</label>
            <input
              type="email"
              className="inputStyle"
              placeholder="email"
              {...register("email")}
            />
            {/* {
              errors?.email && <p className="text-red-600">{errors?.email?.message}</p>
            } */}
          </div>
          <div className="flex flex-col">
            <label className="labelText">Contact Number</label>
            <input
              type="number"
              className="inputStyle"
              placeholder="Contact Number"
              {...register("contactNumber")}
            />
            {/* {
              errors?.email && <p className="text-red-600">{errors?.email?.message}</p>
            } */}
          </div>
          <div className="flex flex-col relative">
            <label className="labelText">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="inputStyle "
              placeholder="******"
              {...register("password")}
            />
            
            <div
              className="absolute bottom-4 right-4 "
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-6" />
              ) : (
                <EyeIcon className="h-5 w-6" />
              )}
            </div>
          </div>
          <div className="flex flex-col relative">
            <label className="labelText"> Confirm Password</label>

            <input
              type={`${showConPassword ? "text" : "password"}`}
              className="inputStyle "
              placeholder="******"
              {...register("confirmpassword")}
            />
            
            <div
              className="absolute bottom-4 right-4 "
              onClick={() => setShowConPassword((prevState) => !prevState)}
            >
              {showConPassword ? (
                <EyeSlashIcon className="h-5 w-6" />
              ) : (
                <EyeIcon className="h-5 w-6" />
              )}
            </div>
          </div>
          <h1>
            {
                watch('password') !== watch('confirmpassword') && <p className="text-red-600 text-center">Password and Confirm password is not matched </p>
            }
          </h1>
          <div>
            <h1 className="text-center"> <span className="text-green-600">Already have an account ?</span> {" "}
                <Link href={'/s/login'}  >
               <span className="text-blue-600"> Login</span> 
                </Link>
                </h1>
          </div>
            {/* {
              errors?.password && <p className="text-red-600">{errors?.password?.message}</p>
            } */}
          <button
            className="bg-green-600 hover:bg-green-700 font-bold text-white w-full rounded-md my-3 py-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed  "
            type="submit"
            disabled={isSubmitting ||  watch('password') !== watch('confirmpassword') }
          >
            {isSubmitting ? "submitting..." : "Resigter"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
