"use client";

import React from "react";
import { ReplayComment } from ".";

interface Comment {
  pictureAddress: string;
  author: string;
  describe: string;
  likeCount: number;
  disslikeCount: number;
  insertDate: string;
  id: string;
  courseId: string;
}

interface CourseReplayCommentWrapperProps {
  ReplayCommentState: Comment[];
}
export const RepalyWrapper: React.FC<CourseReplayCommentWrapperProps> = ({
  ReplayCommentState,
}) => {
  return (
    <>
      {ReplayCommentState.map((item, index) => (
        <ReplayComment
          key={index}
          Img={item.pictureAddress}
          author={item.author}
          Explanation={item.describe}
          Date={item.insertDate}
        />
      ))}
    </>
  );
};
