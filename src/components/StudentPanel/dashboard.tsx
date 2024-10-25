import {
  getMyCourse,
  getNewCourse,
  getProfile,
} from "@/core/services/api/userPanel";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { reserved } from "@/core/services/api/course";
import { DateConvert } from "@/core/services/utils/date";
import { useOutletContext } from "react-router-dom";
import Image from "next/image";
import BellPic from "@/assets/StudentPanel/bell.png"
import BasketPic from "@/assets/StudentPanel/basket.png"
import CoursePic from "@/assets/StudentPanel/course.png"

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { DataState } = useOutletContext();
  const [courseCount, setCourseCount] = useState<number>();
  const [profileCompletion, setProfileCompletion] = useState<number>(0);
  const [coursesReserved, setCoursesReserved] = useState<number>();
  const [newCourse, setNewCourse] = useState([]);

  const fetchCoursesCount = async () => {
    const res = await getMyCourse();
    if (res && typeof res.totalCount === "number") {
      setCourseCount(res.totalCount);
    }
  };

  const fetchCoursesReserved = async () => {
    const res = await reserved();
    if (res && Array.isArray(res)) {
      setCoursesReserved(res.length);
    }
  };

  const fetchProfileCompletion = async () => {
    if (DataState && typeof DataState.profileCompletionPercentage === "number") {
      setProfileCompletion(DataState.profileCompletionPercentage);
    }
  };

  const fetchNewCourse = async () => {
    const res = await getNewCourse();
    setNewCourse(res);
  };

  useEffect(() => {
    fetchNewCourse();
    fetchCoursesReserved();
    fetchCoursesCount();
    fetchProfileCompletion();
  }, []);

  const data = {
    labels: ["تکمیل شده", "عدم تکمیل"],
    datasets: [
      {
        data: [profileCompletion, 100 - profileCompletion],
        backgroundColor: ["#FFC224", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-wrap justify-around p-4 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
      <div className="w-[425px] mt-8 h-[105px] flex justify-center gap-11">
        <div className="w-[190px] relative h-[75px] bg-[#F9F9F9] justify-center shadow-[9px_10px_2px_0] flex flex-wrap rounded shadow-black/50">
          <div className="absolute -top-8 left-5 w-14 h-14 rounded-full bg-[#5751E1] flex justify-center items-center overflow-hidden"> <Image className=" w-10 h-10" src={CoursePic} alt="" /> </div>
          <div className="w-[90%] text-[25px] text-[#5751E1]">
            دوره {courseCount}
          </div>
          <div className="w-[90%] text-[#A7A7A7] text-[18px]">
            شرکت کرده‌اید
          </div>
        </div>
        <div className="w-[190px] relative h-[75px] bg-[#F9F9F9] justify-center shadow-[9px_10px_2px_0] flex flex-wrap rounded shadow-black/50">
          <div className="absolute -top-8 left-5 w-14 h-14 rounded-full bg-[#5751E1] flex justify-center items-center overflow-hidden"> <Image className=" w-8 h-8" src={BasketPic} alt="" /> </div>
          <div className="w-[90%] text-[25px] text-[#5751E1]">
            {" "}
            دوره{coursesReserved}
          </div>
          <div className="w-[90%] text-[#A7A7A7] text-[18px]">
            {" "}
            روزرو کرده‌اید{" "}
          </div>
        </div>
      </div>

      <div className="w-[335px] mt-8 h-[110px] flex items-center justify-center">
        <p className="mt-2 text-center text-lg">
          برای شرکت در دوره‌ها باید حداقل ۸۰٪ از پروفایل خود را تکمیل کنید.
        </p>
        <Doughnut data={data} />
      </div>
      <div className="w-full md:w-[800px] mt-8 relative flex flex-wrap justify-center items-center h-[185px] bg-[#C8C1ED66] dark:bg-[#494BFF66] rounded-xl">
        <div className="absolute -top-8 left-[5%] rounded-xl w-12 h-12 bg-[#5751E1] shadow-md flex justify-center items-center overflow-hidden"><Image src={BellPic} className="w-[22px] h-[24px]" alt="" /></div>
        <div className="w-[90%] text-[#161439] dark:text-white text-xl">
          جدید ترین اخبار و مقالات
        </div>
        <div className="w-[90%] flex flex-col text-[#A7A7A7] dark:text-[#B0B0B0] text-[14px]">
          {newCourse.length > 0 ? (
            newCourse.map((item) => (
              <div
                key={item?.courseId}
                className="mt-2 w-full text-[#161439] dark:text-white text-sm flex justify-between"
              >
                <span>{item?.title}</span>
                <span>{DateConvert(item?.lastUpdate)}</span>
              </div>
            ))
          ) : (
            <span>منتظر بمانید ...</span>
          )}
        </div>
      </div>
      <div className="w-full md:w-[750px] mt-8 flex justify-between flex-wrap">
                <div className="w-1/2">
                <h1 className="w-full text-[18px] text-[#777777] dark:text-[#B0B0B0]"> دوره های در حال برگزاری: </h1>
                </div>
                <div className="w-1/2">  
                <h1 className="w-full text-[18px] text-[#777777] dark:text-[#B0B0B0]"> دوره های پیشنهادی: </h1>
                </div>
        </div>
    </div>
  );
};

export default Dashboard;
