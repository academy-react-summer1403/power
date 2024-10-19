"use client";

import { DateConvert } from "@/core/services/utils/date";
import LikePic from "@/assets/CourseDetail/like.png";
import DisLikePic from "@/assets/CourseDetail/dislike.png";
import AcountDefualtPic from "@/assets/CourseDetail/images.png";
import React from "react";
import Image from "next/image";
import { disLikedCourseCmnt, likedCourseCmnt } from "@/core/services/api/course";
import toast from "react-hot-toast";

interface CourseCommentProps {
  Img: string;
  author: string;
  Explanation: string;
  Like: number;
  DisLikes: number;
  Date: string;
  id: number;
}

export const CourseComment: React.FC<CourseCommentProps> = ({
  Img,
  author,
  Explanation,
  Like,
  DisLikes,
  Date,
  id,
}) => {
  const AddCommentLike = async () => {
    try {
      await likedCourseCmnt(id);
      toast.success("این کامنت لایک شد");
    } catch (error) {
      toast.error("خطا: " + error);
    }
  };

  const AddCommentDisLike = async () => {
    try {
      await disLikedCourseCmnt(id);
      toast.success("این کامنت دیس لایک شد");
    } catch (error) {
      toast.error("خطا: " + error);
    }
  };

  return (
    <div className="flex w-full border-b border-gray-300 dark:border-gray-600 p-4">
      <div className="flex h-full justify-center w-[10%] items-center">
        <img src={Img? Img : AcountDefualtPic} alt="" className="w-28 h-28 bg-cover rounded-full" />
      </div>
      <div className="flex flex-col w-[90%] p-3 justify-center flex-wrap">
        <div className="flex justify-between w-full">
          <h3 className="text-lg font-semibold dark:text-white">{author}</h3>
          <span className="text-gray-500 dark:text-gray-400">{DateConvert(Date)}</span>
        </div>
        <p className="my-2 w-full text-[#6D6C80] dark:text-gray-300">{Explanation}</p>
        <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400">
          <div className="bg-[#F7F7FB] dark:bg-gray-300 w-[80px] h-[35px] rounded-xl text-[#5751E1] content-center text-center">
            پاسخ
          </div>
          <div className="flex justify-center gap-3">
            <span
              onClick={() => AddCommentDisLike(id)}
              className="bg-[#D9D9D980] dark:bg-gray-600 items-center justify-center w-auto h-auto flex p-1 rounded-[30px] min-w-16"
            >
              <Image className="w-6 h-6" src={DisLikePic} alt="" /> {DisLikes}
            </span>
            <span
              onClick={() => AddCommentLike(id)}
              className="bg-[#D9D9D980] dark:bg-gray-600 items-center w-auto h-auto flex p-1 justify-center rounded-[30px] min-w-16"
            >
              <Image className="w-6 h-6" src={LikePic} alt="" /> {Like}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
