import React from "react";
import { CourseWrapper } from "../../Course/CourseWrapper";
import ArowPic from "@/assets/landing/HeroSection/arow.png";
import HeroSectionBack from "@/assets/landing/HeroSection/heroSectionBack.png";
import Image from "next/image";

export const TopCoursesSection = ({ topCourseState }) => {
  return (
    <div
      className="mt-32 w-full h-[1024px] flex justify-center items-center"
      style={{ backgroundImage: `url(${HeroSectionBack.src})` }}
    >
      <div className="w-[1440px] h-[750px] flex flex-wrap justify-center ">
        <div className="w-[720px] h-[215px] flex flex-wrap justify-center">
          <p className="text-base w-[175px] h-[35px] rounded-[30px] bg-[#EFEEFE] text-[#5751E1] text-center font-medium">
            دوره ها کلاس برتر
          </p>
          <div className="text-[#161439] text-4xl font-semibold tracking-tight">
            بهترین دوره های آموزشی جهان ما را کاوش کنید
          </div>
          <p className="text-[#6D6C80]">
            امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است
          </p>
        </div>
        <div className="w-auto h-auto flex items-center">
          <button className="rotate-180 w-16 h-16 bg-[#5751E1] border border-black shadow-[3.6px_2.4px_0_0] shadow-[#23232B] rounded-[30px] flex justify-center items-center">
            <Image src={ArowPic} alt="" />
          </button>
          <div className="w-[1200px] 2xl:w-[1460px] h-[485px] flex justify-center gap-4" data-aos="fade-up">
            <CourseWrapper stateTopCourse={topCourseState} />
          </div>
          <button className="w-16 h-16 bg-[#5751E1] border border-black shadow-[3.6px_2.4px_0_0] shadow-[#23232B] rounded-[30px] flex justify-center items-center">
            <Image src={ArowPic} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
