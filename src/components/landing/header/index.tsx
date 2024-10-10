"use client"

import { useRouter } from "next/router";
import BasketPic from "@/assets/landing/header/basket.png";
import FavoritePic from "@/assets/landing/header/favorite.png";
import SearchPic from "@/assets/landing/header/search.png";
import CategoryPic from "@/assets/landing/header/category.png";
import Image from "next/image";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "صفحه اصلی", path: "/" },
  { name: "دوره های اموزشی", path: "/courses" },
  { name: "ایونت ها", path: "/events" },
  { name: "فروشگاه", path: "/store" },
  { name: "وبلاگ", path: "/blog" },
  { name: "مربیان", path: "/coaches" },
];

export const Header = () => {
  const router = useLocation();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[100px] p-4 md:p-6">
      <div className="w-full md:w-[40%] flex flex-col md:flex-row justify-between">
        <div className="flex text-[90%] font-medium">
          {links.map((link) => (
            <p
              key={link.name}
              className={`p-2 md:p-3 lg:p-4 transition-all duration-300 ${
                router.pathname === link.path
                  ? "text-[#5751E1] after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-[#5751E1] after:to-transparent" 
                  : "text-black"
              }`}
            >
              {link.name}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[65%] p-0 md:p-10 flex flex-col md:flex-row justify-between items-center h-auto md:h-full">
        <div className="flex overflow-hidden w-full md:w-[535px] rounded-[100px] h-[50px] border border-[#D3D2DF] items-center p-3">
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
            <button className="w-10 h-10 rounded-3xl flex justify-center items-center bg-[#5751E1]">
              <Image src={SearchPic} className="w-7 h-[26px]" alt="Search" />
            </button>
          </div>
        </div>
        <div className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative">
          <Image src={BasketPic} alt="Basket" className="h-5 w-5" />
          <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
            0
          </div>
        </div>
        <div className="w-10 h-10 rounded-[20px] flex justify-center items-center border border-[#7F7E97] relative">
          <Image src={FavoritePic} alt="Favorite" className="h-5 w-5" />
          <div className="absolute top-0 right-[-5px] w-[22px] h-[22px] rounded-[11px] bg-[#FFC224] text-center">
            0
          </div>
        </div>
        <Link to="/Login" className="bg-[#FFC224] h-11 w-full md:w-36 border border-[#06235B30] content-center rounded-[50px] text-center">
          حساب کاربری
        </Link>
      </div>
    </div>
  );
};

