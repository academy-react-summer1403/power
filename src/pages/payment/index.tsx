"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import ArowPic from "@/assets/arow.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GetPayCourse } from "@/core/services/api/course";
import Pagination from "@/components/Course/Pagination";
import { PayCourseWrapper } from "@/components/Course/Payment/payCourseWrapper";
import { getMyCourse } from "@/core/services/api/userPanel";
import { formatCostWithUnit } from "@/core/services/utils/formatCostWithUnit";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

type Filter = {
  search: string;
  PageNumber: number;
  paymentStatus: string; 
};

export const Payment = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noFilterTotalCount, setNoFilterTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const [filter, setFilter] = useState<Filter>({
    search: "",
    PageNumber: 1,
    paymentStatus: "پرداخت نشده", 
  });

  const title = "سبد خرید";
  const path = ["سبد خرید"];

  const fetchCourses = async () => {
    const { listOfMyCourses, totalCount } = await GetPayCourse(
      filter.search,
      currentPage
    );
    setCourses(listOfMyCourses || []);
    setTotalCount(totalCount || 0);

    const unpaidCourses = listOfMyCourses?.filter(
      (course: any) => course.paymentStatus === "پرداخت نشده"
    );

    let priceSum = 0;
    unpaidCourses?.forEach((course: any) => {
      priceSum += Number(course.cost) || 0;
    });
    setTotalPrice(priceSum);
  };

  const handlePayment = () => {
    const unpaidCourses = courses.filter(
      (course: any) => course.paymentStatus === "پرداخت نشده"
    );
  
    const courseIds = unpaidCourses.map((course: any) => course.courseId).join(",");
  
    console.log(courseIds);
  
    const queryString = new URLSearchParams({
      totalPrice: totalPrice.toString(),
      courses: JSON.stringify(unpaidCourses),
      courseId: courseIds, 
      paymentId: Math.random().toString().slice(2, 18),
    }).toString();
  
    navigate(`/invoice?${queryString}`);
  };
  

  const fetchNoFilterCourses = async () => {
    const res = await getMyCourse();
    setNoFilterTotalCount(res.totalCount || 0);
  };

  useEffect(() => {
    fetchNoFilterCourses();
    fetchCourses();
  }, [filter, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter({ ...filter, paymentStatus: e.target.value });
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortOption === "newest") {
      return (
        new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      );
    }
    if (sortOption === "lowest") {
      return (a.cost || 0) - (b.cost || 0);
    }
    if (sortOption === "highest") {
      return (b.cost || 0) - (a.cost || 0);
    }
    return 0;
  });

  const filteredCourses = sortedCourses.filter(
    (course) => course.paymentStatus === filter.paymentStatus
  );

  return (
    <>
      <Header />
      <Breadcrumb title={title} path={path} />
      <div className="w-full h-auto flex justify-center">
        <div className="w-[90%] h-auto mt-32 flex justify-between flex-wrap lg:flex-nowrap">
          <div className="h-[535px] w-[90%] lg:w-[315px] flex flex-wrap justify-center">
            <input
              type="text"
              name="search"
              placeholder="جستجوی دوره"
              value={filter.search}
              onChange={handleFilterChange}
              className="p-2 border w-full h-[50px] rounded bg-[#F7F7F9] dark:bg-gray-700 outline-none dark:border-gray-600 dark:text-white"
            />
            <div className="h-[452px] items-center w-full bg-white rounded-xl dark:bg-gray-600 border flex justify-center flex-wrap border-[#DFDFDF] shadow-black/10 shadow-[0_0_14px_0]">
              <div className="w-[90%] flex flex-wrap justify-center items-center text-white h-[100px] rounded-lg bg-[#5751E1] shadow-[#0D096342] shadow-[0_3px_15px_0]">
                <h3 className="w-[90%]"> جمع کل :</h3>
                <h1 className="text-2xl w-full text-center">
                  {formatCostWithUnit(totalPrice)} تومان
                </h1>
              </div>
              <div className="h-[80px] w-full items-center flex justify-center flex-wrap">
                <div className="w-[90%] font-semibold text-[#161439]">
                  اطلاعات:
                </div>
                <div className="flex w-[90%] h-[35px] items-center justify-between border-b border-[#D9D9D9]">
                  <div className="text-[#1C1A4A]"> تعداد آیتم ها </div>
                  <div> {noFilterTotalCount} </div>
                </div>
              </div>
              <div className="w-full h-auto flex justify-center">
                <button
                  onClick={handlePayment}
                  className=" flex w-[205px] h-12 rounded-[50px] text-white items-center content-center justify-around bg-[#5751E1] shadow-[#050071] shadow-[4px_6px_0_0]"
                >
                  اقدام به پرداخت
                  <Image className="w-4 h-4" src={ArowPic} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[75%] mb-36 h-auto flex items-start justify-center flex-wrap">
            <div className="w-[90%] flex items-center justify-between">
              <div className="hidden lg:flex items-center gap-2 justify-center">
                <CountUp end={totalCount} duration={15} /> دوره در دسترس است
              </div>
              <div className=" flex gap-4">
                <select
                  className="bg-gray-100 rounded-full h-10 w-full md:w-44 shadow-sm dark:bg-gray-700 text-center mt-2 md:mt-0"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">جدیدترین</option>
                  <option value="lowest">ارزان ترین</option>
                  <option value="highest">گران ترین</option>
                </select>
                <select
                  name="paymentStatus"
                  value={filter.paymentStatus}
                  onChange={handleStatusFilterChange}
                  className="bg-gray-100 rounded-full h-10 w-full md:w-44 shadow-sm dark:bg-gray-700 text-center mt-2 md:mt-0"
                >
                  <option value="پرداخت نشده">پرداخت نشده</option>
                  <option value="پرداخت شده">پرداخت شده</option>
                </select>
              </div>
            </div>
            <div className="w-full h-auto flex flex-wrap mt-7 mb-16 justify-center gap-6">
              <PayCourseWrapper stateCourse={filteredCourses} />
            </div>
            <Pagination
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
