import React, { useEffect, useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaBookOpen, FaComment, FaHeart, FaCog } from "react-icons/fa";
import HomePic from "@/assets/StudentPanel/home.png";
import AccountPic from "@/assets/StudentPanel/4a2ffe27f124d61856d4e3f78bc5a961.png";
import SignOutPic from "@/assets/StudentPanel/Frame (3).png";
import Image from "next/image";
import { getProfile } from "@/core/services/api/userPanel";
import Modal from "@/components/StudentPanel/modal";
import { Profile } from "@/components/StudentPanel/components/profile";
import SidebarNav from "@/components/StudentPanel/components/sidebarNav";
import { ResponsiveNav } from "@/components/StudentPanel/responsiveNav";

export const StudentPanel = () => {
  const [DataState, setData] = useState([]);
  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState<string>("نام کاربر");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const res = await getProfile();
    if (res) {
      setData(res);
      setProfile(res.currentPictureAddress);
      setName(` ${res.lName} ${res.fName}`.trim() || "نام کاربر");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const getLinkClassName = (path: string) => {
    return location.pathname === path
      ? "flex gap-4 items-center justify-center lg:justify-normal h-[43px] text-[#161439] bg-white border-l-4 border-[#FFC224] rounded-r-[30px] shadow-md transition-all dark:bg-[#3e3e3e] dark:text-white"
      : "flex gap-4 items-center justify-center lg:justify-normal h-[43px] text-gray-300 transition-all hover:text-white dark:hover:text-gray-200";
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };

  const getProfilePictureSrc = () => {
    if (profile && typeof profile === 'string' && profile.trim() !== "") {
      if (profile.startsWith('/') || profile.startsWith('http')) {
        return profile; 
      }
    }
    return AccountPic;
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full  bg-white dark:bg-[#222222] rounded-2xl shadow-lg overflow-hidden flex h-full">
        <aside className=" hidden md:w-[20%] min-w-[160px] lg:min-w-[310px] lg:w-[315px] h-full bg-[#5751E1] dark:bg-[#3e3e3e] lg:flex flex-col items-center p-4">
          <Profile profileSrc={getProfilePictureSrc()} name={name} />
          <SidebarNav getLinkClassName={getLinkClassName} />
          <button
            className="text-gray-300 flex gap-2 justify-center relative z-[200px] hover:text-white w-full mt-8 p-5 text-center"
            onClick={() => setIsModalOpen(true)} 
          >
            <Image src={SignOutPic} alt="Sign Out" />
            خارج شدن از حساب
          </button>
        </aside>
        <ResponsiveNav/>
        <main className="flex-grow w-full p-4 h-full">
          <div dir="ltr" className="h-[50px] w-full flex gap-5 items-center">
            <Link to="/">
              <Image className="w-7 h-7" src={HomePic} alt="Home" />
            </Link>
          </div>
          <Outlet context={{ DataState }} />
        </main>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </div>
  );
};