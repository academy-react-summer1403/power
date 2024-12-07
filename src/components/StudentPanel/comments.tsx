import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { DateConvert } from "@/core/services/utils/date";
import {
  GetMyCourseComment,
  GetMyNewsComment,
  deleteCourseComment,
} from "@/core/services/api/course";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";

interface Comment {
  commentId: string;
  title: string;
  describe?: string;
  insertDate: string;
  accept: boolean;
  courseTitle?: string;
  courseId?: string; // Make optional to accommodate news comments
  newsId?: string; // Add newsId to the comment for news comments
}

const Comments: React.FC = () => {
  const [courseComments, setCourseComments] = useState<Comment[]>([]);
  const [newsComments, setNewsComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const courseRes = await GetMyCourseComment();
      const newsRes = await GetMyNewsComment();
      setCourseComments(courseRes?.myCommentsDtos || []);
      setNewsComments(newsRes?.myNewsCommetDtos || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const combinedComments = [...courseComments, ...newsComments];

  const filteredComments = combinedComments.filter(
    (comment) =>
      comment.title.includes(searchTerm) ||
      (comment.describe && comment.describe.includes(searchTerm))
  );

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await deleteCourseComment(commentId);
      toast.success(res.message);
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  const handleViewDetail = (comment: Comment) => {
    if (comment.courseId) {
      navigate(`/CourseDetail/${comment.courseId}`);
    } else if (comment.newsId) {
      navigate(`/NewsDetail/${comment.newsId}`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#222222] text-[#161439] dark:text-white p-4">
      <div className="h-[70px] border-b border-[#EBEBEB] flex justify-between items-center">
        <div className="w-[535px] h-[50px] flex items-center justify-center border border-[#D3D2DF] rounded-full">
          <input
            type="text"
            placeholder="جستجو برای دیدگاه . ."
            className="w-[90%] outline-none h-full p-3 text-[14px] text-[#8D9DB5] bg-transparent dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-11 h-11 rounded-full bg-[#5751E1] flex justify-center items-center">
            <Image className="w-6 h-6" src={SearchIcon} alt="Search" />
          </div>
        </div>
      </div>
      <div className="mt-7 w-full h-[32px] flex justify-between flex-wrap text-[#161439] dark:text-white font-semibold text-[18px] ">
        <div className="w-[200px] text-center">عنوان دیدگاه</div>
        <div className="w-[200px] text-center hidden md:flex">دوره / خبر</div>
        <div className="w-[130px] text-center hidden lg:flex">تاریخ</div>
        <div className="w-[200px] text-center hidden lg:flex">وضعیت</div>
        <div className="w-[150px] text-center">عملیات</div>
      </div>
      <div className="w-full mt-5 after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent"></div>
      <div className="max-h-[700px] min-h-[200px] h-[250px] flex flex-wrap gap-2 justify-center overflow-auto">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment, index) => (
            <div
              key={index}
              className={`flex justify-between w-full items-center rounded-md h-10 dark:text-white dark:border-[#444] ${
                index % 2 !== 0 ? " bg-[#F7F7F7]" : "  bg-[#C8C1ED4D]"
              }`}
            >
              <div className="text-center w-[200px]">{comment.title}</div>
              <div className="w-[200px] text-center hidden md:flex">
                {comment.courseTitle || "دیدگاه برای خبر"}
              </div>
              <div className="w-[130px] text-center hidden lg:flex">
                {DateConvert(comment.insertDate)}
              </div>
              <div className="w-[200px] text-center hidden lg:flex">
                <span
                  className={comment.accept ? "text-green-500" : "text-red-500"}
                >
                  {comment.accept ? "تأیید شده" : "منتظر بررسی"}
                </span>
              </div>
              <div className="w-[150px] text-center flex gap-2 ">
                <button
                  onClick={() => handleViewDetail(comment)}
                  className="text-blue-500 hover:text-blue-700"
                  title="مشاهده جزئیات"
                >
                  <FaEye className="text-blue-500 hover:text-blue-700" />
                </button>
                <button
                  onClick={() => handleDeleteComment(comment.commentId)}
                  className="text-red-500 hover:text-red-700"
                  title="حذف دیدگاه"
                >
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">هیچ دیدگاهی وجود ندارد</div>
        )}
      </div>
    </div>
  );
};

export default Comments;
