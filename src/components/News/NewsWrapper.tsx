import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LandingNews } from ".";

interface News {
  id: string;
  title: string;
  currentImageAddressTumb: string;
  insertDate: string;
  miniDescribe: string;
  currentView: number;
  DisLikeCount: number;
  LikeCount: number;
  Catregory: string;
}

interface NewsWrapperProps {
  newsList: News[];
}

export const NewsWrapper: React.FC<NewsWrapperProps> = ({ newsList }) => {
  return (
    <>
      {newsList ? (
        newsList.map((item) => (
          <LandingNews
            Id={item.id}
            title={item.title}
            Img={item.currentImageAddressTumb}
            Date={item.insertDate}
            miniDescribe={item.miniDescribe}
            View={item.currentView}
            DisLikeCount={item.currentDissLikeCount}
            LikeCount={item.currentLikeCount}
            Catregory={item.newsCatregoryName}
          />
        ))
      ) : (
        <div>در حال بارگذاری...</div>
      )}
    </>
  );
};
