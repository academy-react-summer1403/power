"use client";

import React from "react";
import { NewsRelated } from "./newsRelated";
import { NewsDetailContent } from "./newsDetailContent";
import { NewsWrapper } from "../News/NewsWrapper";


interface NewsProp  {
    newsList : News[];
    detail: NewsDetail | null;
    onSubmit: (comment: string) => void;
    comment: any; 
    handleSortChange: (option: string) => void;
    sortOption: string;
    sortedComments: Comment[];

}

export const NewsContainer: React.FC<NewsProp> = ({newsList , detail , onSubmit , sortOption , handleSortChange , sortedComments }) => {
  return (
    <>
      <NewsRelated newsList={newsList} />

      <div className="mt-32 mb-8 w-[1080px] h-auto flex flex-wrap justify-center overflow-hidden">
        <NewsDetailContent
          detail={detail}
          OnSubmit={onSubmit}
          comment={sortedComments}
          handleSortChange={handleSortChange}
          sortOption={sortOption}
        />
        <div className="w-full h-auto flex flex-wrap items-center justify-center min-h-[700px]">
          <div className="w-full h-auto text-[36px] text-[#161439] dark:text-white">
            اخبار مرتبط
          </div>
          <div className="w-[1085px] overflow-x-auto h-auto min-h-[485px] flex justify-center gap-4 flex-wrap lg:flex-nowrap">
            <NewsWrapper newsList={newsList} />
          </div>
        </div>
      </div>
    </>
  );
};
