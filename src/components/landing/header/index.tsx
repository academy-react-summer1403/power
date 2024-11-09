"use client";

import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import BasketPic from "@/assets/landing/header/basket.png";
import FavoritePic from "@/assets/landing/header/favorite.png";
import SearchPic from "@/assets/landing/header/search.png";
import CategoryPic from "@/assets/landing/header/category.png";
import Image from "next/image";
import { getfave, getMyCourse } from "@/core/services/api/userPanel";
import { getFavoriteNews } from "@/core/services/api/news";
import { toast } from "react-hot-toast";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSticky, setSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [studentPanelLink, setStudentPanelLink] = useState("/StudentPanel");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("دوره ها");
  const [MyCourse, setMyCourse] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setSticky(currentScrollY > lastScrollY && currentScrollY > 100);
    setLastScrollY(currentScrollY);
  };

  const getLinkClassName = (path: string) => {
    return location.pathname === path
      ? "text-[#5751E1] after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#5751E1] after:to-transparent mt-4"
      : "p-2 md:p-3 lg:p-5 dark:text-white transition-all hover:text-blue-500 hover:text-[110%]";
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let timer;
    if (isMenuOpen) {
      timer = setTimeout(() => {
        setMenuOpen(false);
      }, 60000);
    }
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setStudentPanelLink("/StudentPanel/dashboard");
    } else {
      setStudentPanelLink("/Login");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const fetchFavorites = async () => {
    try {
      const favoriteCourses = await getfave();
      const favoriteNews = await getFavoriteNews();

      const courseCount = favoriteCourses?.totalCount;
      const newsCount = favoriteNews?.totalCount;

      setFavoriteCount(courseCount + newsCount);
    } catch (error) {
      console.error("Error fetching favorite counts:", error);
    }
  };

  const fetchCoursesCount = async () => {
    const res = await getMyCourse();
    try {
      if(res && typeof res.totalCount === "number") {
        setMyCourse(res.totalCount);
      }
    } catch (error) {
      toast.error("مشکلی در دریافت اطلاعات پیش امده");
    }
  };
  useEffect(() => {
    fetchCoursesCount();
    fetchFavorites();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("لطفا برای جستجو یک کلمه وارد کنید!");
    } else {
      if (selectedCategory === "دوره ها") {
        navigate(`/CourseList?search=${searchQuery}`);
      } else if (selectedCategory === "خبر ها") {
        navigate(`/NewsList?search=${searchQuery}`);
      }
    }
  };

  return (
    <div
      className={`flex justify-start flex-col w-full md:flex-row md:justify-between items-center h-16 md:h-[100px] p-4 md:p-6 transition-all dark:bg-gray-950 ${
        isSticky ? "fixed top-0 z-50 left-0 right-0 shadow-md bg-white" : ""
      }`}
    >
      <div className="w-full xl:w-[40%] flex flex-col md:flex-row justify-between items-center">
        <div className="hidden xl:flex text-[80%] font-medium">
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
      <div className="hidden xl:flex w-full md:w-[65%] p-0 md:p-10 flex-col md:flex-row justify-between items-center h-auto md:h-full">
        <div className="flex w-full md:w-[535px] rounded-[100px] h-[50px] border border-[#D3D2DF] items-center p-3">
          <Image className="w-4 h-4" src={CategoryPic} alt="Cat" />
          <select
            className="w-[150px] text-center outline-none h-full border-none appearance-none"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option> دروه ها </option>
            <option> خبر ها </option>
          </select>
          <div className="flex items-center justify-center h-full">
            <div className="h-3 border-l border-[#D3D2DF] mx-2" />
          </div>
          <div className="flex-grow h-full flex justify-center items-center">
            <input
              type="text"
              className="w-[85%] outline-none h-5 dark:text-white"
              placeholder="جستجو برای دوره ..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch(e.target.value)
              }
            />
            <button
              title="جستجو.."
              className="w-10 h-10 rounded-3xl flex justify-center items-center bg-[#5751E1]"
              onClick={handleSearch}
            >
              <Image src={SearchPic} className="w-7 h-[26px]" alt="Search" />
            </button>
          </div>
        </div>
        <div
          title="سبد خرید"
          className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative"
        >
          <Image src={BasketPic} alt="Basket" className="h-5 w-5" />
          <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
            {MyCourse}
          </div>
        </div>
        <Link
          to="/StudentPanel/favorites"
          title="علاقه مندی ها"
          className="w-10 h-10 hidden xl:flex rounded-[20px]  justify-center items-center border border-[#7F7E97] relative"
        >
          <Image src={FavoritePic} alt="Favorite" className="h-5 w-5" />
          <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
            {favoriteCount}
          </div>
        </Link>
        <Link
          to={studentPanelLink}
          className="bg-[#FFC224] h-11 w-full md:w-36 border transition-all shadow-[3px_3px_0_0] hover:shadow-[2px_2px_0_0] shadow-[#3D3D3D] border-[#06235B30] content-center rounded-[50px] text-center"
        >
          حساب کاربری
        </Link>
      </div>

      <button
        title="منو"
        className="flex xl:hidden absolute right-4 top-4 dark:text-white"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>

      <div
        className={`absolute z-50 top-0 left-0 w-full bg-white shadow-md p-4 transform ${
          isMenuOpen
            ? "translate-y-0 transition-transform"
            : "translate-y-[-100%] transition-transform"
        } dark:bg-gray-800`}
      >
        <div className="xl:hidden flex items-center justify-between mb-4 dark:text-white">
          <button onClick={toggleMenu}>
            <FaTimes className="text-2xl" />
          </button>
          <span className="text-xl">منو</span>
        </div>
        <div className="flex flex-col text-center">
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

          <div className="flex w-full rounded-md h-[50px] border border-[#D3D2DF] items-center p-3 mt-4 mb-4">
            <Image className="w-4 h-4" src={CategoryPic} alt="Cat" />
            <select
              className="w-[150px] text-center outline-none h-full border-none appearance-none"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option> دروه ها </option>
              <option> خبر ها </option>
            </select>
            <div className="flex-grow h-full flex justify-center items-center">
              <input
                type="text"
                className="w-[85%] outline-none h-5 dark:text-white"
                placeholder="جستجو برای دوره ..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch(e.target.value)
                }
              />
              <button
                title="جستجو.."
                className="w-10 h-10 rounded-3xl flex justify-center items-center bg-[#5751E1]"
                onClick={handleSearch}
              >
                <Image src={SearchPic} className="w-7 h-[26px]" alt="Search" />
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <div
              title="سبد خرید"
              className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative"
            >
              <Image src={BasketPic} alt="Basket" className="h-5 w-5" />
              <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
              {MyCourse}
              </div>
            </div>

            <div
              title="علاقه مندی ها"
              className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative"
            >
              <Image src={FavoritePic} alt="Favorite" className="h-5 w-5" />
              <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
                {favoriteCount}
              </div>
            </div>

            <Link
              to={studentPanelLink}
              className="bg-[#FFC224] h-11 w-full md:w-36 border transition-all shadow-[3px_3px_0_0] hover:shadow-[2px_2px_0_0] shadow-[#3D3D3D] border-[#06235B30] content-center rounded-[50px] text-center"
            >
              حساب کاربری
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
