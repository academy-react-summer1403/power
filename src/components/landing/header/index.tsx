"use client";

import { useRouter } from "next/router";
import BasketPic from "@/assets/landing/header/basket.png";
import FavoritePic from "@/assets/landing/header/favorite.png";
import SearchPic from "@/assets/landing/header/search.png";
import CategoryPic from "@/assets/landing/header/category.png";
import Image from "next/image";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const location = useLocation();
  const [isSticky, setSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setSticky(true); 
    } else {
      setSticky(false);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const getLinkClassName = (path: string): string => {
    return location.pathname === path
      ? "text-[#5751E1] after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-[#5751E1] after:to-transparent mt-4"
      : "p-2 md:p-3 lg:p-5 transition-all hover:text-blue-500 hover:text-[110%]";
  };
  return (
    <div className={`flex flex-col md:flex-row justify-between items-center h-auto md:h-[100px] p-4 md:p-6 transition-all  ${isSticky ? 'fixed top-0 z-50 left-0 right-0 bg-white shadow-md' : ''}`}>
      <div className="w-full md:w-[40%] flex flex-col md:flex-row justify-between">
        <div className="flex text-[90%] font-medium">
          <Link to="/" className={getLinkClassName("/")}>
            صفحه اصلی
          </Link>
          <Link to="/CourseList" className={getLinkClassName("/CourseList")}>
            دوره های آموزشی
          </Link>
          <Link to="/contact" className={getLinkClassName("/contact")}>
            درباره ما
          </Link>
          <Link to="/Basket" className={getLinkClassName("/Basket")}>
            فروشگاه
          </Link>
          <Link to="/NewsList" className={getLinkClassName("/NewsList")}>
            وبلاگ
          </Link>
          <Link to="/TeacherList" className={getLinkClassName("/TeacherList")}>
            مربیان
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[65%] p-0 md:p-10 flex flex-col md:flex-row justify-between items-center h-auto md:h-full">
        <div className="flex  w-full md:w-[535px] rounded-[100px] h-[50px] border border-[#D3D2DF] items-center p-3">
          <Image className="w-4 h-4" src={CategoryPic} alt="Cat" />
          <select className="w-[150px] text-center outline-none h-full border-none appearance-none">
            <option>دسته بندی ها</option>
          </select>
          <div className="flex items-center justify-center h-full">
            <div className="h-3 border-l border-[#D3D2DF] mx-2" />
          </div>
          <div className="flex-grow h-full flex justify-center items-center">
            <input
              type="text"
              className="w-[85%] outline-none h-5"
              placeholder="جستجو برای دوره ..."
            />
            <button data-title='جستجو..' className="w-10 h-10 rounded-3xl flex justify-center items-center bg-[#5751E1]">
              <Image src={SearchPic} className="w-7 h-[26px]" alt="Search" />
            </button>
          </div>
        </div>
        <div data-title="سبد خرید" className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative">
          <Image   src={BasketPic} alt="Basket" className="h-5 w-5" />
          <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
            0
          </div>
        </div>
        <div data-title="علاقه مندی ها" className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative">
          <Image  src={FavoritePic} alt="Favorite" className="h-5 w-5" />
          <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
            0
          </div>
        </div>
        <Link
          to="/Login"
          className="bg-[#FFC224] h-11 w-full md:w-36 border transition-all shadow-[3px_3px_0_0] hover:shadow-[2px_2px_0_0] shadow-[#3D3D3D] border-[#06235B30] content-center rounded-[50px] text-center"
        >
          حساب کاربری
        </Link>
      </div>
    </div>
  );
};
