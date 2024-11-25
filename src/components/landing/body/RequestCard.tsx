import Image from "next/image";
import ArowPic from "@/assets/landing/HeroSection/arow.png";

interface RequestCardProps {
  image: string;
  title: string;
  description: string;
}

export const RequestCard: React.FC<RequestCardProps> = ({ image, title, description }) => (
  <div className="w-full max-w-[700px] h-auto bg-white dark:bg-gray-900 rounded-2xl flex flex-col sm:flex-row justify-center sm:justify-start items-center overflow-hidden p-4" data-aos="zoom-in">
    <div className="w-full sm:w-auto h-full flex items-end sm:flex-none">
      <Image className="w-full h-auto max-w-[300px] max-h-[230px]" src={image} alt={title} />
    </div>
    <div className="w-full sm:w-[385px] flex flex-wrap items-center h-[170px]">
      <h1 className="text-[155%] w-full sm:w-auto sm:text-[26px] h-[35px] font-semibold text-black dark:text-white">{title}</h1>
      <p className="text-[10px] w-full sm:text-base sm:w-[340px] h-[70px] text-start text-[#6D6C80] dark:text-gray-400">
        {description}
      </p>
      <button className="bg-[#5751E1] w-[170px] shadow-[4px_6px_0_0] shadow-[#050071] rounded-[50px] h-[50px] flex justify-center text-white gap-2 items-center dark:bg-[#4E44C9]">
        در خواست
        <Image src={ArowPic} alt="" />
      </button>
    </div>
  </div>
);
