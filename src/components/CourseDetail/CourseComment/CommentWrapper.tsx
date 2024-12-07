"use client";

import React from "react";
import { CourseComment } from ".";

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

interface CourseCommentWrapperProps {
  Comment: Comment[];
}

export const CourseCommentWrapper: React.FC<CourseCommentWrapperProps> = ({ Comment }) => {
  return (
    <>
      {Comment.map((item, index) => (
        <CourseComment
          key={index}
          Img={item.pictureAddress}
          author={item.author}
          Explanation={item.describe}
          Like={item.likeCount}
          DisLikes={item.disslikeCount}
          Date={item.insertDate}
          id={item.id}
          courseId={item.courseId}
        />
      ))}
    </>
  );
};
