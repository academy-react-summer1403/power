import Image from "next/image";
import ArowPic from "@/assets/landing/HeroSection/arow.png";

export const RequestCard = ({ image, title, description }) => (
  <div className="w-[700px] h-[260px] bg-white rounded-2xl flex justify-center sm:justify-normal items-center overflow-hidden">
    <div className="w-auto h-full hidden items-end sm:flex">
      <Image className="w-[300px] h-[230px]" src={image} alt={title} />
    </div>
    <div className="w-full sm:w-[385px] flex flex-wrap items-center h-[170px]">
      <h1 className="text-[155%] w-full sm:w-auto sm:text-[26px] h-[35px] font-semibold">{title}</h1>
      <p className="text-[10px] w-full sm:text-base sm:w-[340px] h-[70px] text-start text-[#6D6C80]">
        {description}
      </p>
      <button className="bg-[#5751E1] w-[170px] shadow-[4px_6px_0_0] shadow-[#050071] rounded-[50px] h-[50px] flex justify-center text-white gap-2 items-center">
        در خواست
        <Image src={ArowPic} alt="" />
      </button>
    </div>
  </div>
);
