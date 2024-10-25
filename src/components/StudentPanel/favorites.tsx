import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { DateConvert } from "@/core/services/utils/date";
import { getfave } from "@/core/services/api/userPanel";
import { getFavoriteNews } from "@/core/services/api/news";

interface FavoriteCourse {
  courseId: string;
  courseTitle: string;
  teacherName?: string;
  reservedDate: string;
  accept: boolean;
}

interface FavoriteNews {
  newsId: string;
  title: string;
  insertDate: string;
}

const Favorites: React.FC = () => {
  const [favoriteCourses, setFavoriteCourses] = useState<FavoriteCourse[]>([]);
  const [favoriteNews, setFavoriteNews] = useState<FavoriteNews[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); 

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

  // Combine the courses and news
  const combinedFavorites = [
    ...favoriteCourses.map(course => ({
      ...course,
      type: 'course',
      identifier: course.courseId,
      displayTitle: course.courseTitle
    })),
    ...favoriteNews.map(news => ({
      ...news,
      type: 'news',
      identifier: news.newsId,
      displayTitle: news.title
    }))
  ];

  const filteredFavorites = combinedFavorites.filter(favorite =>
    favorite.displayTitle.includes(searchTerm)
  );

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
        <div className="w-[150px] text-center">وضعیت</div>
      </div>

      <div className="max-h-[280px] overflow-y-auto">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite) => (
            <div
              key={favorite}
              className="flex justify-between items-center py-2 border-b border-[#EBEBEB] dark:border-[#444]"
            >
              <div className="text-center w-[200px]">{favorite.displayTitle}</div>
              <div className="w-[200px] text-center">{favorite.type === 'course' ? 'دوره' : 'خبر'}</div>
              <div className="w-[130px] text-center">
                {DateConvert(favorite.type === 'course' ? favorite.updateDate : favorite.lastUpdate)}
              </div>
              <div className="w-[150px] text-center">
                {favorite.type === 'course' ? (favorite.accept ? "تأیید شده" : "منتظر بررسی") : "در حال بررسی"}
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