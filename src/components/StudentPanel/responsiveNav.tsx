import React, { useState } from "react";
import { FaBookOpen, FaEllipsisH, FaTachometerAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@/components/StudentPanel/modal"; 

export const ResponsiveNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 lg:hidden flex justify-around items-center p-2 text-white">
      <Link to="dashboard" className="flex flex-col items-center">
        <FaTachometerAlt />
        <span className="text-xs">داشبورد</span>
      </Link>
      <Link to="user-info" className="flex flex-col items-center">
        <FaUser />
        <span className="text-xs">اطلاعات کاربری</span>
      </Link>
      <Link to="courses" className="flex flex-col items-center">
        <FaBookOpen />
        <span className="text-xs">دوره‌ها</span>
      </Link>
      <button
        className="flex flex-col items-center"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <FaEllipsisH />
        <span className="text-xs">بیشتر</span>
      </button>

      {isMenuOpen && (
        <div className="absolute relative bottom-12 z-[60px] bg-gray-700 rounded-md shadow-lg p-3 text-center">
          <Link to="comments" className="block text-sm text-white mb-2">
            دیدگاه های من
          </Link>
          <Link to="favorites" className="block text-sm text-white mb-2">
            علاقه مندی ها
          </Link>
          <Link to="settings" className="block text-sm text-white mb-2">
            تنظیمات امنیتی
          </Link>
          <button
            className="block text-sm text-red-500"
            onClick={() => setIsModalOpen(true)} 
          >
            خروج از حساب
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout} 
      />
    </div>
  );
};
