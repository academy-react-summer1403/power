"use client";

import { DateConvert } from "@/core/services/utils/date";
import LikePic from "@/assets/CourseDetail/like.png";
import DisLikePic from "@/assets/CourseDetail/dislike.png";
import AcountDefualtPic from "@/assets/CourseDetail/images.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  disLikedCourseCmnt,
  likedCourseCmnt,
} from "@/core/services/api/course";
import toast from "react-hot-toast";
import { ReportComment } from "@/core/services/api/more";
import { FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa";
import { getItem } from "@/core/services/common/storage.services";
import { useParams } from "react-router-dom";
import { addPaperReplyComment, GetNewsCommentReplies } from "@/core/services/api/news";
import { NewsRepalyWrapper } from "../NewsRepalyComment/RepalyWrapper";

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
  const [ReplayComment, setReplayComment] = useState<any[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [reportData, setReportData] = useState({
    CommentTitle: Explanation,
    ReasonForReport: "",
    CommentId: id,
    Accept: false,
    Date,
  });
  const params = useParams();

  const fetchReplay = async () => {
    try {
      const res = await GetNewsCommentReplies(id);
      setReplayComment(Array.isArray(res) ? res : []);
    } catch (error) {
      toast.error("خطا در دریافت پاسخ‌ها");
    }
  };

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

  const toggleReplies = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies);
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

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      toast.error("لطفاً متن پاسخ را وارد کنید.");
      return;
    }

    const replyData = {
      Title: "ریپلای کامنت",
      Describe: replyText,
      CommentId: id,
      newsId: params.id,
      userId: getItem("id"),
      userIpAddress: getItem("apiKey"),
    };

    try {
      setIsLoading(true);
      const res = await addPaperReplyComment(replyData);
      if (res) {
        toast.success("پاسخ با موفقیت ارسال شد.");
        setShowReplyForm(false);
        setReplyText("");
      } else {
        toast.error("خطا در ارسال پاسخ.");
      }
    } catch (error) {
      toast.error("خطا در ارسال پاسخ: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const ImgSrc =
  Img && (Img.startsWith("/") || Img.startsWith("http"))
      ? Img
      : AcountDefualtPic;


      useEffect(() => {
        fetchReplay()
      }, [])
      

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
          <div className="bg-[#F7F7FB] dark:bg-gray-700 w-[80px] h-[35px] rounded-xl text-[#5751E1] content-center text-center"
            onClick={() => setShowReplyForm(!showReplyForm)}
            >
              {showReplyForm ? "لغو" : "پاسخ"}
          </div>
          {ReplayComment.length > 0 && (
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
        <div className="mt-4 flex flex-col gap-2 w-full">
          {showReplies && <NewsRepalyWrapper ReplayCommentState={ReplayComment} />}
        </div>
        {showReplyForm && (
          <div className="mt-4 flex flex-col gap-2 w-full">
            <textarea
              className="w-full h-20 p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              placeholder="پاسخ خود را وارد کنید"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="py-2 px-4 bg-gray-300 dark:bg-gray-700 text-white rounded-md"
                onClick={() => setShowReplyForm(false)}
              >
                لغو
              </button>
              <button
                className={`py-2 px-4 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                } text-white rounded-md flex items-center`}
                onClick={handleReplySubmit}
                disabled={isLoading}
              >
                {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                ارسال
              </button>
            </div>
          </div>
        )}
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
