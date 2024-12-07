"use client";

import React, { useEffect, useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import { GetTeacher } from "@/core/services/api/landing";
import { TeacherCard } from "@/components/teacher";

export const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const path = ["مربیان"];
  const title = "همه مربیان";

  const fetchTeachers = async () => {
    const result = await GetTeacher();
    setTeacherList(result);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filteredTeachers = teacherList.filter(teacher =>
    teacher.fullName && teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Breadcrumb path={path} title={title} />
      <div className="w-full flex-wrap h-auto mt-14 mb-14 flex justify-center p-10">
        <input
          type="text"
          className="w-1/2 p-2 border h-[50px] rounded bg-[#F7F7F9] dark:bg-gray-700 outline-none dark:border-gray-600 dark:text-white"
          placeholder="جستجو مربی..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <div className="w-[90%] mt-14 gap-7 flex flex-wrap justify-center">
          {filteredTeachers? filteredTeachers.map((item, index) => {
            return <TeacherCard teacher={item} key={index} />;
          }):"مربی ای با این نام وجود ندارد"}
        </div>
      </div>
      <Footer />
    </>
  );
};
