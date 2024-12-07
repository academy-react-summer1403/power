"use client";

import React from "react";
import { ReplayComment } from ".";

interface Comment {
  pictureAddress: string;
  autor: string;
  describe: string;
  likeCount: number;
  disslikeCount: number;
  inserDate: string;
  id: string;
  courseId: string;
}

interface NewsReplayCommentWrapperProps {
  ReplayCommentState: Comment[];
}
export const NewsRepalyWrapper: React.FC<NewsReplayCommentWrapperProps> = ({
  ReplayCommentState,
}) => {
  return (
    <>
      {ReplayCommentState.map((item, index) => (
        <ReplayComment
          key={index}
          Img={item.pictureAddress}
          author={item.autor}
          Explanation={item.describe}
          Date={item.inserDate}
        />
      ))}
    </>
  );
};
