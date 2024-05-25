import React from 'react'
import Image from 'next/image'
import ErrorImage from '../../../../public/error.svg'
export default function Error() {
  return (
    <div className="w-[80vw] h-screen flex items-center justify-center flex-col" >
          <Image src={ErrorImage} alt="" width={500} height={500} />
          <h1 className="text-3xl my-3"><span className="text-red-600 text-3xl font-bold ">OOPS</span>,Something went wrong...</h1>


        </div>
  )
}
