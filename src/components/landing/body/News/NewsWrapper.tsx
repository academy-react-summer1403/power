"use client";

import React from "react";
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
    <>
      {newsList.news
        ? newsList.news.map((item) => (
            <LandingNews 
            key={item.id} 
            Id={item.id} 
            title={item.title}
            Img={item.currentImageAddressTumb}
            Date={item.insertDate}
            miniDescribe={item.miniDescribe}
            View={item.currentView}
            />
          ))
        : <div> در حال بارگذاری... </div>}
    </>
  );
};
