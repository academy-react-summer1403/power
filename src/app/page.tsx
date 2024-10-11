"use client"

import { Login } from "@/pages/auth/login";
import { Landing } from "@/pages/landing";
import { NotFound } from "@/pages/404";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from "@/pages/auth/signup";
import { ChatBot } from "@/components/openAi & ScrollBtn";
import { CourseList } from "@/pages/courseList";

export default function Home() {
  return (
        <Router>
                <ChatBot/>
                  <Routes>
                            <Route path="/" element={<Landing/>} />
                            <Route path="/Login" element={<Login/>} />
                            <Route path="/SignUp" element={<SignUp/>} />
                            <Route path="/CourseList" element={<CourseList/>} />
                            <Route path="*" element={<NotFound/>} />
                  </Routes>
        </Router>
  );
}
