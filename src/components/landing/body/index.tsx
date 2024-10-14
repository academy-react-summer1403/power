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
import { HeroSection } from "./HeroSection";
import { CategorySection } from "./CategorySection";
import { BodyAboutUs } from "./BodyAboutUs";
import { BlogSection } from "./BlogSection";
import { TopCoursesSection } from "./TopCoursesSection";
import { NewsletterSection } from "./NewsletterSection";
import { StatsSection } from "./StatsSection";
import { FAQSection } from "./FAQSection";
import { LearningJourney } from "./LearningJourney";

export const Body = () => {
  const [LandingApi, setLandingApi] = useState([]);
  const [topCourseState, setTopCourseState] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  // GetLandingReportApi
  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchNews = async () => {
      const result = await GetNewsForLanding();
      setNewsList(result);
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
        const result = await GetTeacherForLanding()
        setTeacherList(result)
    }

    fetchLandingTeachers()
    fetchNews();
    fetchTopCourseData();
    fetchData();
  }, []);

  return (
    <>
      <HeroSection />
      <div className="w-full mt-32 h-auto flex flex-wrap justify-center">
        <CategorySection />
        <BodyAboutUs />
        <TopCoursesSection topCourseState={topCourseState} />
      </div>
      <NewsletterSection />
      <StatsSection teacherList={teacherList} landingApi={LandingApi} />
      <FAQSection />
      <LearningJourney />
      <BlogSection newsList={newsList} />
    </>
  );
};
