"use client";

import React from "react";
import { NewsComment } from ".";

interface Comment {
  pictureAddress: string;
  autor: string;
  describe: string;
  likeCount: number;
  dissLikeCount: number;
  inserDate: string;
  title: string; 
  id: number;
}

interface NewsCommentWrapperProps {
  Comment: Comment[];
}

export const NewsCommentWrapper: React.FC<NewsCommentWrapperProps> = ({ Comment }) => {
  return (
    <>
      {Comment.map((item) => (
        <NewsComment
          key={item.id}
          Img={item.pictureAddress}
          autor={item.autor}
          Explanation={item.describe}
          Like={item.likeCount}
          DisLikes={item.dissLikeCount}
          Date={item.inserDate}
          title={item.title}
          id={item.id}
        />
      ))}
    </>
  );
};
