import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { reserved, getCommentById } from "@/core/services/api/course";
import { DateConvert } from "@/core/services/utils/date";

interface Course {
  id: string;
  courseName: string;
  studentName?: string;
  reserverDate: string;
  accept: boolean;
}

interface CourseComment {
  cost: number;
}

const Courses: React.FC = () => {
const [courseReserved, setCourseReserved] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [sortOption, setSortOption] = useState<string>(""); 
  const [coursePrices, setCoursePrices] = useState<{ [key: string]: string | undefined }>({}); 

  const fetchReservedCourses = async () => {
    try {
      const reservedCourses = await reserved();
      try {
        const reservedCourses = await reserved();
        console.log("Fetched reserved courses:", reservedCourses); 
        setCourseReserved(reservedCourses || []); 
      } catch (error) {
        console.error("Failed to fetch reserved courses or prices", error);
      }

      const pricesPromises = reservedCourses.map(async (course) => {
        const comments: CourseComment[] = await getCommentById(course.id);
        const formattedCost = (comments[0]?.cost / 10000).toFixed(0) || "قیمت مشخص نشده"; 
        return { id: course.id, price: formattedCost }; 
      });

      const pricesArray = await Promise.all(pricesPromises);
      const pricesObject = pricesArray.reduce<{ [key: string]: string }>((acc, { id, price }) => {
        acc[id] = price;
        return acc;
      }, {});

      setCoursePrices(pricesObject);
    } catch (error) {
      console.error("Failed to fetch reserved courses or prices", error);
    }
  };

  useEffect(() => {
    fetchReservedCourses();
  }, []);

  const filteredCourses = courseReserved.filter(course =>
    course.courseName.includes(searchTerm) ||
    (course.studentName && course.studentName.includes(searchTerm))
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.reserverDate).getTime() - new Date(a.reserverDate).getTime();
    }
    if (sortOption === "lowest") {
      return (parseInt(coursePrices[a.id] || "0") - parseInt(coursePrices[b.id] || "0"));
    }
    if (sortOption === "highest") {
      return (parseInt(coursePrices[b.id] || "0") - parseInt(coursePrices[a.id] || "0"));
    }
    return 0; 
  });

  return (
    <div className="bg-white dark:bg-[#222222] text-[#161439] dark:text-white p-4">
      <div className="h-[70px] border-b border-[#EBEBEB] flex justify-between items-center mb-4">
        <div className="w-[535px] h-[50px] flex items-center justify-center border border-[#D3D2DF] rounded-full">
          <input
            type="text"
            placeholder="جستجو برای دوره . ."
            className="w-[90%] outline-none h-full p-3 text-[14px] text-[#8D9DB5] bg-transparent dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-11 h-11 rounded-full bg-[#5751E1] flex justify-center items-center">
            <Image className="w-6 h-6" src={SearchIcon} alt="Search" />
          </div>
        </div>
        <select
          className="bg-[#FBFBFB] dark:bg-[#444] text-center h-[52px] w-[185px] rounded-full shadow-lg dark:text-white"
          name="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">جدید ترین</option>
          <option value="lowest">ارزان ترین</option>
          <option value="highest">گران ترین</option>
        </select>
      </div>
      
      <div className="mt-7 w-full h-[32px] flex flex-wrap text-[#161439] font-semibold text-[18px] ">
        <div className=" text-center w-[200px]"> نام دوره </div>
        <div className="w-[200px] text-center"> مدرس دوره </div>
        <div className="w-[130px] text-center"> تاریخ شروع </div>
        <div className="w-[200px] text-center"> قیمت (تومان) </div>
        <div className="w-[150px]"> وضعیت </div>
        <div className="w-full after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent"></div>
      </div>
      
      <div className="max-h-[280px] overflow-y-auto">
        {sortedCourses.length > 0 ? (
          sortedCourses.map((course , index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-[#EBEBEB]"
            >
              <div className="text-center w-[200px]">{course.courseName}</div>
              <div className="w-[200px] text-center">
                {course.studentName || "مدرس مشخص نشده"}
              </div>
              <div className="w-[130px] text-center">
                {DateConvert(course.reserverDate)}
              </div>
              <div className="w-[200px] text-center">
                {coursePrices[course.id] || "قیمت مشخص نشده"}
              </div>
              <div className="w-[150px] text-center">
                {course.accept ? "تأیید شده" : "در حال بررسی"}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">دوره ای وجود ندارد</div>
        )}
      </div>
    </div>
  );
};

export default Courses;