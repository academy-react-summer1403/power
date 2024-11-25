import React from "react";
import Image from "next/image";
import Karshenas from "@/assets/landing/body/SVG (1).png";
import YadBegir from "@/assets/landing/body/SVG.png";
import Govahi from "@/assets/landing/body/SVG (2).png";
import Email from "@/assets/landing/body/SVG (3).png";
import { CardsWrapper } from "./cardsWrapper";

export const LearningJourney = () => {
  return (
    <div className="h-auto w-full bg-[#282568] dark:bg-gray-800 flex flex-wrap text-center justify-center items-center p-6">
      <div className="w-full max-w-[1440px] h-full flex flex-col justify-center items-center">
        <h2 className="bg-[#5751E1] content-center dark:bg-[#4c40c1] w-[230px] h-[30px] rounded-[30px] text-white font-medium text-center">
          {" "}
          چگونه سفر را شروع می کنیم{" "}
        </h2>
        <h1 className="font-semibold text-white text-[24px] md:text-[36px] mt-4 w-full h-12">
          {" "}
          سفر یادگیری خود را از همین امروز شروع کنید!{" "}
        </h1>
        <p className="w-full sm:w-[510px] h-auto leading-7 text-gray-400 mt-2">
          شهودی Groove اعضای maketeam صندوق ورودی را با هم به اشتراک گذاشت
          سازماندهی، اولویت بندی و.در این قسمت.
        </p>
        <div className="w-full mt-11 h-auto flex flex-wrap justify-around">
          <Card
            image={Karshenas}
            title="با کارشناسان بیاموزید"
            description="با کارشناسان بیاموزید و از تجربیات آنها بهره‌مند شوید."
          />
          <Card
            image={YadBegir}
            title="هر چیزی یاد بگیر"
            description="هر چیزی یاد بگیرید و افق‌های جدیدی را به روی خودتان باز کنید."
          />
          <Card
            image={Govahi}
            title="دریافت گواهی آنلاین"
            description="گواهی آنلاین دریافت کنید و مدارک معتبر مهارت‌های خود را تکمیل کنید."
          />
          <Card
            image={Email}
            title="بازاریابی ایمیلی"
            description="بازاریابی ایمیلی ابزاری موثر برای ارتباط با مشتریان و افزایش فروش است."
          />
        </div>
        <CardsWrapper />
      </div>
    </div>
  );
};

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => (
  <div
    className="w-full sm:w-72 lg:w-80 h-auto flex flex-col items-center justify-center mb-6 dark:bg-gray-600 rounded-lg p-4 transition-transform duration-200 hover:scale-105"
    data-aos="flip-right"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000"
  >
    <Image src={image} className="h-24 w-24 mb-4" alt={title} />
    <h1 className="w-full text-white font-semibold text-lg text-center">{title}</h1>
    <p className="text-gray-300 mt-2 text-center text-sm lg:text-base">{description}</p>
  </div>
);
