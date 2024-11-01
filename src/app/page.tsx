// src/pages/Home.js

"use client";

import { Login } from "@/pages/auth/login";
import { Landing } from "@/pages/landing";
import { NotFound } from "@/pages/404";
import { ChatBot } from "@/components/openAi & ScrollBtn";
import { CourseList } from "@/pages/courseList";
import { SignUpContainer } from "@/components/auth/signUp/step/SignUpContainer";
import { CourseDetail } from "@/pages/courseDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewsListPage } from "@/pages/newsList";
import { NewsDetail } from "@/pages/newsDetail";
import { Loading } from "@/components/loading";
import { useState, useEffect } from "react";
import { StudentPanel } from "@/pages/StudentPanel";
import Settings from "@/components/StudentPanel/settings";
import Favorites from "@/components/StudentPanel/favorites";
import Comments from "@/components/StudentPanel/comments";
import Courses from "@/components/StudentPanel/courses";
import UserInfo from "@/components/StudentPanel/userInfo";
import Dashboard from "@/components/StudentPanel/dashboard";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  

  return (
    <Router>
      <ChatBot />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUpContainer />} />
        <Route path="/CourseList" element={<CourseList />} />
        <Route path="/NewsList" element={<NewsListPage />} />
        <Route path="/CourseDetail/:id" element={<CourseDetail />} />
        <Route path="/NewsDetail/:id" element={<NewsDetail />} />
        <Route path="/StudentPanel" element={<StudentPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="courses" element={<Courses />} />
          <Route path="comments" element={<Comments />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
