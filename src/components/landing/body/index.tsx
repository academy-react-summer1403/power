"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeroSectionBack from "@/assets/landing/HeroSection/heroSectionBack.png";
import Vector from "@/assets/landing/Vector.png";
import ArowPic from "@/assets/landing/HeroSection/arow.png";
import HeroSectionPic from "@/assets/landing/HeroSection/div.col-lg-6-2.png";
import AboutUsPic from "@/assets/landing/body/Section → about_img.png.png";
import BackPic from "@/assets/landing/body/713742647f10dcb14454ca157e835864.png";
import SectionPic from "@/assets/landing/body/Untitled-1.png";
import Karshenas from "@/assets/landing/body/SVG (1).png";
import YadBegir from "@/assets/landing/body/SVG.png";
import Govahi from "@/assets/landing/body/SVG (2).png";
import Email from "@/assets/landing/body/SVG (3).png";
import DanshghoShavid from "@/assets/landing/body/Untitled-2.png";
import MorabiShavid from "@/assets/landing/body/Untitled-1(1).png";
import  SoalatPic from "@/assets/landing/body/div.faq__img.png";
import {
  GetLandingApi,
  GetNewsForLanding,
  GetTopCoursesApi,
} from "@/core/services/api/landing";
import { CourseWrapper } from "./TopCourse/CourseWrapper";
import { NewsWrapper } from "./News/NewsWrapper";

export const Body = () => {
  const [LandingApi, setLandingApi] = useState([]);
  const [topCourseState, setTopCourseState] = useState([]);
  const [newsList, setNewsList] = useState([]);

  // GetLandingReportApi
  useEffect(() => {
    const fetchNews = async () => {
      const result = await GetNewsForLanding();
      setNewsList(result);
    };

    const fetchTopCourseData = async () => {
      const result = await GetTopCoursesApi();
      setTopCourseState(result);
    };

    const fetchData = async () => {
      const result = await GetLandingApi();
      setLandingApi(result);
    };

    fetchNews();
    fetchTopCourseData();
    fetchData();
  }, []);

  return (
    <>
      <div
        className="h-auto lg:h-[520px] w-full flex-wrap lg:flex-nowrap bg-cover bg-center flex items-end justify-center"
        style={{ backgroundImage: `url(${HeroSectionBack.src})` }}
      >
        <div className=" w-auto h-full flex justify-center items-center">
          <div className="h-[433.5px] w-[600px] flex justify-right flex-wrap items-center">
            <div className="text-[40px] w-[490px] justify-center leading-[60px] font-semibold text-center flex flex-wrap ">
              هرگز از{" "}
              <div
                className=" w-[215px] h-14 text-[#FFFFFF] font-bold m-1"
                style={{
                  backgroundImage: ` url(${Vector.src})`,
                  backgroundSize: "cover",
                }}
              >
                {" "}
                یادگیری{" "}
              </div>{" "}
              دست نکشید زندگی هرگز از آموزش دست نمی کشد
            </div>
            <div className=" text-[#6D6C80] font-normal leading-7 w-[490px]">
              هر سفر آموزشی و یادگیری دنبال کردن منحصر به فرد است ما به شما کمک
              خواهیم کرد
            </div>
            <button className=" w-[215px] h-12 bg-[#5751E1] text-white rounded-[50px] shadow-[4px_6px_0px] shadow-[#050071] flex justify-around items-center ">
              {" "}
              رایگان ازمایش کنید <Image src={ArowPic} alt="" />
            </button>
          </div>
        </div>
        <div
          className="h-[450px] w-[720px] flex-wrap lg:flex-nowrap bg-cover bg-center flex justify-center"
          style={{
            backgroundImage: `url(${HeroSectionPic.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="w-full mt-32 h-auto flex flex-wrap justify-center">
        <div className=" w-[80%] flex flex-wrap justify-center lg:w-[1440px] h-[485.58px]">
          <div className="w-[187.5px] h-[30px] bg-[#EFEEFE] rounded-[30px] text-center text-[#5751E1] font-medium">
            دسته یندی های پر طرف دار
          </div>
          <h1 className=" w-full text-center h-[45px] font-semibold text-[36px] text-[#161439]">
            دسته بندی های پر طرف دار
          </h1>
          <p className="w-[437px] text-[#6D6C80] h-[55px]">
            امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است
          </p>
          <div className=" w-[1410px] h-[315px] rounded-[500px]  bg-[#F7F7F9] "></div>
        </div>
        <div className="mt-32 w-full h-auto flex justify-center items-center gap-16">
          <div className=" w-[520px] h-[470px]  ">
            {" "}
            <Image src={AboutUsPic} alt="AboutUsPic" />{" "}
          </div>
          <div className=" h-auto flex flex-wrap items-center w-[515px]">
            <div className="h-8 w-44 bg-[#EFEEFE] rounded-[30px] text-[#5751E1] text-center font-medium content-center">
              {" "}
              درباره ما بیشتر بدانید{" "}
            </div>
            <div className="h-[100px] font-semibold text-[#161439] leading-[48px] text-4xl w-[350px] flex flex-wrap gap-5 mt-4">
              هزاران{" "}
              <div
                className=" font-bold w-[180px] text-center content-center text-[#FFFFFF] h-[60px]"
                style={{
                  backgroundImage: `url(${Vector.src})`,
                  backgroundSize: "cover",
                }}
              >
                {" "}
                دوره های{" "}
              </div>{" "}
              برتر اکنون در این مکان
            </div>
            <div className=" w-[515px] h-[85px] mt-8 leading-7 text-[#6D6C80] ">
              صندوق ورودی مشترک بصری Groove این کار را برای اعضای تیم آسان می
              کند سازماندهی، اولویت بندی و. در این قسمت از Smashing Pod ما هستیم
              صحبت در مورد پایه پلتفرم وب.
            </div>
            <div className="mt-6 w-full h-auto">
              <div className="w-full flex gap-3">
                <div
                  dir="ltr"
                  className="w-8 h-8 rounded-full text-center content-center bg-[#FFC224] border text-[#161439] border-[#282568] shadow-[4px_3px_0_0] shadow-[#00000040]"
                >
                  {" "}
                  &lt;{" "}
                </div>
                <p className=" font-semibold text-[#161439] text-[18px]">
                  {" "}
                  بهترین مربیان{" "}
                </p>
              </div>
              <div className="w-full mt-4 flex gap-3">
                <div
                  dir="ltr"
                  className="w-8 h-8 rounded-full text-center content-center bg-[#FFC224] border text-[#161439] border-[#282568] shadow-[4px_3px_0_0] shadow-[#00000040]"
                >
                  {" "}
                  &lt;{" "}
                </div>
                <p className=" font-semibold text-[#161439] text-[18px]">
                  {" "}
                  از هر کجا به کلاس خود دسترسی داشته باشید
                </p>
              </div>
              <div className="w-full mt-4 flex gap-3">
                <div
                  dir="ltr"
                  className="w-8 h-8 rounded-full text-center content-center bg-[#FFC224] border text-[#161439] border-[#282568] shadow-[4px_3px_0_0] shadow-[#00000040]"
                >
                  {" "}
                  &lt;{" "}
                </div>
                <p className=" font-semibold text-[#161439] text-[18px]">
                  {" "}
                  برنامه دوره ای انعطاف پذیر
                </p>
              </div>
            </div>
            <button className=" mt-5 bg-[#5751E1] rounded-[50px] w-56 h-11 shadow-[4px_6px_0_0] shadow-[#050071] text-[#FFFFFF] flex items-center justify-around">
              {" "}
              رایگان آزمایش کنید <Image src={ArowPic} alt="" />{" "}
            </button>
          </div>
        </div>
        <div
          className="mt-32 w-full h-[1024px] flex justify-center items-center"
          style={{ backgroundImage: `url(${HeroSectionBack.src})` }}
        >
          <div className="w-[1440px] h-[750px] flex flex-wrap justify-center ">
            <div className="w-[720px] h-[215px] flex flex-wrap justify-center">
              <p className=" text-base w-[175px] h-[35px] rounded-[30px] bg-[#EFEEFE] text-[#5751E1] text-center font-medium content-center">
                {" "}
                دوره ها کلاس برتر{" "}
              </p>
              <div className="text-[#161439] text-4xl font-semibold tracking-tight">
                {" "}
                بهترین دوره های آموزشی جهان ما را کاوش کنید{" "}
              </div>
              <p className="text-[#6D6C80]">
                {" "}
                امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است{" "}
              </p>
            </div>
            <div className="w-auto h-auto flex items-center">
              {" "}
              <button className=" rotate-180 w-16 h-16 bg-[#5751E1] border border-black shadow-[3.6px_2.4px_0_0] shadow-[#23232B] rounded-[30px] flex justify-center items-center">
                <Image src={ArowPic} alt="" />{" "}
              </button>
              <div className="w-[1200px] 2xl:w-[1460px] h-[485px] flex justify-center  gap-4">
                <CourseWrapper stateTopCourse={topCourseState} />
              </div>
              <button className="w-16 h-16 bg-[#5751E1] border border-black shadow-[3.6px_2.4px_0_0] shadow-[#23232B] rounded-[30px] flex justify-center items-center">
                <Image src={ArowPic} alt="" />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[321px] relative overflow-hidden w-full bg-[#5751E1] flex items-center gap-8">
        <Image
          dir="ltr"
          className=" absolute top-0 left-[15%] z-0"
          src={BackPic}
          alt=""
        />
        <div className="w-[430px] h-full">
          <Image src={SectionPic} alt="SectionPic" className="w-full h-full" />
        </div>
        <div className="w-[765px]  flex flex-wrap h-[146.5px]">
          <h1 className=" relative z-10 w-[540px] h-[85px]  text-[#FFFFFF] text-4xl leading-[43.2px]">
            {" "}
            می خواهید از دوره های جدید در جریان باشید؟{" "}
          </h1>
          <div className=" relative z-10 w-full h-auto flex items-center gap-2">
            <input
              type="text"
              className=" mt-6 w-[535px] h-16 border border-[#433EC2] outline-none p-5 bg-[#4A44D1] rounded-[50px] text-[#9E9BF1] leading-5"
              placeholder="ایمیل خود را تایپ کنید"
            />
            <button className=" font-semibold w-[220px] h-[60px] rounded-[50px] border bg-[#FFC224] border-[#141109] text-center content-center shadow-[4px_6px_0_0] shadow-[#3D3D3D]">
              {" "}
              اکنون مشترک شوید{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="h-[1105px] w-full flex justify-center items-center">
        <div className="w-[1410px] flex items-center h-[270px] rounded-[40px] bg-[#282568] shadow-[0_25px_70px_0] shadow-[#28256866] ">
          <div className=" border-l-2 border-white/50 h-[90%] w-1/4 flex flex-col items-center justify-center">
            {" "}
            <div className="text-white text-[56px] font-bold">
              {LandingApi?.newsCount ?? 0}
            </div>
            <div className="text-white text-[18px]">جایزه به دست آمده</div>
          </div>
          <div className=" border-l-2 border-white/50 h-[90%] w-1/4 flex flex-col items-center justify-center">
            {" "}
            <div className="text-white text-[56px] font-bold">
              {LandingApi?.teacherCount ?? 0}
            </div>
            <div className="text-white text-[18px]">بهترین اساتید</div>
          </div>
          <div className=" border-l-2 border-white/50 h-[90%] w-1/4 flex flex-col items-center justify-center ">
            {" "}
            <div className="text-white text-[56px] font-bold">
              {LandingApi?.courseCount ?? 0}
            </div>
            <div className="text-white text-[18px]">دروس دانشکده</div>
          </div>
          <div className=" h-[90%] w-1/4 flex flex-col items-center justify-center">
            <div className="text-white text-[56px] font-bold">
              {LandingApi?.studentCount ?? 0}
            </div>
            <div className="text-white text-[18px]">دانشجویان فعال</div>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F9] w-full h-[850px] flex justify-center items-center gap-40">
                  <Image className="w-[450px] h-[560px]" src={SoalatPic} alt="" />
                  <div className="w-[550px] h-auto ">
                          <h2 className="bg-[#EFEEFE] w-[130px] content-center text-center h-[30px] rounded-[30px] text-[#5751E1] font-medium"> سولات متداول </h2>
                          <h1 className="w-[370px] mt-3 h-[95px] text-[#161439] leading-[48px] text-[36px] font-semibold"> شروع به تمرین از مربیان حرفه ای جهان </h1>
                          <p className="w-[500px] text-[#6D6C80] mt-2">صندوق ورودی مشترک بصری Groove این کار را برای اعضای تیم آسان می کند
                          سازماندهی، اولویت بندی و.در این قسمت.</p>
                  </div>

      </div>
      <div className=" h-[1050px] w-full bg-[#282568] flex flex-wrap text-center justify-center items-center">
        <div className="w-[1440px] h-[445px] flex justify-center items-center flex-wrap">
          <h2 className="bg-[#5751E1] w-[230px] h-[30px] rounded-[30px] text-white font-medium text-center content-center">
            {" "}
            چگونه سفر را شروع می کنیم{" "}
          </h2>
          <h1 className="font-semibold text-white text-[36px] w-full h-12">
            {" "}
            سفر یادگیری خود را از همین امروز شروع کنید!{" "}
          </h1>
          <p className="w-[510px] h-[55px] leading-7 text-[#ACAACC]">
            شهودی Groove اعضای maketeam صندوق ورودی را با هم به اشتراک گذاشت
            سازماندهی، اولویت بندی و.در این قسمت.
          </p>
          <div className="w-full mt-11 h-auto flex justify-around">
            <div className="w-[275px] h-auto flex flex-wrap justify-center">
              <Image src={Karshenas} className="h-24 w-24" alt="" />
              <h1 className="w-full text-white font-semibold mt-6">
                با کارشناسان بیاموزید
              </h1>
              <p className="text-[#ACAACC] mt-4">
                با کارشناسان بیاموزید و از تجربیات آنها بهره‌مند شوید.
              </p>
            </div>
            <div className="w-[275px] h-auto flex flex-wrap justify-center">
              <Image src={YadBegir} className="h-24 w-24" alt="" />
              <h1 className="w-full text-white font-semibold mt-6">
                هر چیزی یاد بگیر
              </h1>
              <p className="text-[#ACAACC] mt-4">
                هر چیزی یاد بگیرید و افق‌های جدیدی را به روی خودتان باز کنید.
              </p>
            </div>
            <div className="w-[275px] h-auto flex flex-wrap justify-center">
              <Image src={Govahi} className="h-24 w-24" alt="" />
              <h1 className="w-full text-white font-semibold mt-6">
                دریافت گواهی آنلاین
              </h1>
              <p className="text-[#ACAACC] mt-4">
                گواهی آنلاین دریافت کنید و مدارک معتبر مهارت‌های خود را تکمیل
                کنید.
              </p>
            </div>
            <div className="w-[275px] h-auto flex flex-wrap justify-center">
              <Image src={Email} className="h-24 w-24" alt="" />
              <h1 className="w-full text-white font-semibold mt-6">
                بازاریابی ایمیلی
              </h1>
              <p className="text-[#ACAACC] mt-4">
                بازاریابی ایمیلی ابزاری موثر برای ارتباط با مشتریان و افزایش
                فروش است.
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full h-[450px] flex items-center justify-center gap-8">
          <div className="w-[700px] h-[260px] bg-white rounded-2xl flex items-center overflow-hidden">
            <div className="w-auto h-full flex items-end">
              <Image
                className="w-[300px] h-[230px]"
                src={MorabiShavid}
                alt=""
              />
            </div>
            <div className="w-[385px] flex flex-wrap items-center h-[170px]">
              <h1 className="text-[26px] h-[35px] font-semibold">مربی شوید</h1>
              <p className="w-[340px] h-[70px] text-start text-[#6D6C80]">
                برای مثال بی اهمیت، کدام یک از ما متعهد می شویم ورزش بدنی بله
                این اتفاق در اینجا می افتد.
              </p>
              <button className="bg-[#5751E1] w-[170px] shadow-[4px_6px_0_0] shadow-[#050071] rounded-[50px] h-[50px] flex justify-center text-white gap-2 items-center">
                {" "}
                در خواست
                <Image src={ArowPic} alt="" />
              </button>
            </div>
          </div>
          <div className="w-[700px] h-[260px] bg-white rounded-2xl flex items-center overflow-hidden">
            <div className="w-auto h-full flex items-end">
              <Image
                className="w-[300px] h-[230px]"
                src={DanshghoShavid}
                alt=""
              />
            </div>
            <div className="w-[385px] flex flex-wrap items-center h-[170px]">
              <h1 className="text-[26px] h-[35px] font-semibold">مربی شوید</h1>
              <p className="w-[340px] h-[70px] text-start text-[#6D6C80]">
                به میلیون ها نفر از سراسر جهان بپیوندید با هم یاد می گیرند
                یادگیری آنلاین.
              </p>
              <button className="bg-[#5751E1] w-[170px] shadow-[4px_6px_0_0] shadow-[#050071] rounded-[50px] h-[50px] flex justify-center text-white gap-2 items-center">
                {" "}
                در خواست
                <Image src={ArowPic} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="  h-[840px] w-full bg-[#F7F7F9] flex flex-wrap justify-center items-center">
        <h2 className="w-[135px] h-[30px] bg-[#EFEEFE] rounded-[30px] text-[#5751E1] text-center content-center font-medium">
          {" "}
          اخبار و وبلاگ ها{" "}
        </h2>
        <h1 className="text-[#161439] text-[36px] font-semibold w-full h-11 text-center content-center ">
          {" "}
          اخرین اخبار ما{" "}
        </h1>
        <div className="">
          <NewsWrapper newsList={newsList} />
        </div>
      </div>
    </>
  );
};
