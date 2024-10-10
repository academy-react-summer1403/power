"use client"

import React from "react";
import { Link } from "react-router-dom";

export const Four = () => {
    return(
        <>
                <div className="h-screen w-full flex flex-wrap justify-center items-center">
                             <h1 className=" w-full text-[36px] font-semibold text-center"> عملیات ثبت نام با موفقیت انجام شد </h1>

                             <Link to="/Login" className="w-auto p-5 h-auto bg-[#FFC224] rounded-[30px] shadow-[4px_4px_0_0_] shadow-[#3D3D3D]"> لطفا با زدن این دکمه به صفحه لاگین بروید و لاگین کنید  </Link>
                </div>
        </>
    )
}