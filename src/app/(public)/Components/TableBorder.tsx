import { ReactNode } from "react";
import Link from "next/link";
export default function TableBorder({
  title1,
  children,
  url
}: {
  title1: string;
  children: ReactNode;
  url:string
}) {
  return (
    <div className="md:mx-10 mx-3  mt-10 border-2 border-gray-400 md:py-3 py-1  rounded-lg relative ">
      <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-bold absolute -top-4 left-5 ">
        <h1>{title1}</h1>
      </div>
      <Link href={url}>

      <button className="bg-green-600 text-white px-3 py-2 rounded-lg font-bold absolute -top-4 right-5 "  >
        <h1>Add</h1>
      </button>
      </Link>
      <div>{children}</div>
    </div>
  );
}
