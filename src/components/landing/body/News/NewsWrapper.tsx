import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { LandingNews } from ".";

interface News {
  id: string;
  title: string;
  currentImageAddressTumb: string;
  insertDate: string;
  miniDescribe: string;
  currentView: number;
}

interface NewsWrapperProps {
  newsList: News[];
}

export const NewsWrapper: React.FC<NewsWrapperProps> = ({ newsList }) => {
  return (
    <div className="w-[1440px] h-[575px] flex justify-center gap-3 overflow-hidden">
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full flex justify-center flex-nowrap"
      >
        {newsList.news ? newsList.news.map((item) => (
          <SwiperSlide className="flex w-full h-full justify-center" >
            <LandingNews 
              Id={item.id} 
              title={item.title}
              Img={item.currentImageAddressTumb}
              Date={item.insertDate}
              miniDescribe={item.miniDescribe}
              View={item.currentView}
            />
          </SwiperSlide>
        )) : (
          <div>در حال بارگذاری...</div>
        )}
      </Swiper>
    </div>
  );
};
