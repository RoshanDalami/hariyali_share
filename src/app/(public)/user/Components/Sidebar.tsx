// import React from "react";
// import Image from "next/image";
// import logo from "/public/logo_circle.jpeg";
// import { useRouter } from "next/router";
// export default function Sidebar() {
//   const router = useRouter();

//   const handleNavigation = (path) => {
//     router.push(path);
//   };
//   return (
//     <div className="h-[100%] w-[15%] bg-white  shadow-md ">
//       <div className="flex justify-center ">
//         <Image
//           className="rounded-md"
//           width={100}
//           height={40}
//           src={logo}
//           alt="logo"
//         />
//       </div>
//       <div className=" mt-4 text-sm space-y-4  text-black ml-4">
//         <div className="flex gap-4 h-[40px] hover:bg-slate-950 hover:text-white hover:rounded-lg  items-center cursor-pointer">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-8">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//             />
//           </svg>
//           <h1 className="">Username</h1>
//         </div>
//         <div className="flex flex-col space-y-4   item  ">
//           <p className=" flex items-center  h-[40px] hover:bg-slate-950 hover:text-white hover:rounded-lg cursor-pointer " >
//             Application </p>

//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import Image from "next/image";
import logo from "/public/logo_circle.jpeg";
import Link from "next/link";

export default function Sidebar() {
  //   const router = useRouter();

  //   const handleNavigation = (path: string) => {
  //     router.push(path);
  //   };

  return (
    <div className="h-[100%] w-[15%] bg-white shadow-md">
      <div className="flex justify-center">
        <Image
          className="rounded-md"
          width={100}
          height={40}
          src={logo}
          alt="logo"
        />
      </div>
      <div className="mt-4 text-sm space-y-4 text-black ml-4">
        <div className="flex gap-4 h-[40px] hover:bg-slate-950 hover:text-white hover:rounded-lg items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <h1 className="">Username</h1>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            className="flex items-center h-[40px] hover:bg-slate-950 hover:text-white hover:rounded-lg  cursor-pointer"
            href="/user/application">
            {" "}
            Application
          </Link>
        </div>
      </div>
    </div>
  );
}
