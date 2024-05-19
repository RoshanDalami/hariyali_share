import { ReactNode } from "react";


export default function FormBorder({title,children}:{title:string,children:ReactNode}) {
  return (
    <div className='md:mx-10 mx-3  mt-10 border-2 border-gray-400 md:py-3 py-1  rounded-lg relative '>
        <div className='bg-green-600 text-white px-3 py-2 rounded-lg font-bold absolute -top-4 left-5 '>
            <h1>{title}</h1>
        </div>
        <div >

      {children}
        </div>
    </div>
  )
}
