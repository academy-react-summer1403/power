import Image from "next/image";
import DatePic from "@/assets/NewsDetail/date.png";
import DefaultPic from "@/assets/NewsDetail/blog_details.jpg.png";
import { DateConvert } from "@/core/services/utils/date";
import React from "react";

interface NewsProp {
    newsList : News[];
}

export const NewsRelated: React.FC<NewsProp> = ({ newsList }) => {
  return (
    <div className="w-[315px] flex flex-wrap justify-center items-center mt-32 h-[465px] bg-[#F7F7F9] dark:bg-gray-700 rounded-xl">
      <h1 className="w-[90%] text-gray-800 dark:text-gray-200">اخبار های مرتبط</h1>
      <div className="w-[90%] h-[85%] flex flex-wrap gap-4">
        {newsList.map((item, index) => {
          return (
            <div key={index} className="w-full h-[75px] flex items-center justify-center gap-4">
              <Image className="rounded-md" width={74} height={74} src={item.currentImageAddressTumb || DefaultPic} alt="" />
              <div className="w-[75%] h-full flex items-center flex-wrap">
                <p className="text-[#7F7E97] dark:text-gray-400 w-full flex items-center gap-2">
                  <Image className="w-4 h-4" src={DatePic} alt="Date" /> {DateConvert(item.insertDate)}
                </p>
                <h1 className="w-full h-[80%] overflow-y-auto content-center text-black dark:text-white">{item.title}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
