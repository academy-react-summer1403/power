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
import CountUp from 'react-countup'


type Filter = {
  search: string;
  PageNumber: number;
};

export const Payment = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [noFilterTotalCount, setNoFilterTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // State for filters
  const [filter, setFilter] = useState<Filter>({
    search: "",
    PageNumber: 1,
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
  
    let priceSum = 0;

    listOfMyCourses?.map((course: any) => {
      priceSum += Number(course.cost) || 0; 
    });
    
    setTotalPrice(priceSum); 
    
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1);
  };

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
                  {" "}
                  {formatCostWithUnit(totalPrice)}{" "}
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
              <div className="w-[90%] h-[100px] flex justify-center items-center flex-wrap border-b border-[#D9D9D9]">
                <div className="text-[#161439] font-medium w-[90%]">
                  پرداخت امن:
                </div>
                <div className="w-[250px] h-9"></div>
              </div>
              <div className="w-full h-auto flex justify-center">
                <button className=" flex w-[205px] h-12 rounded-[50px] text-white items-center content-center justify-around bg-[#5751E1] shadow-[#050071] shadow-[4px_6px_0_0]">
                  اقدام به پرداخت{" "}
                  <Image className="w-4 h-4" src={ArowPic} alt="" />{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[75%] mb-36 h-auto flex items-start justify-center flex-wrap">
            <div className="w-[90%] flex items-center justify-between">
            <div className=" hidden lg:flex items-center gap-2 justify-center">
                <CountUp end={totalCount} duration={15} />
                 دوره در دسترس است
              </div>
              <button className="bg-[#5751E1] shadow-[#050071] text-white w-[205px] h-[50px] shadow-[4px_6px_0_0] rounded-[50px]">
                خالی کردن سبد
              </button>
            </div>
            <div className="w-full h-auto flex flex-wrap mt-7 mb-16 justify-center gap-6">
              <PayCourseWrapper stateCourse={courses} />
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
