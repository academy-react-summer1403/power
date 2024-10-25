import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/StudentPanel/search.png";
import { DateConvert } from "@/core/services/utils/date";
import { GetMyCourseComment, GetMyNewsComment } from "@/core/services/api/course";

interface Comment {
  commentId: string;
  title: string;
  describe?: string;
  insertDate: string;
  accept: boolean;
  courseTitle?: string;
}

const Comments: React.FC = () => {
  const [courseComments, setCourseComments] = useState<Comment[]>([]);
  const [newsComments, setNewsComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredComments = combinedComments.filter(comment => 
    comment.title.includes(searchTerm) || 
    (comment.describe && comment.describe.includes(searchTerm))
  );

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
      <div className="mt-7 w-full h-[32px] flex justify-between flex-wrap text-[#161439] font-semibold text-[18px] ">
        <div className="w-[200px] text-center">عنوان دیدگاه</div>
        <div className="w-[200px] text-center">دوره / خبر</div>
        <div className="w-[130px] text-center">تاریخ</div>
        <div className="w-[200px] text-center">وضعیت</div>
        <div className="w-full after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent"></div>
      </div>
      <div className="max-h-[280px] h-[200px] flex flex-wrap justify-center overflow-auto">
        {filteredComments.length > 0 ? (
          filteredComments.map(comment => (
            <div
              key={comment.commentId}
              className="flex justify-between w-full items-center py-2 border-b border-[#EBEBEB] dark:border-[#444]"
            >
              <div className="text-center w-[200px]">{comment.title}</div>
              <div className="w-[200px] text-center">
                {comment.courseTitle || "دیدگاه برای خبر"}
              </div>
              <div className="w-[130px] text-center">
                {DateConvert(comment.insertDate)}
              </div>
              <div className="w-[200px] text-center">
                {comment.accept ? "تأیید شده" : "منتظر بررسی"}
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