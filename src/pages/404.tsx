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
                            <div className="w-full text-[40px] text-[#161439] font-semibold h-screen flex items-center justify-center">
                                    <Image className="w-[450px] h-[325px]" src={NotFoundPic} alt=""/>
                                    <h1 className="w-full mt-14"> صفحه خطا! </h1>
                            </div>
                <Footer/>
        </>
    )
}