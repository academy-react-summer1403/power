"use client";

import { toast } from "react-hot-toast"; // Importing the toast module
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import {
  addReserve,
  getCommentById,
  getCourseById,
} from "@/core/services/api/course";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTopCoursesApi } from "@/core/services/api/landing";
import { CourseDetailContainer } from "@/components/CourseDetail/continer";
import { Loading } from "@/components/loading";

interface CourseDetail {
  title: string;
  imageAddress: string;
  likeCount: number;
  dissLikeCount: number;
  cost: number;
  courseLevelName: string;
  teacherId: number;
  capacity: number;
  insertDate: string;
  courseStatusName: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  courseId: number;
  miniDescribe: string;
  describe: string;
  commentCount: number;
  techs: Array<any>;
}

export const CourseDetail = () => {
  const params = useParams<{ id: string }>();

  const [detail, setDetail] = useState<CourseDetail | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [topCourseState, setTopCourseState] = useState([]);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [comment, setComment] = useState<Array<any>>([]);
  const [sortedComments, setSortedComments] = useState<Array<any>>([]);

  const AddCourseReserve = async (courseId: number) => {
    const loadingToast = toast.loading("در حال ثبت نام...");
    try {
      const res = await addReserve(courseId);
      toast.dismiss(loadingToast);
      res.success
        ? toast.success("ثبت نام موفقیت آمیز بود!")
        : toast.error(res.ErrorMessage);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("یک خطا رخ داده است، لطفاً دوباره تلاش کنید.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [courseDetail, courseComments, topCourse] = await Promise.all([
        getCourseById(params.id),
        getCommentById(params.id),
        GetTopCoursesApi(),
      ]);
      setTopCourseState(topCourse);
      setDetail(courseDetail);
      setComment(courseComments);
      setSortedComments(sortComments(courseComments, "newest"));
    };
    fetchData();
  }, [params.id]);

  const handleSortChange = (option) => {
    setSortedComments(sortComments(comment, option));
  };

  const sortComments = (comments, option) => {
    switch (option) {
      case "newest":
        return [...comments].sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate));
      case "mostLiked":
        return [...comments].sort((a, b) => b.likeCount - a.likeCount);
      case "leastLiked":
        return [...comments].sort((a, b) => a.likeCount - b.likeCount);
      default:
        return comments; 
    }
  };

  const toggleSection = (section: "detail" | "comment") => {
    if (section === "detail") {
      setShowDetail(true);
      setShowComment(false);
    } else {
      setShowDetail(false);
      setShowComment(true);
    }
  };

  if (!detail) {
    return <Loading/>;
  }

  const path = [`دوره های اموزشی > ${detail.title}`];
  const title = "توضیحات دوره";

  const totalVotes = detail.likeCount + detail.dissLikeCount;
  const likeRatio = totalVotes > 0 ? detail.likeCount / totalVotes : 0;
  const score = (totalVotes > 0 ? (1 + 4 * likeRatio) : 1).toFixed(1);

  return (
    <>
      <Header />
      <Breadcrumb path={path} title={title} />
      <div className="w-full h-auto flex flex-wrap justify-center mt-32 mb-32">
        <CourseDetailContainer
          handleSortChange={handleSortChange}
          detail={detail}
          score={score}
          AddCourseReserve={AddCourseReserve}
          toggleSection={toggleSection}
          showComment={showComment}
          showDetail={showDetail}
          comment={comment}
          topCourseState={topCourseState}
          sortedComments={sortedComments}
        />
      </div>
      <Footer />
    </>
  );
};
