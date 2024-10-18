import React from "react";
import { CourseCommentWrapper } from "./CourseComment/CommentWrapper";
import {CourseAddComment } from "./AddComment";

interface CourseDetailsProps {
  detail: any;
  Comment : string;
}

export const CommentComponent: React.FC<CourseDetailsProps> = ({ detail , Comment }) => {
  return (
    <div className=" w-full h-[1065px] flex justify-center flex-wrap">
    <h1 className="w-[85%] mt-20 text-[#161439] dark:text-gray-300 text-[24px]"> نظر {detail.commentCount} </h1>
    <div className=" w-full h-[700px] overflow-y-scroll">
              <CourseCommentWrapper Comment={Comment} />
    </div>
    <CourseAddComment/>
</div>
  )
}