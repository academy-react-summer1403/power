import Image from "next/image";
import BackPic from "@/assets/landing/body/713742647f10dcb14454ca157e835864.png";
import SectionPic from "@/assets/landing/body/Untitled-1.png";
import { motion } from "framer-motion";

export const NewsletterSection = () => {
  return (
    <div className="h-auto sm:h-[321px] flex-wrap sm:flex-none relative overflow-hidden w-full bg-[#5751E1] dark:bg-[#1D1D1D] flex items-center gap-8">
      <Image className="absolute top-0 left-[15%] z-0" src={BackPic} alt="" />
      <div className="w-[430px] h-full hidden lg:block">
        <Image src={SectionPic} alt="SectionPic" className="w-full h-full" />
      </div>
      <div className="w-[765px] flex flex-wrap h-52 sm:h-[146.5px]">
        <h1 className="relative z-10 w-[540px] h-[85px] text-[#FFFFFF] dark:text-[#F5F5F5] text-xl md:text-4xl leading-[43.2px]">
          می خواهید از دوره های جدید در جریان باشید؟
        </h1>
        <div className="relative z-10 w-full h-auto flex items-center gap-2">
          <input
            type="text"
            className="mt-6 w-[50%] md:w-[535px] h-16 border border-[#433EC2] dark:border-[#4A4A4A] outline-none p-5 bg-[#4A44D1] dark:bg-[#2A2A2A] rounded-[50px] text-[#9E9BF1] dark:text-[#D1D1D1] leading-5"
            placeholder="ایمیل خود را تایپ کنید"
          />
          <motion.button className="font-semibold w-[20%] text-[10px] sm:text-base sm:w-[220px] h-[60px] rounded-[50px] border bg-[#FFC224] dark:bg-[#FFC224] border-[#141109] dark:border-[#3D3D3D] text-center content-center shadow-[4px_6px_0_0] shadow-[#3D3D3D]" 
          whileTap={{ scale: 0.9 }}
          >
            اکنون مشترک شوید
          </motion.button>
        </div>
      </div>
    </div>
  );
};
