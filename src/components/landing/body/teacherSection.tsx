import Image from "next/image";
import ArowPic from "@/assets/arow.png";
import TeacherDefualtPic from "@/assets/landing/body/Section → Link → instructor06.png.png";
import InstagramPic from "@/assets/landing/body/Symbol.png";
import WhatsAppPic from "@/assets/landing/body/Symbol (1).png";
import TwitterPic from "@/assets/landing/body/Symbol (2).png";
import FacebookPic from "@/assets/landing/body/Symbol (3).png";
import CountUp from "react-countup";
import { TeacherCard } from "@/components/teacher";
import { Link } from "react-router-dom";

interface Teacher {
  fullName: string;
  pictureAddress?: string;
}

interface LandingApi {
  newsCount: number;
  teacherCount: number;
  courseCount: number;
  studentCount: number;
}

interface StatsSectionProps {
  landingApi: LandingApi;
  teacherList: Teacher[];
}

export const TeacherSection: React.FC<StatsSectionProps> = ({
  landingApi,
  teacherList,
}) => {
  return (
    <div className=" h-auto min-h-[1105px] w-full flex flex-wrap justify-center items-center">
      <div className=" h-auto mb-24 lg:h-[425px] w-full flex flex-wrap lg:flex-none">
        <div
          className="w-[450px] h-auto lg:h-full flex flex-wrap justify-center items-center"
          data-aos="fade-up-left"
        >
          <div className="w-[160px] h-auto lg:h-[30px] bg-[#EFEEFE] dark:bg-[#5751E1] rounded-[30px] text-[#5751E1] dark:text-white text-center content-center font-medium">
            معلم های ماهر
          </div>
          <h1 className="font-semibold w-[350px] text-4xl text-[#161439] dark:text-white">
            کلاس برتر ما و مربیان خبره در یک مکان
          </h1>
          <p className="w-[320px] text-[#6D6C80] dark:text-gray-300">
            هنگامی که یک چاپگر ناشناس یک گالری از نوع و کتاب نمونه درهم درست شده
            باقی نمانده است فقط پنج قرن
          </p>
          <Link
            to="/TeacherList"
            className="bg-[#5751E1] dark:bg-[#6D6C80] flex justify-around text-white w-[230px] h-12 items-center rounded-[50px] shadow-[4px_6px_0_0] shadow-[#050071]"
          >
            همه مربیان را ببینید
            <Image src={ArowPic} alt="" width={24} height={24} />
          </Link>
        </div>
        <div className="w-full lg:w-[850px] h-auto lg:h-full flex flex-wrap gap-14">
          {teacherList ? (
            teacherList
              .slice(0, 4)
              .map((item, index) => <TeacherCard teacher={item} key={index} />)
          ) : (
            <div>منتظر بمانبد</div>
          )}
        </div>
      </div>
      <div className=" w-[90%] mt-20 mb-20 lg:w-[1410px] flex lg:flex-nowrap flex-wrap items-center h-auto lg:h-[270px] rounded-[40px] bg-[#282568] dark:bg-[#1F1F31] overflow-hidden shadow-[0_25px_70px_0] shadow-[#28256866]">
        <StatItem label="وبلاگ ها" count={landingApi?.newsCount ?? 0} />
        <StatItem label="بهترین اساتید" count={landingApi?.teacherCount ?? 0} />
        <StatItem label="دروس دانشکده" count={landingApi?.courseCount ?? 0} />
        <StatItem
          label="دانشجویان فعال"
          count={landingApi?.studentCount ?? 0}
        />
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; count: number }> = ({
  label,
  count,
}) => (
  <div className=" border-t-2 lg:border-t-0 lg:border-l-2 border-white/50 h-[90%] w-full lg:w-1/4 flex flex-col items-center justify-center">
    <div className="text-white text-[56px] font-bold" data-aos="zoom-out">
      <CountUp end={count} duration={30} />
    </div>
    <div className="text-white text-[18px]">{label}</div>
  </div>
);
