import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBookOpen,
  FaComment,
  FaHeart,
  FaCog,
} from "react-icons/fa";

interface SidebarNavProps {
  getLinkClassName: (path: string) => string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ getLinkClassName }) => {
  return (
    <>
      <nav className="hidden h-full lg:flex mt-4 w-1/2 lg:w-full flex-col gap-4">
        <Link
          title="داشبورد"
          to="dashboard"
          className={getLinkClassName("/StudentPanel/dashboard")}
        >
          <FaTachometerAlt className="mr-2" />
          <span className=" hidden lg:inline-block">داشبورد</span>
        </Link>
        <Link
          title="اطلاعات کاربری"
          to="user-info"
          className={getLinkClassName("/StudentPanel/user-info")}
        >
          <FaUser className="mr-2" />
          <span className=" hidden lg:inline-block">اطلاعات کاربری</span>
        </Link>
        <Link
          title="دوره های روزرو شده"
          to="courses"
          className={getLinkClassName("/StudentPanel/courses")}
        >
          <FaBookOpen className="mr-2" />
          <span className=" hidden lg:inline-block">دوره های روزرو شده</span>
        </Link>
        <Link
          title="دیدگاه های من"
          to="comments"
          className={getLinkClassName("/StudentPanel/comments")}
        >
          <FaComment className="mr-2" />
          <span className=" hidden lg:inline-block">دیدگاه های من</span>
        </Link>
        <Link
          title="علاقه مندی ها"
          to="favorites"
          className={getLinkClassName("/StudentPanel/favorites")}
        >
          <FaHeart className="mr-2" />
          <span className=" hidden lg:inline-block">علاقه مندی ها</span>
        </Link>
        <Link
          to="settings"
          title="تنظیمات امنیتی"
          className={getLinkClassName("/StudentPanel/settings")}
        >
          <FaCog className="mr-2" />
          <span className=" hidden lg:inline-block">تنظیمات امنیتی</span>
        </Link>
      </nav>
    </>
  );
};

export default SidebarNav;
