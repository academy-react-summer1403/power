"use client";

import Image from "next/image";
import InstagramPic from "@/assets/landing/body/Symbol.png";
import WhatsAppPic from "@/assets/landing/body/Symbol (1).png";
import TwitterPic from "@/assets/landing/body/Symbol (2).png";
import FacebookPic from "@/assets/landing/body/Symbol (3).png";
import TeacherDefualtPic from "@/assets/landing/body/Section → Link → instructor06.png.png";
import { useNavigate } from "react-router-dom";

interface Teacher {
  fullName: string;
  pictureAddress?: string;
  courseCounts : number;
  teacherId : string;
}

export const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  const navigate = useNavigate()
  const ImgSrc =
    teacher.pictureAddress &&
    (teacher.pictureAddress.startsWith("/") ||
      teacher.pictureAddress.startsWith("http"))
      ? teacher.pictureAddress
      : TeacherDefualtPic;

      const handleDoubleClick = () => {
        navigate(`/TeacherDetail/${teacher.teacherId}`)
      }

  return (
    <div 
      className="w-[390px] h-[185px] items-center flex justify-center gap-6 cursor-pointer"
      data-aos="fade-up-right"
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-[180px] h-[120px] flex justify-center items-center overflow-hidden rounded-full bg-gradient-to-r from-[#F7F6F9] to-[#E9F5F5]">
        <Image
          className="rounded-full"
          src={ImgSrc}
          alt={teacher.fullName || "Teacher"}
          width={180}
          height={180}
        />
      </div>
      <div className="h-full w-full flex flex-wrap items-end">
        <div className="text-[#161439] dark:text-white font-semibold w-[160px] text-[20px]">
          {teacher.fullName || "Teacher"}
        </div>
        <div className="text-[#5751E1] dark:text-white font-semibold w-[160px] text-[12px]">
         تعداد دوره های این استاد: {teacher.courseCounts || "0"} 
        </div>
        <div className="w-full flex gap-2">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center social-icon"
          >
            <Image src={InstagramPic} alt="Instagram" />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center social-icon"
          >
            <Image src={WhatsAppPic} alt="WhatsApp" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center social-icon"
          >
            <Image src={TwitterPic} alt="Twitter" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center social-icon"
          >
            <Image src={FacebookPic} alt="Facebook" />
          </a>
        </div>
      </div>
    </div>
  );
};
