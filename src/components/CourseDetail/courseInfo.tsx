"use client"

import React from "react"
import TwiterPic from "@/assets/media/twiter.png";
import FacebookPic from "@/assets/media/facebook.png";
import InstagramPic from "@/assets/media/instagram.png";
import WhatsappPic from "@/assets/media/whatsapp.png";
import YoutubePic from "@/assets/media/youtube.png";
import Arow from "@/assets/CourseDetail/arow.png";
import TestPic from "@/assets/CourseDetail/test.png";
import LevelPic from "@/assets/CourseDetail/level.png";
import TimePic from "@/assets/CourseDetail/time.png";
import PaymentPic from "@/assets/CourseDetail/payment.png.png";
import CertificatePic from "@/assets/CourseDetail/Certificate.png";
import lessonPic from "@/assets/CourseDetail/lesson.png";
import StudentPic from "@/assets/CourseDetail/student.png";
import Image from "next/image";
import { DateConvert } from "@/core/services/utils/date";
import { formatCostWithUnit } from "@/core/services/utils/formatCostWithUnit";

interface CourseInfoProps {
    course: any;
    AddCourseReserve: (courseId: number) => Promise<void>;
  }

export const CourseInfo: React.FC<CourseInfoProps> = ({ course, AddCourseReserve }) => {
    const duration = `${DateConvert(course.startTime)} - ${DateConvert(
        course.endTime
      )}`;
      const hasExams = false;
      const hasCertificate = true;

      const shareLink = () => {
        if (navigator.share) {
          navigator.share({
            title: `ثبت نام در دوره ${course.title}`,
            text: "به این دوره بپیوندید!",
            url: window.location.href,
          });
        }
      };

    return(
        <div className="w-full lg:w-[310px] h-[845px] flex justify-center flex-wrap bg-white dark:bg-gray-800 border border-[#DFDFDF] dark:border-gray-600 shadow-[0_0_14px_0] shadow-black rounded-xl items-center dark:text-white">
        <div className="bg-[#5751E1] h-[95px] text-white w-full lg:w-[250px] rounded-lg flex flex-wrap justify-center items-center">
          <h3 className="w-[90%]"> هزینه این دوره </h3>
          <h1 className="text-2xl w-full text-center">
            {formatCostWithUnit(course.cost)} تومان{" "}
          </h1>
        </div>
        <div className="w-[90%] h-[350px] flex flex-wrap justify-center ">
          <h3 className="font-semibold w-full"> دوره شامل: </h3>
          <div className="flex mt-4 justify-between items-center border-b border-[#D9D9D9] w-full h-[40px]">
            <p className="flex gap-1">
              {" "}
              <Image src={LevelPic} alt="" /> مرحله{" "}
            </p>
            <h5 className="text-[#7F7E97]"> {course.courseStatusName} </h5>
          </div>
          <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
            <p className="flex gap-1">
              {" "}
              <Image src={TimePic} alt="" /> مدت زمان{" "}
            </p>
            <h5 className="text-[#7F7E97] text-[12px]"> {duration} </h5>
          </div>
          <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
            <p className="flex gap-1">
              {" "}
              <Image src={lessonPic} alt="" /> درس ها{" "}
            </p>
            <h5 className="text-[#7F7E97]"> {course.techs.length} </h5>
          </div>
          <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
            <p className="flex gap-1">
              {" "}
              <Image src={TestPic} alt="" /> آزمون ها{" "}
            </p>
            <h5 className="text-[#7F7E97]">
              {" "}
              {hasExams ? "دارد" : "ندارد"}{" "}
            </h5>
          </div>
          <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
            <p className="flex gap-1">
              {" "}
              <Image src={CertificatePic} alt="" /> گواهینامه ها{" "}
            </p>
            <h5 className="text-[#7F7E97]">
              {" "}
              {hasCertificate ? "دارد" : "ندارد"}{" "}
            </h5>
          </div>
          <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
            <p className="flex gap-1">
              {" "}
              <Image src={StudentPic} alt="" /> فارغ التحصیلی{" "}
            </p>
            <h5 className="text-[#7F7E97]"> {DateConvert(course.endTime)} </h5>
          </div>
        </div>
        <div className="w-[90%] h-[100px] border-b border-[#D9D9D9] flex justify-center flex-wrap">
          <h1 className="w-full"> پرداخت امن: </h1>
          <Image className="w-[250px] h-[35px] " src={PaymentPic} alt="" />
        </div>
        <div className="w-[90%] h-[105px] border-b flex flex-wrap justify-center border-[#D9D9D9]">
          <h1 className="w-full"> این دوره را به اشتراک بگذارید: </h1>
          <div className="w-full h-auto flex gap-3">
          <a
            href={`https://www.youtube.com/share?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"  className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center social-icon">
              <Image src={YoutubePic} alt="" />
            </a>
            <a
            href={`https://instagram.com/?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer" className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center social-icon" >
              <Image src={InstagramPic} alt="" />
            </a>
            <a
            href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer" className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center social-icon">
              <Image src={WhatsappPic} alt="" />
            </a>
            <a
            href={`https://twitter.com/share?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer" className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center social-icon">
              <Image src={TwiterPic} alt="" />
            </a>
            <a
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer" className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center social-icon">
              <Image src={FacebookPic} alt="" />
            </a>
          </div>
        </div>
        <button
          onClick={() => AddCourseReserve(course.courseId)}
          className="bg-[#FFC224] text-black font-bold flex gap-2 justify-center items-center h-[55px] w-[235px] border-2 border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D] rounded-[50px]"
        >
          {" "}
          ثبت نام در دوره <Image src={Arow} alt="" />
        </button>
      </div>
    )
}