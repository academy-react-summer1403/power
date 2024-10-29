import React from "react";
import { formatDescription } from "@/core/services/utils/formatDescription";

interface CourseDetailsProps {
  detail: any;
}

export const Details: React.FC<CourseDetailsProps> = ({ detail  }) => {  
    return (
        <div className="w-[95%] mt-20 overflow-y-auto text-center md:text-right h-[605px] border border-[#DFDFDF] dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800">
        <div className="w-full mt-4 flex flex-wrap overflow-y-scroll justify-center text-[#6D6C80] dark:text-gray-300">
          <h1 className="w-[90%] text-2xl text-[#161439] dark:text-white"> شرح دوره </h1>
          <div className="w-[95%] mt-10">
            {formatDescription(detail.miniDescribe)}
          </div>
          <div className="w-[95%] mt-5">
            {formatDescription(detail.describe)}
          </div>
        </div>
      </div>
  );
};