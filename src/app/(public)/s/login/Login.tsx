"use client";
import React, { useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/Zod/resolver";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Login} from '@/services/apiServices/user/userServices';
import Cookies from "js-cookie";
import { cookies } from "next/headers";
export default function LoginFormUser() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await Login(data);
      console.log(response?.data?.accessToken,'response')
      if(response?.status === 200){
        Cookies.set('token',response?.data?.accessToken);
        router.push('/user')
      }

    } catch (error) {
      console.log(error)
    }
  };
  console.log(Cookies.get('token'))
  return (
    <div className=" border border-gray-100 shadow-md  flex  rounded-md  px-10 py-12 ">
      <div className="flex items-center justify-center w-full ">
        <Image
          alt=""
          src={"/logo_circle.jpeg"}
          width={400}
          height={500}
          className=""
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-green-700">
            Welcome User to Hariyali Share Platform !
          </h1>
          <h1 className="text-xl">Sign in</h1>
        </div>
        <form
          action=""
          className="flex flex-col gap-3 mt-6 "
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
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
          <div>
            <h1 className="text-center"> <span className="text-green-600">Don&apos;t have an account ?</span> {" "}
                <Link href={'/s/register'}  >
               <span className="text-blue-600"> Create Account</span> 
                </Link>
                </h1>
          </div>
            {/* {
              errors?.password && <p className="text-red-600">{errors?.password?.message}</p>
            } */}
          <button
            className="bg-green-600 hover:bg-green-700 font-bold text-white w-full rounded-md my-3 py-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed  "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
