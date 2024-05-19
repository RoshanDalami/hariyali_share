"use client";
import React, { useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/Zod/resolver";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

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
          <h1 className="text-xl font-bold text-green-700">
            Welcome to Hariyali Share Platform !
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
            {/* {
              errors?.password && <p className="text-red-600">{errors?.password?.message}</p>
            } */}
          <button
            className="bg-green-600 hover:bg-green-700 font-bold text-white w-full rounded-md my-3 py-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed  "
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
