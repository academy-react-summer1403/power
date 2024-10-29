import React from "react";
import { CourseWrapper } from "../../Course/CourseWrapper";
import ArowPic from "@/assets/landing/HeroSection/arow.png";
import HeroSectionBack from "@/assets/landing/HeroSection/heroSectionBack.png";
import Image from "next/image";

interface TopCoursesSectionProps {
    topCourseState: any[]; 
}

export const TopCoursesSection: React.FC<TopCoursesSectionProps> = ({ topCourseState }) => {
    return (
        <div className="mt-32 w-full h-auto lg:h-[1024px] flex justify-center items-center bg-white dark:bg-[#111024] relative">
            <Image
                src={HeroSectionBack.src} 
                alt="Hero Section Background"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-10 dark:opacity-5"
            />
            <div className="w-[1440px] h-auto lg:h-[750px] flex flex-wrap justify-center relative z-20">
                <div className="w-[720px] h-[215px] flex flex-wrap justify-center">
                    <p className="text-base content-center w-[175px] h-[35px] rounded-[30px] bg-[#EFEEFE] dark:bg-[#2c2c2c] text-[#5751E1] dark:text-[#a0a0ff] text-center font-medium">
                        دوره ها کلاس برتر
                    </p>
                    <div className="text-[#161439] dark:text-white text-4xl font-semibold tracking-tight">
                        بهترین دوره های آموزشی جهان ما را کاوش کنید
                    </div>
                    <p className="text-[#6D6C80] dark:text-white">
                        امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است
                    </p>
                </div>
                <div className="w-full h-auto flex flex-wrap lg:flex-none items-center">
                    <div
                        className="w-full 2xl:w-[1460px] h-auto flex-wrap lg:flex-nowrap lg:h-[485px] flex justify-center gap-4"
                        data-aos="fade-up"
                    >
                        <CourseWrapper stateTopCourse={topCourseState} />
                    </div>
                </div>
            </div>
        </div>
    );
};