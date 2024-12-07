"use client"

import React from "react"
import { AuthHeader } from "../authHeader"
import Vector from "@/assets/landing/Vector.png";
import LoginPic from "@/assets/auth/Mobile login-amico 1.png";
import Image from "next/image";

export const AuthContent = () => {
 return (
  <div className="hidden md:w-[60%] md:flex overflow-hidden items-end justify-end flex-wrap">
    <div className="w-full flex flex-wrap justify-center mt-4 md:mt-0">
      <AuthHeader />
      <h1 className="h-24 w-full md:w-[500px] 2xl:w-[740px] text-[#161439] dark:text-[#FFFFFF] text-[24px] md:text-[35px] 2xl:text-[40px] font-semibold">
        <div className="w-full flex">
          هرگز از{" "}
          <div
            className="w-[100px] lg:w-[215px] h-9 lg:h-14 text-[#FFFFFF] dark:text-[#FFFFFF] text-center font-bold m-1"
            style={{
              backgroundImage: `url(${Vector.src})`,
              backgroundSize: "cover",
            }}
          >
            یادگیری
          </div>
        </div>
        دست نکشید زندگی هرگز از آموزش دست نمی کشد
      </h1>
    </div>
    <Image
      className="w-[100%] md:w-[465px] h-auto"
      src={LoginPic}
      alt="Login Image"
    />
  </div>
 )
}
