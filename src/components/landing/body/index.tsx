"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  GetLandingApi,
  GetNewsForLanding,
  GetTeacherForLanding,
  GetTopCoursesApi,
} from "@/core/services/api/landing";
import { HeroSection } from "./heroSection";
import { CategorySection } from "./categorySection";
import { BodyAboutUs } from "./bodyAboutUs";
import { BlogSection } from "./blogSection";
import { TopCoursesSection } from "./topCoursesSection";
import { NewsletterSection } from "./newsletterSection";
import { TeacherSection } from "./teacherSection";
import { FAQSection } from "./faqSection";
import { LearningJourney } from "./learningJourney";
import { getCat } from "@/core/services/api/course";
import { Loading } from "@/components/loading";

export const Body = () => {
  const [LandingApi, setLandingApi] = useState([]);
  const [topCourseState, setTopCourseState] = useState([
    { title: "Course" },
    { title: "Course" },
    { title: "Course" },
    { title: "Course" },
  ]);
  const [newsList, setNewsList] = useState([
    { title: "news" },
    { title: "news" },
    { title: "news" },
    { title: "news" },
  ]);
  const [teacherList, setTeacherList] = useState([
    { fullName: "teacher" },
    { fullName: "teacher" },
    { fullName: "teacher" },
    { fullName: "teacher" },
  ]);
  const [catList, setCatList] = useState([
    { techName: "tech" },
    { techName: "tech" },
    { techName: "tech" },
    { techName: "tech" },
  ]);

  // GetLandingReportApi
  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchNews = async () => {
      const result = await GetNewsForLanding();
      setNewsList(result.news ? result.news.slice(0, 4) : result.slice(0, 4));
    };

    const fetchCategory = async () => {
      const result = await getCat();
      setCatList(result ? result.slice(0, 4) : result.slice(0, 4));
    };

    const fetchTopCourseData = async () => {
      const result = await GetTopCoursesApi();
      setTopCourseState(result);
    };

    const fetchData = async () => {
      const result = await GetLandingApi();
      setLandingApi(result);
    };

    const fetchLandingTeachers = async () => {
      const result = await GetTeacherForLanding();
      setTeacherList(result);
    };

    fetchCategory();
    fetchLandingTeachers();
    fetchNews();
    fetchTopCourseData();
    fetchData();
  }, []);

  if (!catList && !newsList && !teacherList && !topCourseState) {
    <Loading />;
  }

  return (
    <>
      <HeroSection />
      <div className="w-full mt-32 h-auto flex flex-wrap justify-center">
        <BodyAboutUs />
        <CategorySection catList={catList} />
        <TopCoursesSection topCourseState={topCourseState} />
      </div>
      <NewsletterSection />
      <TeacherSection teacherList={teacherList} landingApi={LandingApi} />
      <FAQSection />
      <LearningJourney />
      <BlogSection newsList={newsList} />
    </>
  );
};
