"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "./(public)/Components/NavBar";
export default function Home() {

  return (
    <main className="">
      <NavBar/>
    <div className="flex h-screen w-full justify-center items-center ">
      <h1 className="text-[100px] font-bold  text-green-400">Hariyali Share </h1>
    </div>
    </main>
  );
}
