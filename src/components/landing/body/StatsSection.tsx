import Image from "next/image";
import ArowPic from "@/assets/arow.png";
import TeacherDefualtPic from "@/assets/landing/body/Section → Link → instructor06.png.png";
import InstagramPic from "@/assets/landing/body/Symbol.png";
import WhatsAppPic from "@/assets/landing/body/Symbol (1).png";
import TwitterPic from "@/assets/landing/body/Symbol (2).png";
import FacebookPic from "@/assets/landing/body/Symbol (3).png";

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

export const StatsSection: React.FC<StatsSectionProps> = ({ landingApi, teacherList }) => {
  return (
    <div className=" h-auto min-h-[1105px] w-full flex flex-wrap justify-center items-center">
      <div className=" h-auto lg:h-[425px] w-full flex flex-wrap lg:flex-none">
        <div className="w-[450px] min-h-[425px] lg:h-full flex flex-wrap justify-center items-center">
          <div className="w-[160px] h-[30px] bg-[#EFEEFE] dark:bg-[#5751E1] rounded-[30px] text-[#5751E1] dark:text-white text-center content-center font-medium">
            معلم های ماهر
          </div>
          <h1 className="font-semibold w-[350px] text-4xl text-[#161439] dark:text-white">
            کلاس برتر ما و مربیان خبره در یک مکان
          </h1>
          <p className="w-[320px] text-[#6D6C80] dark:text-gray-300">
            هنگامی که یک چاپگر ناشناس یک گالری از نوع و کتاب نمونه درهم درست شده باقی نمانده است فقط پنج قرن
          </p>
          <button className="bg-[#5751E1] dark:bg-[#6D6C80] flex justify-around text-white w-[230px] h-12 items-center rounded-[50px] shadow-[4px_6px_0_0] shadow-[#050071]">
            همه مربیان را ببینید
            <Image src={ArowPic} alt="" width={24} height={24} />
          </button>
        </div>
        <div className="w-[850px] h-full flex flex-wrap gap-14">
          {teacherList ? (
            teacherList.slice(0, 4).map((item, index) => {
              return (
                <div className="w-[390px] h-[185px] items-center flex justify-center gap-6" key={index}>
                  <div className="w-[180px] h-[120px] flex justify-center items-center overflow-hidden rounded-full bg-gradient-to-r from-[#F7F6F9] to-[#E9F5F5]">
                    {/* <Image
                      className="rounded-full"
                      src={item.pictureAddress || TeacherDefualtPic}
                      alt={item.fullName}
                      width={180}
                      height={180}
                    /> */}
                  </div>
                  <div className="h-full w-full flex flex-wrap items-end">
                    <div className="text-[#161439] dark:text-white font-semibold w-[160px] text-[20px]">
                      {item.fullName}
                    </div>
                    <div className="w-full flex gap-2">
                      <button className="border w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center">
                        <Image src={InstagramPic} alt="Instagram" />
                      </button>
                      <button className="border w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center">
                        <Image src={WhatsAppPic} alt="WhatsApp" />
                      </button>
                      <button className="border w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center">
                        <Image src={TwitterPic} alt="Twitter" />
                      </button>
                      <button className="border w-9 h-9 border-[#9292B4] dark:border-gray-600 rounded-full flex justify-center items-center">
                        <Image src={FacebookPic} alt="Facebook" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>منتظر بمانبد</div>
          )}
        </div>
      </div>
      <div className=" w-[90%] mt-20 mb-20 lg:w-[1410px] flex items-center h-auto lg:h-[270px] rounded-[40px] bg-[#282568] dark:bg-[#1F1F31] overflow-hidden shadow-[0_25px_70px_0] shadow-[#28256866]">
        <StatItem label="وبلاگ ها" count={landingApi?.newsCount ?? 0} />
        <StatItem label="بهترین اساتید" count={landingApi?.teacherCount ?? 0} />
        <StatItem label="دروس دانشکده" count={landingApi?.courseCount ?? 0} />
        <StatItem label="دانشجویان فعال" count={landingApi?.studentCount ?? 0} />
      </div>
    </div>
  );
};

const StatItem: React.FC<{ label: string; count: number }> = ({ label, count }) => (
  <div className="border-l-2 border-white/50 h-[90%] w-1/4 flex flex-col items-center justify-center">
    <div className="text-white text-[56px] font-bold">{count}</div>
    <div className="text-white text-[18px]">{label}</div>
  </div>
);
