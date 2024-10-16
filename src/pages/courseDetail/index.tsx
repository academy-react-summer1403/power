"use client";

import { toast } from "react-hot-toast"; // Importing the toast module
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import DefaultPic from "@/assets/CourseDetail/courses_details.jpg.png";
import Arow from "@/assets/CourseDetail/arow.png";
import TestPic from "@/assets/CourseDetail/test.png";
import LevelPic from "@/assets/CourseDetail/level.png";
import TimePic from "@/assets/CourseDetail/time.png";
import PaymentPic from "@/assets/CourseDetail/payment.png.png";
import CertificatePic from "@/assets/CourseDetail/Certificate.png";
import lessonPic from "@/assets/CourseDetail/lesson.png";
import Breadcrumb from "@/components/path";
import ScorePic from "@/assets/CourseDetail/star.svg";
import StudentPic from "@/assets/CourseDetail/student.png";
import TwiterPic from "@/assets/media/twiter.png";
import FacebookPic from "@/assets/media/facebook.png";
import InstagramPic from "@/assets/media/instagram.png";
import WhatsappPic from "@/assets/media/whatsapp.png";
import YoutubePic from "@/assets/media/youtube.png";
import CalenderPic from "@/assets/CourseDetail/date.png";
import { addReserve, getCommentById, getCourseById } from "@/core/services/api/course";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateConvert } from "@/core/services/utils/date";
import { CourseCommentWrapper } from "@/components/CourseDetail/CourseComment/CommentWrapper";
import { AddComment } from "@/components/CourseDetail/AddComment";
import { CourseWrapper } from "@/components/Course/CourseWrapper";
import { GetTopCoursesApi } from "@/core/services/api/landing";

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
  commentCount : number;
  techs: Array<any>;
}

export const CourseDetail = () => {
  const params = useParams<{ id: string }>();

  const [detail, setDetail] = useState<CourseDetail | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [topCourseState, setTopCourseState] = useState([]);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [comment, setComment] = useState<Array<any>>([]);

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
      const [courseDetail, courseComments , topCourse]  = await Promise.all([
        getCourseById(params.id),
        getCommentById(params.id),
        GetTopCoursesApi()
      ]);
      setTopCourseState(topCourse)
      setDetail(courseDetail);
      setComment(courseComments);
    };
    fetchData();
  }, [params.id]);

  const toggleSection = (section: "detail" | "comment") => {
    if (section === "detail") {
      setShowDetail(true);
      setShowComment(false);
    } else {
      setShowDetail(false);
      setShowComment(true);
    }
  };

  const formatDescription = (text : string) => {
    if (!text) return "";

    const sentences = text
      .split(".")
      .filter(Boolean)
      .map((sentence) => sentence.trim());

    return (
      <ul>
        {sentences.map((sentence, index) => (
          <li key={index}>{sentence.trim()}.</li>
        ))}
      </ul>
    );
  };

  if (!detail) {
    return null;
  }

  const path = [`دوره های اموزشی > ${detail.title}`];
  const title = "توضیحات دوره";

  const totalVotes = detail.likeCount + detail.dissLikeCount;
  const likeRatio = totalVotes > 0 ? detail.likeCount / totalVotes : 0;
  const score = totalVotes > 0 ? 1 + 4 * likeRatio : 1;
  const formattedCost = (detail.cost / 10000).toFixed(0);
  const duration = `${DateConvert(detail.startTime)} - ${DateConvert(
    detail.endTime
  )}`;
  const hasExams = false;
  const hasCertificate = true;
  const graduationDate = new Date(detail.endTime).toLocaleDateString();

  return (
    <>
      <Header />
      <Breadcrumb path={path} title={title} />
      <div className="w-full h-auto flex flex-wrap justify-center mt-32 mb-32">
        <div className="w-[310px] h-[845px] flex justify-center flex-wrap bg-white dark:bg-gray-800 border border-[#DFDFDF] dark:border-gray-600 shadow-[0_0_14px_0] shadow-black rounded-xl items-center dark:text-white">
          <div className="bg-[#5751E1] h-[95px] text-white w-[250px] rounded-lg flex flex-wrap justify-center items-center">
            <h3 className="w-[90%]"> هزینه این دوره </h3>
            <h1 className="text-2xl w-full text-center">
              {formattedCost} تومان{" "}
            </h1>
          </div>
          <div className="w-[90%] h-[350px] flex flex-wrap justify-center ">
            <h3 className="font-semibold w-full"> دوره شامل: </h3>
            <div className="flex mt-4 justify-between items-center border-b border-[#D9D9D9] w-full h-[40px]">
              <p className="flex gap-1">
                {" "}
                <Image src={LevelPic} alt="" /> مرحله{" "}
              </p>
              <h5 className="text-[#7F7E97]"> {detail.courseStatusName} </h5>
            </div>
            <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
              <p className="flex gap-1">
                {" "}
                <Image src={TimePic} alt="" /> مدت زمان{" "}
              </p>
              <h5 className="text-[#7F7E97] text-[12px]"> {duration} </h5>
            </div>
            <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
              <p className="flex gap-1">
                {" "}
                <Image src={lessonPic} alt="" /> درس ها{" "}
              </p>
              <h5 className="text-[#7F7E97]"> {detail.techs.length} </h5>
            </div>
            <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
              <p className="flex gap-1">
                {" "}
                <Image src={TestPic} alt="" /> آزمون ها{" "}
              </p>
              <h5 className="text-[#7F7E97]">
                {" "}
                {hasExams ? "دارد" : "ندارد"}{" "}
              </h5>
            </div>
            <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
              <p className="flex gap-1">
                {" "}
                <Image src={CertificatePic} alt="" /> گواهینامه ها{" "}
              </p>
              <h5 className="text-[#7F7E97]">
                {" "}
                {hasCertificate ? "دارد" : "ندارد"}{" "}
              </h5>
            </div>
            <div className="flex justify-between mt-4 items-center border-b border-[#D9D9D9] w-full h-[40px]">
              <p className="flex gap-1">
                {" "}
                <Image src={StudentPic} alt="" /> فارغ التحصیلی{" "}
              </p>
              <h5 className="text-[#7F7E97]"> {graduationDate} </h5>
            </div>
          </div>
          <div className="w-[90%] h-[100px] border-b border-[#D9D9D9] flex justify-center flex-wrap">
            <h1 className="w-full"> پرداخت امن: </h1>
            <Image className="w-[250px] h-[35px] " src={PaymentPic} alt="" />
          </div>
          <div className="w-[90%] h-[105px] border-b flex flex-wrap justify-center border-[#D9D9D9]">
            <h1 className="w-full"> این دوره را به اشتراک بگذارید: </h1>
            <div className="w-full h-auto flex gap-3">
              <div className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center">
                <Image src={YoutubePic} alt="" />
              </div>
              <div className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center">
                <Image src={InstagramPic} alt="" />
              </div>
              <div className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center">
                <Image src={WhatsappPic} alt="" />
              </div>
              <div className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center">
                <Image src={TwiterPic} alt="" />
              </div>
              <div className="w-11 h-11 bg-[#E6E9EF] rounded-full flex justify-center items-center">
                <Image src={FacebookPic} alt="" />
              </div>
            </div>
          </div>
          <button
            onClick={() => AddCourseReserve(detail.courseId)}
            className="bg-[#FFC224] text-black font-bold flex gap-2 justify-center items-center h-[55px] w-[235px] border-2 border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D] rounded-[50px]"
          >
            {" "}
            ثبت نام در دوره <Image src={Arow} alt="" />
          </button>
        </div>
        <div className="w-[1080px] dark:text-white h-auto flex flex-wrap justify-center items-start ">
          <div className="w-[1050px] h-[470px] rounded-2xl overflow-hidden flex ">
            <Image
              src={detail.imageAddress || DefaultPic}
              alt={detail.title}
              height={235}
              width={1050}
            />
          </div>
          <div className="w-[90%] mt-8 flex gap-5 items-center">
            <div className="w-auto h-7 bg-[#EFEFF2] dark:text-gray-500 text-center p-1 rounded-[50px] content-center">
              {" "}
              {detail.courseLevelName}{" "}
            </div>
            <p className="flex gap-3">
              <Image src={ScorePic} alt="" /> امتیاز {`(${score})`}{" "}
            </p>
          </div>
          <h1 className="w-[90%] mt-3 text-[30px] text-[#161439] dark:text-white font-semibold">
            {" "}
            {detail.title}{" "}
          </h1>
          <div className="w-[90%] mt-8 flex gap-8 items-center text-[#7F7E97] dark:text-white">
            <div>
              توسط{" "}
              <span className="text-[#161439] dark:text-gray-600 "> {detail.teacherName} </span>
            </div>
            <div className="flex gap-2">
              <Image className="w-5 h-5" src={CalenderPic} alt="" />{" "}
              {DateConvert(detail.insertDate)}{" "}
            </div>
            <div className="flex gap-2">
              <Image className="w-5 h-5" src={StudentPic} alt="" />{" "}
              {detail.capacity} دانش اموز{" "}
            </div>
          </div>
          <div className="mt-14 w-[90%] flex gap-3">
          <button
              className={`w-[150px] h-[45px] rounded-[30px] ${
                showDetail
                  ? "bg-[#5751E1] text-white shadow-[4px_6px_0_0] shadow-[#050071]"
                  : "bg-[#E6E9EF] text-black dark:bg-gray-700 dark:text-white"
              }`}
              onClick={() => toggleSection("detail")}
            >
              برسی اجمالی
            </button>
            <button
              className={`w-[150px] h-[45px] rounded-[30px] ${
                showComment
                  ? "bg-[#5751E1] text-white shadow-[4px_6px_0_0] shadow-[#050071]"
                  : "bg-[#E6E9EF] text-black dark:bg-gray-700 dark:text-white"
              }`}
              onClick={() => toggleSection("comment")}
            >
              نظرات کاربران
            </button>
          </div>{" "}
          {showDetail && (
            <div className="w-[95%] mt-20 overflow-y-auto h-[605px] border border-[#DFDFDF] dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800">
            <div className="w-full mt-4 flex flex-wrap overflow-y-scroll justify-center text-[#6D6C80] dark:text-gray-300">
              <h1 className="w-[90%] text-2xl text-[#161439] dark:text-white"> شرح دوره </h1>
              <div className="w-[95%] mt-10">
                {formatDescription(detail.miniDescribe)}
              </div>
              <div className="w-[95%] mt-5">
                {formatDescription(detail.describe)}
              </div>
            </div>
          </div>
          )}
          {showComment && (
            <div className=" w-full h-[1065px] flex justify-center flex-wrap">
                    <h1 className="w-[85%] mt-20 text-[#161439] dark:text-gray-300 text-[24px]"> نظر {detail.commentCount} </h1>
                    <div className=" w-full h-[700px] overflow-y-scroll">
                              <CourseCommentWrapper Comment={comment} />
                    </div>
                    <AddComment/>
            </div>
          )}
          <div className="w-[95%] mt-56 h-[650px] flex justify-center gap-4 items-center">
            <CourseWrapper stateTopCourse={topCourseState} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
