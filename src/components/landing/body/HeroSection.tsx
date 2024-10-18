import React from "react";
import HeroSectionBack from "@/assets/landing/HeroSection/heroSectionBack.png";
import HeroSectionPic from "@/assets/landing/HeroSection/div.col-lg-6-2.png";
import Vector from "@/assets/landing/Vector.png";
import ArowPic from "@/assets/landing/HeroSection/arow.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";


export const HeroSection = () => {
  return (
<div className="relative h-auto lg:h-[520px] w-full flex items-end justify-center" data-aos="fade-up" >
  <Image
    src={HeroSectionBack}
    alt="Hero Section Background"
    layout="fill"
    objectFit="cover"
    className="absolute inset-0 z-10 dark:opacity-[0.03]"
  />
      <div className="w-auto h-full flex justify-center items-center relative z-20">
        <div className="h-[433.5px] max-w-[90%] md:max-w-[600px] flex justify-right flex-wrap items-center">
          <div className="text-[30px] md:text-[40px] w-[490px] leading-[40px] md:leading-[60px] font-semibold flex flex-wrap text-gray-800 dark:text-white">
            هرگز از{" "}
            <TypeAnimation
              sequence={["یادگیری", 5000, "مقاومت", 5000]}
              wrapper="div"
              speed={70}
              repeat={Infinity}
              className="w-[150px] md:w-[215px] h-14 text-center text-[#FFFFFF] font-bold m-1"
              style={{
                backgroundImage: `url(${Vector.src})`,
                backgroundSize: "cover",
              }}
            />
            دست نکشید زندگی هرگز از آموزش دست نمی کشد
          </div>
          <div className="text-[#6D6C80] font-normal leading-7 w-full dark:text-gray-400">
            هر سفر آموزشی و یادگیری دنبال کردن منحصر به فرد است ما به شما کمک
            خواهیم کرد
          </div>
          <Link to="/CourseList"
            className="w-full md:w-[215px] h-12 bg-[#5751E1] text-white rounded-[50px] shadow-[4px_6px_0px] shadow-[#050071] flex justify-around items-center dark:bg-[#4a38b0]"
          >
            رایگان ازمایش کنید <Image src={ArowPic} alt="" />
          </Link>
        </div>
      </div>
      <div
        className=" hidden lg:h-[460px] lg:w-[720px] flex-wrap lg:flex-nowrap bg-cover bg-center lg:flex justify-center dark:relative z-30"
        style={{
          backgroundImage: `url(${HeroSectionPic.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};
