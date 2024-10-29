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
  currentDissLikeCount: number;
  currentLikeCount: number;
  newsCatregoryName: number
  currentUserIsLike: boolean;

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
            key={item.id}
            Id={item.id}
            title={item.title}
            Img={item.currentImageAddressTumb}
            Date={item.insertDate}
            miniDescribe={item.miniDescribe}
            View={item.currentView}
            DisLikeCount={item.currentDissLikeCount}
            LikeCount={item.currentLikeCount}
            Catregory={item.newsCatregoryName}
            currentUserIsLike={item.currentUserIsLike}
          />
        ))
      ) : (
        <div>در حال بارگذاری...</div>
      )}
    </>
  );
};
