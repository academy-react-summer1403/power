"use client"

import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import NotFoundPic from "@/assets/Not-Found/Section → SVG.svg"
import React from "react"
import Image from "next/image"

export const NotFound = () => {
    return(
        <>
                <Header/>
                            <div className="w-full text-[40px] text-[#161439] font-semibold h-auto m-10 flex flex-wrap items-center justify-center">
                                    <Image className="w-[450px] h-[325px]" src={NotFoundPic} alt=""/>
                                    <h1 className="w-full text-center mt-14"> صفحه خطا! </h1>
                                    <h1 className="w-full text-center mt-2"> متاسفم! این صفحه در دسترس نیست! </h1>
                            </div>
                <Footer/>
        </>
    )
}