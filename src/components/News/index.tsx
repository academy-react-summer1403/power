"use client";

import React, { useState } from "react";
import NewsDefaultPic from "@/assets/landing/news/newsDefualtPic.png";
import EyePic from "@/assets/landing/news/eye 1.png";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Image from "next/image";
import { DateConvert } from "@/core/services/utils/date";
import { Link, useNavigate } from "react-router-dom";
import { AddDisLikeNews, AddLikeNews } from "@/core/services/api/news"; // با توجه به مسیر شما
import toast from "react-hot-toast";
import { getItem } from "@/core/services/common/storage.services";

interface LandingNewsProps {
  Id: string;
  title: string;
  Img: string;
  Date: string;
  miniDescribe: string;
  View: number;
  DisLikeCount: number;
  LikeCount: number;
  Catregory: string;
  currentUserIsLike: boolean;
  viewMode: "flex" | "grid";
}

export const News: React.FC<LandingNewsProps> = ({
  Id,
  title,
  Img,
  Date,
  miniDescribe,
  View,
  DisLikeCount,
  LikeCount,
  Catregory,
  currentUserIsLike,
  viewMode,
}) => {
  const navigate = useNavigate();
  const [userLiked, setUserLiked] = useState(currentUserIsLike);
  const [likesCount, setLikesCount] = useState(LikeCount);
  const [dislikesCount, setDislikesCount] = useState(DisLikeCount);

  const handleLike = async () => {
    if (getItem("token")) {
      if (userLiked) {
        const res = await AddDisLikeNews(Id);
        if (res.success == true) {
          toast.success(res.message);
        } else {
          toast.error(res.ErrorMessage);
        }
        setUserLiked(false);
        setLikesCount((prevCount) => prevCount - 1);
      } else {
        const res = await AddLikeNews(Id);
        if (res.success == true) {
          toast.success(res.message);
        } else {
          toast.error(res.ErrorMessage);
        }
        setUserLiked(true);
        setLikesCount((prevCount) => prevCount + 1);
      }
    } else {
      toast.error("لطفا ابتدا وارد شوید");
    }
  };

  const handleDoubleClick = () => {
    navigate(`/NewsDetail/${Id}`);
  };

  const ImgSrc =
    Img && (Img.startsWith("/") || Img.startsWith("http"))
      ? Img
      : NewsDefaultPic;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`card ${
        viewMode === "grid"
          ? "w-[345px] h-[470px] flex-wrap"
          : viewMode === "flex"
          ? "w-full h-[310px] items-center flex-row"
          : "w-[345px] h-[470px] justify-center flex-wrap"
      }  flex justify-center bg-white dark:bg-gray-800 border border-[#B5B5C380] dark:border-gray-700 rounded-[10px] overflow-hidden`}
    >
      <Image
        src={ImgSrc}
        alt={title}
        width={295}
        height={225}
        className="w-[295px] h-[225px] object-cover rounded-[15px] cover-image"
      />
      <div className="p-5 w-full wrapper">
        <h3 className="title w-[290px] overflow-hidden h-[30px] text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="mt-2 w-[90%] h-auto flex items-center justify-between">
          <div className="bg-[#5751E1] w-auto h-auto rounded-[30px] text-[13px] text-white p-[6px]">
            {Catregory}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {DateConvert(Date)}
          </p>
        </div>
        <p className="mt-2 border-b border-[#B5B5C380] dark:border-gray-600 w-[295px] h-[45px] text-[#6D6C80] dark:text-gray-300 flex flex-wrap overflow-hidden text-base">
          {miniDescribe}
        </p>
        <div className="w-[95%] mt-6 h-auto flex items-center justify-between">
          <div className="flex gap-1 items-center text-[#6D6C80] dark:text-gray-300">
            <Image src={EyePic} alt="" /> {View}
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleLike}
              className={`w-[70px] h-[35px] bg-[#EFEFF1] dark:bg-gray-700 rounded-[30px] flex items-center justify-center ${
                userLiked ? "bg-green-200" : ""
              }`}
            >
              <FaThumbsUp
                className={`w-6 h-6 ${
                  userLiked ? "text-blue-500" : "text-gray-600"
                }`}
              />
              {likesCount}
            </button>
            <button
              onClick={handleLike}
              className={`w-[70px] h-[35px] bg-[#EFEFF1] dark:bg-gray-700 rounded-[30px] flex items-center justify-center `}
            >
              <FaThumbsDown className={"w-6 h-6  text-gray-600"} />
              {dislikesCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
