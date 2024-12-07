import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { reserved, getCourseById } from "@/core/services/api/course";
import { DateConvert } from "@/core/services/utils/date";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";
import { deletReserve } from "@/core/services/api/userPanel";

interface Course {
  reserveId: string;
  courseName: string;
  studentName?: string;
  reserverDate: string;
  accept: boolean;
  courseId: string;
}

const Courses: React.FC = () => {
  const [courseReserved, setCourseReserved] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [coursePrices, setCoursePrices] = useState<{ [key: string]: string }>(
    {}
  );
  const navigate = useNavigate();

  const fetchReservedCourses = async () => {
    try {
      const reservedCourses = await reserved();
      console.log("Fetched reserved courses:", reservedCourses);
      const prices: { [key: string]: string } = {};

      // Fetch prices for each course
      await Promise.all(
        reservedCourses.map(async (course) => {
          const courseDetails = await getCourseById(course.courseId);
          prices[course.courseId] = courseDetails.cost; // Assuming cost is in courseDetails
        })
      );

      setCoursePrices(prices);
      setCourseReserved(reservedCourses || []);
    } catch (error) {
      console.error("Failed to fetch reserved courses or prices", error);
    }
  };

  useEffect(() => {
    fetchReservedCourses();
  }, []);

  const filteredCourses = courseReserved.filter(
    (course) =>
      course.courseName.includes(searchTerm) ||
      (course.studentName && course.studentName.includes(searchTerm))
  );

  const handleViewDetail = (courseId: string) => {
    navigate(`/CourseDetail/${courseId}`);
  };

  const handleDeleteReservation = async (reserveId: string) => {
    const data = { id: reserveId };
    try {
      const res = await deletReserve(data);
      toast.success(res.message);
      fetchReservedCourses();
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      toast.error("حذف رزرو ناموفق بود");
    }
  };

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "newest") {
      return (
        new Date(b.reserverDate).getTime() - new Date(a.reserverDate).getTime()
      );
    }
    if (sortOption === "lowest") {
      return (
        parseInt(coursePrices[a.courseId] || "0") -
        parseInt(coursePrices[b.courseId] || "0")
      );
    }
    if (sortOption === "highest") {
      return (
        parseInt(coursePrices[b.courseId] || "0") -
        parseInt(coursePrices[a.courseId] || "0")
      );
    }
    return 0;
  });

  return (
    <div className=" text-gray-800 dark:text-white p-4">
      <div className="flex border-b border-[#EBEBEB] flex-col md:flex-row justify-between items-center mb-4">
        <div className="w-[535px] h-[50px] flex items-center justify-center border border-[#D3D2DF] rounded-full">
          <input
            type="text"
            placeholder="جستجو برای دوره . ."
            className="w-[90%] outline-none h-full p-3 text-[14px] text-[#8D9DB5]  dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-11 h-11 rounded-full bg-[#5751E1] flex justify-center items-center">
            <Image className="w-6 h-6" src={SearchIcon} alt="Search" />
          </div>
        </div>
        <select
          className="bg-gray-100 rounded-full h-10 w-full md:w-44 shadow-sm dark:bg-gray-700/50 text-center mt-2 md:mt-0"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">جدید ترین</option>
          <option value="lowest">ارزان ترین</option>
          <option value="highest">گران ترین</option>
        </select>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center font-semibold text-lg">
          <div>نام دوره</div>
          <div className="hidden lg:flex">تاریخ شروع</div>
          <div className="hidden lg:flex">قیمت (تومان)</div>
          <div>وضعیت</div>
          <div>عملیات</div>
        </div>

        <div className="after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent"></div>

        <div className="max-h-[700px] min-h-[200px] h-[250px] flex flex-wrap items-start w-full gap-2 justify-center overflow-auto">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course, index) => (
              <div
                key={index}
                className={`grid  grid-cols-3 md:grid-cols-5 h-10 dark:text-white  items-center w-full rounded-md  shadow-[0_1px_2px_0] shadow-black/15 ${
                  index % 2 !== 0 ? " bg-[#F7F7F7]" : "  bg-[#C8C1ED4D]"
                }`}
              >
                <div>{course.courseName}</div>
                <div className="hidden lg:flex">
                  {DateConvert(course.reserverDate)}
                </div>
                <div className="hidden lg:flex">
                  {coursePrices[course.courseId] || "قیمت مشخص نشده"}
                </div>
                <div>
                  <span
                    className={
                      course.accept ? "text-green-500" : "text-red-500"
                    }
                  >
                    {course.accept ? "تأیید شده" : "در حال بررسی"}
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleViewDetail(course.courseId)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDeleteReservation(course.reserveId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center col-span-6">
              دوره ای وجود ندارد
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
