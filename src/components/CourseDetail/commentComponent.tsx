import React, { useState } from "react";
import { CourseCommentWrapper } from "./CourseComment/CommentWrapper";
import { CourseAddComment } from "./AddComment";

interface CourseDetailsProps {
  detail: any;
  Comment: any[];
  handleSortChange: (option: string) => void;
}

export const CommentComponent: React.FC<CourseDetailsProps> = ({
  detail,
  Comment,
  handleSortChange,
}) => {
  const [sortOption, setSortOption] = useState("newest");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    handleSortChange(option);
  };

  const handleToggleComments = () => {
    setShowAllComments((prev) => !prev);
  };

  const displayedComments = showAllComments ? Comment : Comment.slice(0, 4);

  return (
    <div className="w-full h-auto flex justify-center flex-wrap">
      <h1 className="w-[85%] mt-20 text-[#161439] dark:text-gray-300 text-[24px]">
        {" "}
        نظر {detail.commentCount}{" "}
      </h1>
      <div className="flex mt-5 mb-5 w-[90%]">
        {Comment.length > 1 && (
          <select
            value={sortOption}
            onChange={handleChange}
            className="rounded-xl border p-2 border-gray-500 w-52 h-auto"
          >
            <option value="newest">جدیدترین</option>
            <option value="mostLiked">محبوب‌ترین</option>
            <option value="leastLiked">کمترین لایک</option>
          </select>
        )}
      </div>
      <div className="w-full h-auto overflow-y-scroll">
        <CourseCommentWrapper Comment={displayedComments} />
      </div>
      {Comment.length > 4 && (
        <button
          onClick={handleToggleComments}
          className="mt-4 bg-[#F7F7FB] text-[#5751E1] rounded-[40px] text-center content-center p-3"
        >
          {showAllComments ? "مشاهده کمتر-" : "مشاهده بیشتر+"}
        </button>
      )}
      <CourseAddComment />
    </div>
  );
};
