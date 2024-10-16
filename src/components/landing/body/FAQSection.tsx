import Image from "next/image";
import SoalatPic from "@/assets/landing/body/div.faq__img.png";

export const FAQSection = () => {
  return (
    <div className="bg-[#F7F7F9] dark:bg-[#1a1a1a] w-full h-auto lg:h-[850px] flex flex-col-reverse flex-wrap lg:flex-none justify-center items-center gap-40">
      <Image className="w-[450px] h-[560px]" src={SoalatPic} alt="" />
      <div className="w-[550px] h-auto">
        <h2 className="bg-[#EFEEFE] dark:bg-[#2c2c2c] w-[130px] content-center text-center h-[30px] rounded-[30px] text-[#5751E1] dark:text-[#a5a5a5] font-medium">
          سولات متداول
        </h2>
        <h1 className="w-[370px] mt-3 h-[95px] text-[#161439] dark:text-[#e0e0e0] leading-[48px] text-[36px] font-semibold">
          شروع به تمرین از مربیان حرفه ای جهان
        </h1>
        <p className="w-[500px] text-[#6D6C80] dark:text-[#b0b0b0] mt-2">
          صندوق ورودی مشترک بصری Groove این کار را برای اعضای تیم آسان می کند 
          سازماندهی، اولویت بندی و.در این قسمت.
        </p>
      </div>
    </div>
  );
};
