"use client";

import { DateConvert } from "@/core/services/utils/date";
import LikePic from "@/assets/CourseDetail/like.png";
import DisLikePic from "@/assets/CourseDetail/dislike.png";
import AcountDefualtPic from "@/assets/CourseDetail/images.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  disLikedCourseCmnt,
  getRepCommentById,
  likedCourseCmnt,
} from "@/core/services/api/course";
import toast from "react-hot-toast";
import { getItem } from "@/core/services/common/storage.services";
import { useParams } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface CourseCommentProps {
  Img: string;
  author: string;
  Explanation: string;
  Like: number;
  DisLikes: number;
  Date: string;
  id: string;
  courseId: string;
}

export const CourseComment: React.FC<CourseCommentProps> = ({
  Img,
  author,
  Explanation,
  Like,
  DisLikes,
  Date,
  id,
  courseId,
}) => {
  const [ReplayComment, setReplayComment] = useState<any[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const Params = useParams<{ id: string }>();

  const toggleReplies = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies);
  };

  const AddCommentLike = async () => {
    if (getItem("token")) {
      try {
        const res = await likedCourseCmnt(id);
        res ? toast.success(res.message) : toast.error(res.ErrorMessage + " خطا ");
      } catch (error) {
        toast.error("خطا: " + error);
      }
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

  const fetchReplay = async () => {
    try {
      const res = await getRepCommentById(id, courseId);
      setReplayComment(Array.isArray(res) ? res : []);
    } catch (error) {
      toast.error("خطا در دریافت پاسخ‌ها");
    }
  };

  useEffect(() => {
    fetchReplay();
  }, []);

  const placeholderImage = AcountDefualtPic;
  const imageSrc =
    Img && (Img.startsWith("/") || Img.startsWith("http"))
      ? Img
      : placeholderImage;

  return (
    <div className="flex w-full border-b border-gray-300 dark:border-gray-600 p-4">
      <div className="flex h-full justify-center w-[10%] items-center">
        <Image
          src={imageSrc}
          alt=""
          width={112}
          height={112}
          className="w-28 h-28 bg-cover rounded-full"
        />
      </div>
      <div className="flex flex-col w-[90%] p-3 justify-center flex-wrap">
        <div className="flex justify-between w-full">
          <h3 className="text-lg font-semibold dark:text-white">{author}</h3>
          <span className="text-gray-500 dark:text-gray-400">
            {DateConvert(Date)}
          </span>
        </div>
        <p className="my-2 w-full text-[#6D6C80] dark:text-gray-300">
          {Explanation}
        </p>
        <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400">
          <div className="bg-[#F7F7FB] dark:bg-gray-300 w-[80px] h-[35px] rounded-xl text-[#5751E1] flex justify-center items-center cursor-pointer">
            پاسخ
          </div>
          {ReplayComment && (
            <div className="flex gap-3">
              <div
                onClick={toggleReplies}
                className="bg-[#F7F7FB] dark:bg-gray-300 w-[130px] h-[35px] rounded-xl text-[#5751E1] flex justify-center items-center cursor-pointer"
              >
                {showReplies ? "بستن پاسخ‌ها" : "نمایش پاسخ‌ها"}
                {showReplies ? (
                  <FaChevronUp className="ml-1" />
                ) : (
                  <FaChevronDown className="ml-1" />
                )}
              </div>
            </div>
          )}
          <div className="flex justify-center gap-3">
            <span
              onClick={() => AddCommentDisLike(id)}
              className="bg-[#D9D9D980] dark:bg-gray-600 items-center justify-center w-auto h-auto flex p-1 rounded-[30px] min-w-16 cursor-pointer"
            >
              <Image
                className="w-6 h-6"
                src={DisLikePic}
                alt=""
                width={24}
                height={24}
              />{" "}
              {DisLikes}
            </span>
            <span
              onClick={() => AddCommentLike(id)}
              className="bg-[#D9D9D980] dark:bg-gray-600 items-center w-auto h-auto flex p-1 justify-center rounded-[30px] min-w-16 cursor-pointer"
            >
              <Image
                className="w-6 h-6"
                src={LikePic}
                alt=""
                width={24}
                height={24}
              />{" "}
              {Like}
            </span>
          </div>
        </div>
        {showReplies && (
          <div className="mt-4 ml-10 flex flex-col gap-4">
            {ReplayComment?.length > 0 ? (
              ReplayComment.map((reply, index) => (
                <div
                  key={index}
                  className="flex border-b border-gray-200 dark:border-gray-600 pb-2"
                >
                  <div className="w-[10%] flex items-center">
                    <Image
                      src={
                        reply.pictureAddress
                          ? reply.pictureAddress
                          : placeholderImage
                      }
                      alt=""
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col w-[90%] px-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">
                        {reply?.author}
                      </h4>
                      <span className="text-gray-400 dark:text-gray-500">
                        {DateConvert(reply?.insertDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {reply?.describe}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">کامنتی وجود ندارد</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

