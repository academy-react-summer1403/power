"use client";

import React from "react";
import AboutUsPic from "@/assets/Contact/Section → inner_about_img.png.png";
import Vector from "@/assets/landing/Vector.png";
import Image from "next/image";
import { motion } from "framer-motion";
import ArowPic from "@/assets/landing/HeroSection/arow.png";

export const ContactSection = () => {
  return (
    <div className="mt-32 mb-36 w-full h-auto flex flex-wrap lg:flex-none justify-center items-center gap-16">
      <div className="w-[690px] h-[510px]" data-aos="fade-left">
        <Image src={AboutUsPic} alt="AboutUsPic" />
      </div>
      <div
        className="h-auto flex flex-wrap items-center w-[515px]"
        data-aos="fade-right"
      >
        <div className="h-8 w-44 bg-[#EFEEFE] dark:bg-[#3A3A3A] rounded-[30px] text-[#5751E1] dark:text-[#AEB8D1] text-center font-medium content-center">
          درباره ما بیشتر بدانید
        </div>
        <div className="h-[145px] items-center font-semibold text-[#161439] dark:text-[#E3E3E3] leading-[48px] text-[31px] w-[850px] flex flex-wrap mt-4">
          {" "}
          <span className="w-full flex">
            توانمندسازی دانش آموزان برای رسیدن به
          </span>{" "}
          <span className="w-full flex gap-2">
            {" "}
            هدف
            <div
              className="font-bold w-[193px] text-center content-center text-[#FFFFFF] h-[60px] "
              style={{
                backgroundImage: `url(${Vector.src})`,
                backgroundSize: "cover",
              }}
            >
              بالقوه
            </div>
            آنها برای چالش
          </span>{" "}
          سطح بعدی.
        </div>
        <div className="w-[515px] h-[85px] mt-8 leading-7 text-[#6D6C80] dark:text-[#CFCFCF]">
          سلام! این یک پیام تستی است سلام! این یک پیام تستی است سلام! این یک
          پیام تستی است سلام! این یک پیام تستی است سلام! این یک پیام تستی است
          سلام! این یک پیام تستی است سلام! این یک پیام تستی است
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="mt-5 bg-[#5751E1] dark:bg-[#3A3A3A] rounded-[50px] w-56 h-11 shadow-[4px_6px_0_0] shadow-[#050071] dark:shadow-[#1D1D1D] text-[#FFFFFF] dark:text-[#CFCFCF] flex items-center justify-around"
        >
          آزمایش رایگان را شروع کنید<Image src={ArowPic} alt="" />
        </motion.button>
      </div>
    </div>
  );
};
