// src/pages/Home.js

"use client";

import { Login } from "@/pages/auth/login";
import { Landing } from "@/pages/landing";
import { NotFound } from "@/pages/404";
import { ChatBot } from "@/components/openAi & ScrollBtn";
import { CourseList } from "@/pages/courseList";
import { SignUpContainer } from "@/components/auth/signUp/step/SignUpContainer";
import { CourseDetail } from "@/pages/courseDetail";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsListPage } from "@/pages/newsList";
import { NewsDetail } from "@/pages/newsDetail";
import { Loading } from "@/components/loading";
import { useState, useEffect } from "react";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
