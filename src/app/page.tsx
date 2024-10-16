"use client"

import { Login } from "@/pages/auth/login";
import { Landing } from "@/pages/landing";
import { NotFound } from "@/pages/404";
import { ChatBot } from "@/components/openAi & ScrollBtn";
import { CourseList } from "@/pages/courseList";
import { SignUpContainer } from "@/components/auth/signUp/step/SignUpContainer";
import { CourseDetail } from "@/pages/courseDetail";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {
  return (
        <Router>
                <ChatBot/>
                  <Routes>
                            <Route path="/" element={<Landing/>} />
                            <Route path="/Login" element={<Login/>} />
                            <Route path="/SignUp" element={<SignUpContainer/>} />
                            <Route path="/CourseList" element={<CourseList/>} />
                            <Route path="/CourseDetail/:id" element={<CourseDetail/>} />
                            <Route path="*" element={<NotFound/>} />
                  </Routes>
        </Router>
  );
}
