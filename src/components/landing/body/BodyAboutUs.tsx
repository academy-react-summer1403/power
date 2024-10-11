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
        <div className="h-8 w-44 bg-[#EFEEFE] rounded-[30px] text-[#5751E1] text-center font-medium content-center">
          درباره ما بیشتر بدانید
        </div>
        <div className="h-[100px] font-semibold text-[#161439] leading-[48px] text-4xl w-[350px] flex flex-wrap gap-5 mt-4">
          هزاران{" "}
          <div
            className="font-bold w-[180px] text-center content-center text-[#FFFFFF] h-[60px]"
            style={{
              backgroundImage: `url(${Vector.src})`,
              backgroundSize: "cover",
            }}
          >
            دوره های
          </div>
          برتر اکنون در این مکان
        </div>
        <div className="w-[515px] h-[85px] mt-8 leading-7 text-[#6D6C80]">
          صندوق ورودی مشترک بصری Groove این کار را برای اعضای تیم آسان می
          کند سازماندهی، اولویت بندی و. در این قسمت از Smashing Pod ما هستیم
          صحبت در مورد پایه پلتفرم وب.
        </div>
        <motion.button whileTap={{ scale: 0.9 }} className="mt-5 bg-[#5751E1] rounded-[50px] w-56 h-11 shadow-[4px_6px_0_0] shadow-[#050071] text-[#FFFFFF] flex items-center justify-around">
          رایگان آزمایش کنید <Image src={ArowPic} alt="" />
        </motion.button>
      </div>
    </div>
  )
}