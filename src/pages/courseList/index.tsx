"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import React from "react";

export const CourseList = () => {
  const path = ["لیست دوره‌ها"];
  const title = "دوره‌های آموزشی";
  return (
    <>
      <Header />
      <div className="w-full h-auto flex flex-wrap justify-center">
        <Breadcrumb path={path} title={title} />
        <div className="h-[2358px] w-full flex justify-center flex-wrap">
                  <div className="h-[2090px] w-[1115px] flex flex-wrap">
                         <div className="w-full h-[40px] flex justify-between">
                                <div></div>
                                <div></div>
                         </div>
                  </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
