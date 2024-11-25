"use client";

import { DateConvert } from "@/core/services/utils/date";
import LikePic from "@/assets/CourseDetail/like.png";
import DisLikePic from "@/assets/CourseDetail/dislike.png";
import AcountDefualtPic from "@/assets/CourseDetail/images.png";
import React, { useState } from "react";
import Image from "next/image";
import {
  disLikedCourseCmnt,
  likedCourseCmnt,
} from "@/core/services/api/course";
import toast from "react-hot-toast";
import { ReportComment } from "@/core/services/api/more";
import { FaSpinner } from "react-icons/fa";

interface NewsCommentProps {
  Img: string;
  autor: any;
  Explanation: string;
  Like: number;
  DisLikes: number;
  Date: string;
  id: number;
  title: string;
}

export const NewsComment: React.FC<NewsCommentProps> = ({
  Img,
  autor,
  Explanation,
  Like,
  DisLikes,
  Date,
  id,
  title,
}) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState({
    CommentTitle: Explanation,
    ReasonForReport: "",
    CommentId: id,
    Accept: false,
    Date,
  });

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

  const toggleReportForm = () => {
    setShowReportForm((prevShow) => !prevShow);
  };

  const handleReportSubmit = async () => {
    if (!reportData.ReasonForReport) {
      toast.error("لطفاً دلیل گزارش را وارد کنید.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await ReportComment(reportData);
      if (res) {
        toast.success("گزارش با موفقیت ارسال شد.");
        setShowReportForm(false);
      } else {
        toast.error("خطایی در ارسال گزارش رخ داد.");
      }
    } catch (error) {
      toast.error("خطا در ارسال گزارش");
    } finally {
      setIsLoading(false);
    }
  };

  const ImgSrc =
    Img && (Img.startsWith("/") || Img.startsWith("http"))
      ? Img
      : AcountDefualtPic;

  return (
    <div className="flex w-full border-b border-gray-300 dark:border-gray-600 p-4">
      <div className="flex h-full justify-center w-[10%] items-center">
        <Image
          src={ImgSrc}
          alt=""
          className="w-28 h-28 bg-cover rounded-full"
        />
      </div>
      <div className="flex flex-col w-[90%] p-3 justify-center flex-wrap">
        <div className="flex justify-between w-full">
          <h3 className="text-lg font-semibold dark:text-white">{autor}</h3>
        </div>
        <div className="flex justify-between w-full">
          <h3 className="text-lg w-auto h-auto font-semibold dark:text-white">
            {title}
          </h3>
          <span className="text-gray-500 dark:text-gray-400">
            {DateConvert(Date)}
          </span>
        </div>
        <p className="my-2 w-full text-[#6D6C80] dark:text-gray-300">
          {Explanation}
        </p>
        <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400">
          <div className="bg-[#F7F7FB] dark:bg-gray-700 w-[80px] h-[35px] rounded-xl text-[#5751E1] content-center text-center">
            پاسخ
          </div>
          <div
            className="bg-[#F7F7FB] dark:bg-gray-300 w-[80px] h-[35px] rounded-xl text-red-500 flex justify-center items-center cursor-pointer"
            onClick={toggleReportForm}
          >
            گزارش
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
        {showReportForm && (
          <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <textarea
              className="w-full h-20 p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="دلیل گزارش را وارد کنید"
              value={reportData.ReasonForReport}
              onChange={(e) =>
                setReportData({
                  ...reportData,
                  ReasonForReport: e.target.value,
                })
              }
            />
            <button
              className={`mt-2 py-2 px-4 rounded-md flex items-center justify-center ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
              } text-white`}
              onClick={handleReportSubmit}
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
              {isLoading ? "در حال ارسال..." : "ارسال گزارش"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
