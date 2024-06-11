'use client'
import { useEffect } from "react";
import NavBar from "./Components/NavBar";
export default function Home() {
// useEffect(()=>{
//   window.location.reload()
// },[])
  return (
    <main className="">
<NavBar/>
    <div className="flex h-screen w-full justify-center items-center ">
      <h1 className="text-[100px] font-bold  text-green-400">Hariyali Share </h1>
    </div>
    </main>
  );
}



