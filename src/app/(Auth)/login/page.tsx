import React from 'react'
import LoginForm from './LoginForm'
import Link from 'next/link'

export default function login() {
  return (
    <div className='w-full sm:w-10/12 md:w-2/3 lg:w-1/2 mx-auto text-center  py-14'>

    <div className="flex justify-center gap-5">
      <Link href={"/register"}><h1 className="text-2xl font-bold text-[#9CA3AF]">Register</h1></Link>
      <h1 className='text-2xl font-bold text-center'>Login</h1>
    </div>

      <LoginForm/>


    </div>
  )
}
