"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Loading } from "@/components/loading";
import InstagramPic from "@/assets/landing/body/Symbol.png";
import WhatsAppPic from "@/assets/landing/body/Symbol (1).png";
import TwitterPic from "@/assets/landing/body/Symbol (2).png";
import FacebookPic from "@/assets/landing/body/Symbol (3).png";
import Breadcrumb from "@/components/path";
import { GetTeacherDetail } from "@/core/services/api/teacher";
import TeacherDefualtPic from "@/assets/landing/body/Section → Link → instructor06.png.png";
import ArowPic from "@/assets/arow.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTeacherCourses } from "@/core/services/api/course";
import { CourseWrapper } from "@/components/Course/CourseWrapper";

interface TeacherDetails {
  fullName: string;
  pictureAddress?: string;
  courseCounts: number;
  teacherId: string;
}

export const TeacherDetail = () => {
  const params = useParams<{ id: string }>();
  const [detail, setDetail] = useState<TeacherDetails | null>(null);
  const [Course, setCourse] = useState([]);

  const fetchData = async () => {
    const res = await GetTeacherDetail(params.id);
    if (!res) {
      <Loading />;
    }
    setDetail(res);
  };

  const fetchTeacherCourses = async () => {
    const res = await GetTeacherCourses(params.id);
    if (!res) {
      <Loading />;
    }
    setCourse(res ? res.courseFilterDtos.slice(0, 3) : res.courseFilterDtos.slice(0, 3));
  };
  useEffect(() => {
    fetchTeacherCourses()
    fetchData();
  }, [params.id]);

  const path = [`مربیان > ${detail?.fullName || "Teacher"}`];
  const title = "توضیحات مربی";

  const ImgSrc =
    detail?.pictureAddress &&
    (detail?.pictureAddress.startsWith("/") ||
      detail?.pictureAddress.startsWith("http"))
      ? detail?.pictureAddress
      : TeacherDefualtPic;

  const determineLevel = (courseCounts: number): string => {
    if (courseCounts < 5) {
      return "مبتدی";
    } else if (courseCounts < 15) {
      return "متوسط";
    } else {
      return "پیشرفته";
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb path={path} title={title} />
      <div className="w-full gap-12 h-auto mt-32 mb-32 flex justify-center flex-wrap">
        <div
          data-aos="flip-left"
          className="w-full lg:w-[310px] items-center flex flex-wrap justify-center rounded-xl h-[575px] border border-[#DFDFDF] shadow-black/10 shadow-[0_0_14px_0]"
        >
          <h1 className="w-[90%] text-[20px] font-semibold text-[#161439]">
            {" "}
            تماس سریع{" "}
          </h1>
          <p className="w-[90%] text-[#6D6C80]">
            از طریق تماس با ما راحت باشید اگر ترجیح می دهید توییتر یا فیس بوک!
          </p>
          <input
            type="text"
            placeholder="نام"
            className=" rounded-md p-5 transition-all outline-[#5751E1] focus:text-[#282568] h-11 w-[90%]  bg-[#F4F3F8]"
          />
          <input
            type="text"
            placeholder="پست الکترونیک"
            className=" rounded-md p-5 transition-all outline-[#5751E1] focus:text-[#282568] h-11 w-[90%]  bg-[#F4F3F8]"
          />
          <input
            type="text"
            placeholder="موضوع"
            className="p-5 rounded-md transition-all outline-[#5751E1] focus:text-[#282568] h-11 w-[90%]  bg-[#F4F3F8]"
          />
          <input
            type="text"
            placeholder="تلفن"
            className="p-5 rounded-md transition-all outline-[#5751E1] focus:text-[#282568] h-11 w-[90%] bg-[#F4F3F8]"
          />
          <input
            type="text"
            className="p-5 rounded-md transition-all outline-[#5751E1] focus:text-[#282568] bg-[#F4F3F8] h-28 w-[90%]"
            placeholder="متن..."
          />
          <button className="flex justify-around items-center rounded-[50px] w-[90%] h-[50px] text-white bg-[#5751E1] shadow-[4px_6px_0_0] shadow-[#050071]">
            {" "}
            پیام فرستادن <Image
              width={13}
              height={12}
              src={ArowPic}
              alt=""
            />{" "}
          </button>
        </div>
        <div data-aos="flip-right" className="w-[1080px] h-auto flex flex-wrap">
          <div className="bg-[#282568] flex lg:flex-nowrap flex-wrap h-auto justify-around items-center w-full lg:h-[370px] rounded-xl">
            <div className="lg:w-[340px] w-full h-[300px] lg:h-full flex justify-center items-center">
              <Image
                className="w-64 h-64 rounded-full bg-white"
                width={250}
                height={250}
                src={ImgSrc}
                alt="Teacher"
              />
            </div>
            <div className="w-full flex flex-wrap items-center lg:w-[655px] h-[270px]">
              <h1 className="text-white text-[24px] lg:text-right text-center w-full font-semibold">
                {detail?.fullName}
              </h1>
              <h5
                title="نسبت به تعداد دوره"
                className="text-white w-full lg:text-right text-center font-semibold"
              >
                {detail ? determineLevel(detail.courseCounts) : "سطح نامشخص"}
              </h5>
              <p className="w-full text-center lg:text-right text-white">
                البته در اکثر سایت‌های حرفه‌ای، از چند زبان برنامه‌نویسی استفاده
                می‌شود که هر کدام وظیفه خاصی را انجام می‌دهند. زبان HTML از جمله
                پرکاربردترین زبان‌ها است، که در اکثر سایت‌ها به شکل مستقل یا
                ترکیبی با سایر زبان‌ها استفاده شده است.
              </p>
              <div className="w-full flex gap-3 justify-center lg:justify-start">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white rounded-full flex justify-center items-center social-icon"
                >
                  <Image src={InstagramPic} alt="Instagram" />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white rounded-full flex justify-center items-center social-icon"
                >
                  <Image src={WhatsAppPic} alt="WhatsApp" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white rounded-full flex justify-center items-center social-icon"
                >
                  <Image src={TwitterPic} alt="Twitter" />
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white rounded-full flex justify-center items-center social-icon"
                >
                  <Image src={FacebookPic} alt="Facebook" />
                </a>
              </div>
            </div>
          </div>
              <h1 className="w-full text-[30px] font-semibold mt-14 text-[#161439]">دوره های من</h1>
              <h6 className="w-full mt-1 mb-14 text-[#6D6C80]">سلام! این یک پیام تستی است  سلام! این یک پیام تستی است  </h6>
            <div className="w-full flex flex-wrap lg:flex-nowrap h-auto justify-between">
                    <CourseWrapper stateTopCourse={Course} />
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
