import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { DateConvert } from "@/core/services/utils/date";
import { deletFavorite, getfave } from "@/core/services/api/userPanel";
import { delNewsFavorite, getFavoriteNews } from "@/core/services/api/news";
import { FaEye, FaTrash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FavoriteCourse {
  courseId: string;
  courseTitle: string;
  teacherName?: string;
  reservedDate: string;
  accept: boolean;
  teacheName: string;
  favoriteId: string;
}

interface FavoriteNews {
  newsId: string;
  title: string;
  insertDate: string;
  teacheName: string;
  favoriteId: string;
}

const Favorites: React.FC = () => {
  const [favoriteCourses, setFavoriteCourses] = useState<FavoriteCourse[]>([]);
  const [favoriteNews, setFavoriteNews] = useState<FavoriteNews[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const favoriteCoursesRes = await getfave();
      const favoriteNewsRes = await getFavoriteNews();

      setFavoriteCourses(favoriteCoursesRes.favoriteCourseDto || []);
      setFavoriteNews(favoriteNewsRes.myFavoriteNews || []);
    } catch (error) {
      console.error("Failed to fetch favorite courses or news", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const combinedFavorites = [
    ...favoriteCourses.map((course) => ({
      ...course,
      type: "course",
      identifier: course.courseId,
      displayTitle: course.courseTitle,
      teacheName: course.teacheName,
      favoriteId: course.favoriteId,
    })),
    ...favoriteNews.map((news) => ({
      ...news,
      type: "news",
      identifier: news.newsId,
      displayTitle: news.title,
      teacheName: news.teacheName,
      favoriteId: news.favoriteId,
    })),
  ];

  const filteredFavorites = combinedFavorites.filter((favorite) =>
    favorite.displayTitle.includes(searchTerm)
  );

  const handleViewDetail = (id: string, type: string) => {
    if (type === "course") {
      navigate(`/CourseDetail/${id}`);
    } else if (type === "news") {
      navigate(`/NewsDetail/${id}`);
    }
  };

  const handleDeleteFavorite = async (favoriteId: string, type: string) => {
    const data = new FormData();
    data.append("CourseFavoriteId", favoriteId);
    try {
      if (type === "course") {
        const res = await deletFavorite(data);
        toast.success(res.message)
      } else if (type === "news") {
        await delNewsFavorite(favoriteId);
      }
      fetchFavorites();
    } catch (error) {
      console.error("Failed to delete favorite", error);
    }
  };

  return (
    <div className="bg-white dark:bg-[#222222] text-[#161439] dark:text-white p-4">
      <div className="h-[70px] border-b border-[#EBEBEB] flex justify-between items-center mb-4">
        <div className="w-[535px] h-[50px] flex items-center justify-center border border-[#D3D2DF] rounded-full">
          <input
            type="text"
            placeholder="جستجو برای دوره یا خبر . ."
            className="w-[90%] outline-none h-full p-3 text-[14px] text-[#8D9DB5] dark:bg-[#333] dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-11 h-11 rounded-full bg-[#5751E1] flex justify-center items-center">
            <Image className="w-6 h-6" src={SearchIcon} alt="Search" />
          </div>
        </div>
      </div>

      <div className="mt-7 w-full flex flex-wrap text-[#161439] font-semibold text-[18px] ">
        <div className="w-[200px] text-center">عنوان</div>
        <div className="w-[200px] text-center">نوع</div>
        <div className="w-[130px] text-center">تاریخ</div>
        <div className="w-[150px] text-center">نویسنده</div>
        <div className="w-[150px] text-center">عملیات</div>
      </div>

      <div className="after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent"></div>

      <div className="max-h-[700px] min-h-[200px] h-[250px] flex flex-wrap justify-center gap-2 overflow-y-auto">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite , index) => (
            <div
              key={index}
              className={`flex justify-between items-center rounded-md h-10 dark:border-[#444]${
                  index % 2 !== 0 ? " bg-[#F7F7F7]" : "  bg-[#C8C1ED4D]"
                }`}
            >
              <div className="text-center w-[200px]">
                {favorite.displayTitle}
              </div>
              <div className="w-[200px] text-center">
                {favorite.type === "course" ? "دوره" : "خبر"}
              </div>
              <div className="w-[130px] text-center">
                {DateConvert(
                  favorite.type === "course"
                    ? favorite.reservedDate
                    : favorite.lastUpdate
                )}
              </div>
              <div className="w-[150px] text-center">{favorite.teacheName}</div>
              <div className="w-[150px] text-center flex gap-5 space-x-2">
                <button
                  onClick={() =>
                    handleViewDetail(favorite.identifier, favorite.type)
                  }
                  title="مشاهده جزئیات"
                >
                  <FaEye className="text-blue-500 hover:text-blue-700" />
                </button>
                <button
                  onClick={() =>
                    handleDeleteFavorite(favorite.favoriteId, favorite.type)
                  }
                  title="حذف مورد مورد علاقه"
                >
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">هیچ موردی وجود ندارد</div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
