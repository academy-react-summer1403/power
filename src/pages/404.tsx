"use client"

import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import NotFoundPic from "@/assets/Not-Found/Section → SVG.svg"
import ArowPic from "@/assets/arow.png"
import React from "react"
import Image from "next/image"
import Breadcrumb from "@/components/path"
import { Link } from "react-router-dom"

export const NotFound = () => {
    const path = ["صفحه خطا"];
    const title = "صفحه خطا";
    return(
        <>
                <Header/>
                            <div className="w-full text-[40px] text-[#161439] font-semibold h-auto  flex flex-wrap items-center justify-center">
                                    <Breadcrumb   path={path} title={title}  />
                                    <Image className="w-[450px] h-[325px]" src={NotFoundPic} alt=""/>
                                    <h1 className="w-full text-center mt-14"> صفحه خطا! </h1>
                                    <h1 className="w-full text-center mt-2"> متاسفم! این صفحه در دسترس نیست! </h1>
                                    <div className="w-full h-auto flex justify-center" >
                                    <Link to='/' className=" rounded-[50px] flex justify-center items-center text-base text-white m-12 w-[230px] h-[50px] bg-[#5751E1] shadow-[4px_6px_0_0] shadow-[#050071] text-center content-center">  به صفحه اصلی بروید <Image src={ArowPic} alt=""/></Link>
                                    </div>
                            </div>
                <Footer/>
        </>
    )
}