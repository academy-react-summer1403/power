"use client";

import Image from "next/image";
import StarPic from "@/assets/Contact/SVG (3).png"
import CertificatePic from "@/assets/Contact/Vector (2).png"
import TeacherPic from "@/assets/Contact/SVG@2x.png"
import CoursePic from "@/assets/Contact/SVG (4).png"
import React from "react";

export const WhatWeOfferSection = () => {
  return (
    <div className="w-full bg-[#F7F7F9] dark:bg-gray-700 h-[1450px] lg:h-auto max-h-[1500px] min-h-[700px] flex items-center justify-center flex-wrap">
      <div className="w-[80%] h-full lg:h-[480px] flex flex-wrap items-center justify-center">
        {" "}
        <div className="h-8 w-44 bg-[#EFEEFE] dark:bg-[#3A3A3A] rounded-[30px] text-[#5751E1] dark:text-[#AEB8D1] text-center font-medium content-center">
          آنچه ما ارائه می دهیم
        </div>
        <div className="w-full flex flex-wrap h-auto text-[#161439] dark:text-[#F0F0F0] text-[36px] font-semibold ">
          <span className="w-full text-center">
            یادگیری مهارت های جدید در زمانی که و
          </span>
          <span className="w-full text-center">جایی که تو دوست داری</span>
        </div>
        <div className="w-full flex flex-wrap h-auto text-[#6D6C80] dark:text-[#f0f0f064] ">
          <span className="w-full text-center">
            سلام! این یک پیام تستی است سلام! این یک پیام تستی است سلام! این{" "}
          </span>
          <span className="w-full text-center">یک پیام تستی است</span>
        </div>
      <div className="w-full h-auto flex-wrap lg:flex-nowrap flex justify-center gap-8 items-center"> 
                    <div className="w-[450px] flex overflow-auto justify-center items-center flex-wrap bg-[#F1FDFF] h-[225px] border rounded-3xl border-[#C9E4E9] shadow-[8px_8px_0_0] shadow-[#C9E4E9]">
                            <div className="w-[90%] flex justify-end items-center"> <Image src={StarPic} alt="" /> </div>
                            <div className="w-[80%] text-[#161439] text-[22px] flex gap-4 items-center"> 
                                <div className="w-[70px] h-[70px] flex justify-center items-center rounded-full bg-[#1BCBE3]"> <Image width={32} height={26} src={TeacherPic} alt=""/> </div> معلمان متخصص
                            </div>
                            <p className="w-[80%] text-[#1C1A4A] mt-4">معلمان متخصص با دانش و تجربه خود، راهنمایی‌های موثری برای دانش‌آموزان ارائه می‌دهند.</p>
                    </div>
                    <div className="w-[450px] flex overflow-auto justify-center items-center flex-wrap bg-[#EDEAFF] h-[225px] border rounded-3xl border-[#C8C1ED] shadow-[8px_8px_0_0] shadow-[#D9D5F1]">
                            <div className="w-[90%] flex justify-end items-center"> <Image src={StarPic} alt="" /> </div>
                            <div className="w-[80%] text-[#161439] text-[22px] flex gap-4 items-center"> 
                                <div className="w-[70px] h-[70px] flex justify-center items-center rounded-full bg-[#5751E1]"> <Image src={CoursePic} alt=""/> </div> دوره های موثر
                            </div>
                            <p className="w-[80%] text-[#1C1A4A] mt-4">دوره‌های مؤثر، توانمندی‌های یادگیرندگان را به‌طرز چشم‌گیری بهبود می‌بخشند.</p>
                    </div>
                    <div className="w-[450px] overflow-auto flex justify-center items-center flex-wrap bg-[#FFF7E2] h-[225px] border rounded-3xl border-[#EBE0C4] shadow-[8px_8px_0_0] shadow-[#E5DECB]">
                            <div className="w-[90%] flex justify-end items-center"> <Image src={StarPic} alt="" /> </div>
                            <div className="w-[80%] text-[#161439] text-[22px] flex gap-4 items-center"> 
                                <div className="w-[70px] h-[70px] flex justify-center items-center rounded-full bg-[#FFC224]"> <Image src={CertificatePic} alt=""/> </div> دریافت گواهینامه
                            </div>
                            <p className="w-[80%] text-[#1C1A4A] mt-4">دریافت گواهینامه نشان‌دهنده توانایی و تخصص فرد در یک حوزه خاص است.</p>
                    </div>
        </div> 
      </div>
    </div>
  );
};
