import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function NavBar() {
  return (
    <div className=' sticky top-0 z-40 flex items-center py-3 justify-between bg-green-600 px-10'>
      <div>
        <Link href={'/'}>
        <Image alt='logo' src={'/logo_circle.jpeg'} width={75} height={75} className='rounded-full'/>
        </Link>
      </div>
      <div className='flex gap-3 items-center'>
        <Link href={'/application'} className=' cursor-pointer'>
        <button className='bg-blue-600 text-white rounded-md shadow-md px-3 py-2'>
            Application
        </button>
        </Link>
        <Link href={'/admin/login'} className=' cursor-pointer' >
        <button className='bg-red-600 text-white rounded-md shadow-md px-3 py-2'>
            Login
        </button>
        </Link>
      </div>
    </div>
  )
}
