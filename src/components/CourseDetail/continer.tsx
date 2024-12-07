"use client";

import React from "react";
import { CourseInfo } from "@/components/CourseDetail/courseInfo";
import { Details } from "@/components/CourseDetail/detail";
import { CourseImage } from "@/components/CourseDetail/courseImage";
import { CourseButtons } from "@/components/CourseDetail/courseButtons";
import { CourseWrapper } from "@/components/Course/CourseWrapper";
import { CourseTopInfo } from "@/components/CourseDetail/courseTopInfo";
import { CommentComponent } from "./commentComponent";

interface CourseProps {
  detail: any;
  comment: any;
  sortedComments: any; 
  topCourseState: any;
  AddCourseReserve: (courseId: number) => Promise<void>;
  score: number;
  toggleSection: (section: "detail" | "comment") => void;
  showComment: boolean;
  showDetail: boolean;
  handleSortChange: (option: string) => void;
}

export const CourseDetailContainer: React.FC<CourseProps> = ({
  detail,
  AddCourseReserve,
  score,
  toggleSection,
  showComment,
  showDetail,
  comment,
  topCourseState,
  sortedComments,
  handleSortChange
}) => {
  return (
    <>
      <CourseInfo course={detail} AddCourseReserve={AddCourseReserve} />
      <div className="w-[1080px] dark:text-white h-auto flex flex-wrap justify-center items-start ">
        <CourseImage imageAddress={detail.imageAddress} title={detail.title} />
        <CourseTopInfo detail={detail} score={score} />
        <CourseButtons
          toggleSection={toggleSection}
          showComment={showComment}
          showDetail={showDetail}
        />
        {showDetail && <Details detail={detail} />}
        {showComment && <CommentComponent Comment={sortedComments} detail={detail} handleSortChange={handleSortChange} />}
        <div className="w-[95%] mt-56 flex-wrap lg:flex-nowrap lg:h-[650px] flex justify-center gap-4 items-center">
          <CourseWrapper stateTopCourse={topCourseState} />
        </div>
      </div>
    </>
  );
};
