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
      <div className="w-full h-auto flex justify-center">
        <Breadcrumb path={path} title={title} />
      </div>
      <Footer />
    </>
  );
};
