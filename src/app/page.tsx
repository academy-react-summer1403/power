"use client"

import { Login } from "@/pages/auth/login";
import { Landing } from "@/pages/landing";
import { NotFound } from "@/pages/404";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {
  return (
        <Router>
                  <Routes>
                            <Route path="/" element={<Landing/>} />
                            <Route path="/Login" element={<Login/>} />
                            <Route path="/SignUp" element={<NotFound/>} />
                            <Route path="*" element={<NotFound/>} />
                  </Routes>
        </Router>
  );
}
