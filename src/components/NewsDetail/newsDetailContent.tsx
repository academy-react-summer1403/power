import Image from "next/image";
import { NewsAddComment } from "@/components/NewsDetail/AddComment";
import { NewsCommentWrapper } from "@/components/NewsDetail/NewsComment/CommentWrapper";
import { formatDescription } from "@/core/services/utils/formatDescription";
import CommaPic from "@/assets/NewsDetail/comma.svg";
import EyePic from "@/assets/NewsDetail/eye.png";
import TimePic from "@/assets/NewsDetail/time.png";
import DefaultPic from "@/assets/NewsDetail/blog_details.jpg.png";
import LikePic from "@/assets/NewsDetail/like.png";
import DisLikePic from "@/assets/NewsDetail/dislike.png";
import CommentPic from "@/assets/NewsDetail/comment.png";
import React, { useEffect, useState } from "react";
import { DateConvert } from "@/core/services/utils/date";

interface NewsDetail {
  title: string;
  miniDescribe: string;
  describe: string;
  currentImageAddressTumb?: string;
  newsCategoryName: string;
  insertDate: string;
  currentView: number;
  commentsCount: number;
  newsCatregoryName: string;
}

interface NewsDetailContentProps {
  detail: NewsDetail | null;
  OnSubmit: (comment: string) => void;
  comment: any;
  handleSortChange: (option: string) => void;
  sortOption: string;
}

export const NewsDetailContent: React.FC<NewsDetailContentProps> = ({
  detail,
  OnSubmit,
  handleSortChange,
  sortOption,
  comment,
}) => {
  const [readingTime, setReadingTime] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (detail) {
      const totalText = `${detail.miniDescribe} ${detail.describe}`;
      const numberOfWords = totalText.split(/\s+/).length;
      const wordsPerMinute = 250;
      const minutes = Math.ceil(numberOfWords / wordsPerMinute);
      setReadingTime(`${minutes} دقیقه`);
    }
  }, [detail]);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const commentsToShow = showAllComments ? comment : comment.slice(0, 4);

  const ImgSrc =
  detail?.currentImageAddressTumb  && (detail?.currentImageAddressTumb .startsWith("/") || detail?.currentImageAddressTumb .startsWith("http"))
    ? detail?.currentImageAddressTumb 
    : DefaultPic;

  return (
    <>
      <Image
        className="mt-5 h-[300px] object-cover contrast-75 rounded-xl"
        src={ImgSrc}
        alt={detail?.title || "News Default Image"}
        width={1050}
        height={200}
      />
      <div className="w-[90%] mt-5 mb-4 flex gap-2 lg:gap-0 flex-wrap lg:flex-nowrap justify-between items-center">
        <div className="flex items-center gap-4 text-[#6D6C80] dark:text-gray-300 content-center">
          <div className="bg-[#5751E1] w-auto p-1 rounded-xl text-white">
            {detail?.newsCatregoryName}
          </div>
          <p className="flex gap-1">
            <Image className="w-5 h-5" src={TimePic} alt="Date" />
            {DateConvert(detail?.insertDate)}
          </p>
          <h4 className="flex gap-1">
            <Image className="w-5 h-5" src={EyePic} alt="Views" />
            {detail?.currentView}
          </h4>
        </div>
        <div className="flex gap-5 items-center content-center">
          <div className="flex gap-1">
            <Image className="w-5 h-5" src={TimePic} alt="Reading Time" />
            {readingTime} خواندن
          </div>
          <div className="flex gap-1">
            <Image className="w-5 h-5" src={CommentPic} alt="Comments" />
            {detail?.commentsCount} نظر
          </div>
        </div>
      </div>
      <h1 className="w-[90%] overflow-y-auto text-[36px] text-[#161439] dark:text-white mb-6">
        {detail?.title}
      </h1>

      <div className="w-[90%] h-[110px] overflow-y-auto text-[#6D6C80] dark:text-gray-300">
        {detail?.miniDescribe}
      </div>
      <div className="w-[85%] h-[150px] flex justify-center items-center bg-[#EFEEFE] dark:bg-gray-700 border-r-[6px] border-[#5751E1]">
        <div className="w-[70%] h-full gap-14 content-center p-2">
          {detail?.describe.length > 100
            ? `${detail?.describe.substring(0, 100)}...`
            : detail?.describe}
        </div>
        <Image src={CommaPic} className="w-16 h-16 bg-cover" alt="Comma" />
      </div>
      <div className="w-[90%] h-[110px] overflow-y-auto text-[#6D6C80] dark:text-gray-300 mb-5 border-b-2 border-[#E8E8E8] mt-16 p-3">
        {formatDescription(detail?.describe)}
      </div>
      <div className="h-24 w-[90%] p-4 flex gap-6 border-b-2 border-[#E8E8E8]">
        <p className="text-black dark:text-white text-[18px] font-semibold">
          آیا از این مقاله راضی بودید؟
        </p>
        <div className="flex gap-4">
          <div className="w-9 h-9 rounded-full bg-[#EFEFF1] dark:bg-[#5751E1] flex justify-center items-center cursor-pointer">
            <Image src={LikePic} className="w-5 h-6" alt="Like" />
          </div>
          <div className="w-9 h-9 rounded-full bg-[#EFEFF1] dark:bg-[#5751E1] flex justify-center items-center cursor-pointer">
            <Image src={DisLikePic} className="w-5 h-6" alt="Dislike" />
          </div>
        </div>
      </div>
      <div className="h-auto w-[90%] mt-7 mb-10">
        <h1 className="text-[18px] text-black dark:text-white mb-8">
          بخش نظرات
        </h1>
        <NewsAddComment onSubmit={OnSubmit} />
        <h1 className="text-[#161439] dark:text-white mt-8 mb-8 w-full text-[24px]">
          نظر {detail?.commentsCount}
        </h1>
        <div className="flex mb-4">
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-xl border p-2 border-gray-500 w-52 h-auto"
          >
            <option value="newest">جدیدترین</option>
            <option value="mostLiked">محبوب‌ترین</option>
            <option value="leastLiked">کمترین لایک</option>
          </select>
        </div>
        <div className="w-full h-auto overflow-y-scroll">
          <NewsCommentWrapper Comment={commentsToShow} />
        </div>
        <div className="w-full flex justify-center items-center">
          {comment.length > 4 && (
            <button
              onClick={handleToggleComments}
              className="mt-4 bg-[#F7F7FB] text-[#5751E1] rounded-[40px] text-center content-center p-3"
            >
              {showAllComments ? "مشاهده کمتر" : "مشاهده بیشتر"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
