import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { DateConvert } from "@/core/services/utils/date";
import { GetJobs } from "@/core/services/api/userPanel";
import { useNavigate } from "react-router-dom";

interface JObProp {
  jobTitle: string;
  aboutJob: string;
  companyName?: string;
  inWork: boolean;
  workStartDate: Date;
  workEndDate: Date;
  id: string
}

const Jobs: React.FC = () => {
  const [Jobs, setJobs] = useState<JObProp[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const UserJobs = await GetJobs();

      setJobs(UserJobs.jobLists || []);
    } catch (error) {
      console.error("Failed to fetch User JOb", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const combinedJobs = [
    ...Jobs.map((Job) => ({
      ...Job,
      identifier: Job.id,
      displayTitle: Job.jobTitle,
      companyName: Job.companyName,
      aboutJob: Job.aboutJob,
      workStartDate: Job.workStartDate,
      workEndDate: Job.workEndDate,
    })), 
  ];

  const filteredJobs = combinedJobs.filter((Job) =>
    Job.displayTitle.includes(searchTerm)
  );




  return (
    <div className="bg-white dark:bg-[#222222] text-[#161439] dark:text-white p-4">
      <div className="h-[70px] border-b border-[#EBEBEB] flex justify-between items-center mb-4">
        <div className="w-[535px] h-[50px] flex items-center justify-center border border-[#D3D2DF] rounded-full">
          <input
            type="text"
            placeholder="جستجو برای کار . ."
            className="w-[90%] outline-none h-full p-3 text-[14px] text-[#8D9DB5] dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-11 h-11 rounded-full bg-[#5751E1] flex justify-center items-center">
            <Image className="w-6 h-6" src={SearchIcon} alt="Search" />
          </div>
        </div>
      </div>

      <div className="mt-7 w-full h-[32px] flex justify-between flex-wrap text-[#161439] dark:text-white font-semibold text-[18px] ">
        <div className="w-[200px] text-center">عنوان</div>
        <div className="w-[150px] text-center hidden lg:flex">درباره کار</div>
        <div className="w-[200px] text-center hidden lg:flex">اسم کومپانی</div>
        <div className="w-[130px] text-center hidden lg:flex">تاریخ شروع</div>
        <div className="w-[150px] text-center hidden lg:flex">تاریخ پایان</div>
        <div className="w-[150px] text-center">فعال بودن</div>
      </div>

      <div className="after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent"></div>

      <div className="max-h-[700px] min-h-[200px] h-[250px] flex flex-wrap justify-center gap-2 overflow-y-auto">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className={`flex justify-between w-full items-center dark:text-white rounded-md h-10  dark:border-[#444]${
                index % 2 !== 0 ? " bg-[#F7F7F7]" : "  bg-[#C8C1ED4D]"
              }`}
            >
              <div className="text-center w-[200px]">
                {job.displayTitle}
              </div>
              <div className="w-[200px] text-center hidden lg:flex">
                {job.aboutJob}
              </div>
              <div className="w-[200px] text-center hidden lg:flex">
                {job.companyName}
              </div>
              <div className="w-[130px] text-center hidden lg:flex">
                {DateConvert( job.workStartDate)}
              </div>
              <div className="w-[150px] text-center hidden lg:flex">
                {DateConvert( job.workEndDate)}
              </div>
              <div className="w-[150px] text-center flex ">
                {job.inWork? "فعال" : "غیر فعال"}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">هیچ موردی وجود ندارد</div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
