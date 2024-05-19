"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Home() {
  const [open, setOpen] = useState(false);

  const fetchBabyDetails = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/baby/getBabyDetail"
    );
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["baby"],
    queryFn: fetchBabyDetails,
  });
  console.log(data, "response");
  if(error) return <p>Error occurs while fetching data</p>
  if(isLoading) return <p>Loading ...</p>
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <button
        className="bg-indigo-600 rounded-md text-white shadow-md px-3 py-2"
        onClick={() => setOpen((prevState) => !prevState)}
      >
        Click Me
      </button>
      {open && (
        <div>
          <h1>Jhau layo </h1>
        </div>
      )}
    </main>
  );
}
