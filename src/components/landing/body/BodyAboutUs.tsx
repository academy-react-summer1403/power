import React from 'react';
import AboutUsPic from '@/assets/landing/body/Section → about_img.png.png';
import Vector from "@/assets/landing/Vector.png";
import Image from "next/image";
import { motion } from "framer-motion";
import ArowPic from "@/assets/landing/HeroSection/arow.png";

export const BodyAboutUs = () => {
  return (
    <div className="mt-32 w-full h-auto flex flex-wrap lg:flex-none justify-center items-center gap-16">
      <div className="w-[520px] h-[470px]" data-aos="fade-left">
        <Image src={AboutUsPic} alt="AboutUsPic" />
      </div>
      <div className="h-auto flex flex-wrap items-center w-[515px]" data-aos="fade-right">
        <div className="h-8 w-44 bg-[#EFEEFE] dark:bg-[#3A3A3A] rounded-[30px] text-[#5751E1] dark:text-[#AEB8D1] text-center font-medium content-center">
          درباره ما بیشتر بدانید
        </div>
        <div className="h-auto lg:h-[100px] font-semibold text-[#161439] dark:text-[#E3E3E3] leading-[48px] text-4xl w-full lg:w-[350px] flex flex-wrap gap-5 mt-4">
          هزاران{" "}
          <div
            className="font-bold flex w-[180px] text-center content-center text-[#FFFFFF] h-auto lg:h-[60px] "
            style={{
              backgroundImage: `url(${Vector.src})`,
              backgroundSize: "cover",
            }}
          >
            دوره های
          </div>
          برتر اکنون در این مکان
        </div>
        <div className="w-full lg:w-[515px] h-auto lg:h-[85px] mt-8 leading-7 text-[#6D6C80] dark:text-[#CFCFCF]">
          صندوق ورودی مشترک بصری Groove این کار را برای اعضای تیم آسان می
          کند سازماندهی، اولویت بندی و. در این قسمت از Smashing Pod ما هستیم
          صحبت در مورد پایه پلتفرم وب.
        </div>
        <motion.button whileTap={{ scale: 0.9 }} className="mt-5 bg-[#5751E1] dark:bg-[#3A3A3A] rounded-[50px] w-56 h-11 shadow-[4px_6px_0_0] shadow-[#050071] dark:shadow-[#1D1D1D] text-[#FFFFFF] dark:text-[#CFCFCF] flex items-center justify-around">
          رایگان آزمایش کنید <Image src={ArowPic} alt="" />
        </motion.button>
      </div>
    </div>
  )
}
