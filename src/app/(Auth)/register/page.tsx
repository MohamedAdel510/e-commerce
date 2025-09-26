import React from "react";
import RegisterFrom from "./RegisterForm";
import Link from "next/link";
// import { useForm } from 'react-hook-form'

export default function page() {
  // "name": "Ahmed Abd Al-Muti",
  // "email":"ahmedmuttii4012@gmail.com",
  // "password":"Ahmed@123",
  // "rePassword":"Ahmed@123",
  // "phone":"01010700701"

  return (
    <div className=" w-full sm:w-10/12 md:w-2/3 lg:w-1/2 mx-auto text-center  py-14">
      <div className="flex justify-center gap-5">
        <Link href={"/login"}><h1 className="text-2xl font-bold text-[#9CA3AF]">Login</h1></Link>
        <h1 className="text-2xl font-bold">Register</h1>
      </div>

      <RegisterFrom />
    </div>
  );
}
