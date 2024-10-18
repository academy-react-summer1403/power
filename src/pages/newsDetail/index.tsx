"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import { addNewsComment, getPaperDetail } from "@/core/services/api/news";
import DefaultPic from "@/assets/NewsDetail/blog_details.jpg.png";
import CommentPic from "@/assets/NewsDetail/comment.png";
import DatePic from "@/assets/NewsDetail/date.png";
import EyePic from "@/assets/NewsDetail/eye.png";
import TimePic from "@/assets/NewsDetail/time.png";
import CommaPic from "@/assets/NewsDetail/comma.svg";
import LikePic from "@/assets/NewsDetail/like.png";
import DisLikePic from "@/assets/NewsDetail/dislike.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateConvert } from "@/core/services/utils/date";
import { formatDescription } from "@/core/services/utils/formatDescription";
import { NewsAddComment } from "@/components/News/AddComment";
import { getItem } from "@/core/services/common/storage.services";
import toast from "react-hot-toast";
import { NewsCommentWrapper } from "@/components/News/NewsComment/CommentWrapper";
import { NewsWrapper } from "@/components/News/NewsWrapper";
import { GetNewsForLanding } from "@/core/services/api/landing";

interface NewsDetailProp {
  title: string;
  currentImageAddressTumb: string;
  likeCount: number;
  dissLikeCount: number;
  insertDate: string;
  currentView: number;
  commentsCount: number;
  miniDescribe: string;
  describe: string;
  newsCatregoryName: string;
}

export const NewsDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [detail, setDetail] = useState<NewsDetailProp | null>(null);
  const [readingTime, setReadingTime] = useState<string>("");
  const [comment, setComment] = useState([])
  const [newsList, setNewsList] = useState([])

  const getNewsDetail = async () => {
    const res = await getPaperDetail(params.id);
    setDetail(res.detailsNewsDto);
    setComment(res.commentDtos)
  };

  const fetchNews = async () => {
    const result = await GetNewsForLanding();
    setNewsList(result.news ? result.news.slice(0, 3) : result.slice(0, 3));
  };

  const onSubmit = async (values: { Title: string; Describe: string }) => {
    const commentData = {
      newsId: params.id,
      title: values.Title,
      describe: values.Describe,
      userId: getItem("id"),
      userIpAddress: getItem("apiKey"),
    };

    toast.loading("لطفا منظر بمانید")

    try {
      await addNewsComment(commentData);
      toast.success("نظر با موفقیت اضافه شد")
    } catch (error) {
      toast.error("خطا" + error)
    }
    finally{
        toast.dismiss
    }
  };

  useEffect(() => {
    fetchNews();
    getNewsDetail();
  }, [params.id]);

  useEffect(() => {
    if (detail) {
      const totalText = `${detail.miniDescribe} ${detail.describe}`;
      const numberOfWords = totalText.split(/\s+/).length;
      const wordsPerMinute = 250;
      const minutes = Math.ceil(numberOfWords / wordsPerMinute);
      setReadingTime(`${minutes} دقیقه`);
    }
  }, [detail]);

  const path = [`وبلاگ ها > ${detail?.title}`];
  const title = "توضیحات خبر";

  return (
    <>
      <Header />
      <div className="h-auto w-full flex flex-wrap justify-center gap-8">
        <Breadcrumb path={path} title={title} />
        <div className="w-[315px] mt-32 h-[465px] bg-[#F7F7F9] rounded-xl"></div>
        
        <div className="mt-32 mb-8 w-[1080px] h-auto flex flex-wrap justify-center overflow-hidden ">
          <Image
            className="mt-5 h-[300px] object-cover contrast-75 rounded-xl"
            src={detail?.currentImageAddressTumb || DefaultPic}
            alt={detail?.title || "News Default Image"}
            width={1050}
            height={200}
          />
          <div className="w-[90%] mt-5 mb-4 flex gap-2 lg:gap-0 flex-wrap lg:flex-nowrap justify-between items-center">
            <div className="flex items-center gap-4 text-[#6D6C80] content-center">
              <div className="bg-[#5751E1] w-auto p-1 rounded-xl text-white">
                {detail?.newsCatregoryName}
              </div>
              <p className="flex gap-1">
                <Image className="w-5 h-5" src={TimePic} alt="Date" /> 
                {DateConvert(detail?.insertDate)} 
              </p>
              <h4 className="flex gap-1">
                <Image className="w-5 h-5" src={EyePic} alt="Views" /> 
                {detail?.currentView} 
              </h4>
            </div>
            <div className="flex gap-5 items-center content-center">
              <div className="flex gap-1">
                <Image className="w-5 h-5" src={DatePic} alt="Reading Time" />
                {readingTime} خواندن 
              </div>
              <div className="flex gap-1">
                <Image className="w-5 h-5" src={CommentPic} alt="Comments" /> 
                {detail?.commentsCount} نظر
              </div>
            </div>
          </div>
          <h1 className="w-[90%] overflow-y-auto text-[36px] text-[#161439] mb-6">
            {detail?.title} 
          </h1>

          <div className="w-[90%] h-[110px] overflow-y-auto text-[#6D6C80]">
            {detail?.miniDescribe} 
          </div>
          <div className="w-[85%] h-[150px] flex justify-center items-center bg-[#EFEEFE] border-r-[6px] border-[#5751E1]">
            <div className="w-[70%] h-full gap-14 content-center p-2">
              {detail?.describe.length > 100
                ? `${detail?.describe.substring(0, 100)}...`
                : detail?.describe} 
            </div>
            <Image src={CommaPic} className="w-16 h-16 bg-cover " alt="Comma" />
          </div>
          <div className="w-[90%] h-[110xp] overflow-y-auto text-[#6D6C80] mb-5 border-b-2 border-[#E8E8E8] mt-16 p-3">
            {formatDescription(detail?.describe)}
          </div>
          <div className="h-24 w-[90%] p-4 flex gap-6 border-b-2 border-[#E8E8E8]">
            <p className="text-black dark:text-white text-[18px] font-semibold">
              ایا از این مقاله راضی بودید ?
            </p>
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-[#EFEFF1] flex justify-center items-center cursor-pointer">
                <Image
                  src={LikePic}
                  className="w-5 h-6 "
                  alt="Like" />
              </div>
              <div className="w-9 h-9 rounded-full bg-[#EFEFF1] flex justify-center items-center cursor-pointer">
                <Image
                  src={DisLikePic}
                  className="w-5 h-6"
                  alt="Dislike" />
              </div>
            </div>
          </div>
          <div className="h-auto w-[90%] mt-7 mb-10">
            <h1 className="text-[18px] text-black mb-8"> بخش نظرات </h1>
            <NewsAddComment onSubmit={onSubmit} />
            <h1 className="text-[#161439] mt-8 mb-8 w-full text-[24px]"> نظر {detail?.commentsCount} </h1>
            <div className="w-full h-auto min-h-[400px] max-h-[650px] overflow-y-auto flex flex-wrap justify-center">
                  <NewsCommentWrapper Comment={comment}/>
            </div>
            <div className="w-full h-auto flex flex-wrap items-center justify-center min-h-[700px]">
                      <div className="w-full h-auto text-[36px] text-[#161439]">  
                              اخبار مرتبط
                      </div>
                      <div className="w-[1085px] overflow-x-auto h-auto min-h-[485px] flex justify-center gap-4 flex-wrap lg:flex-nowrap">
                              <NewsWrapper newsList={newsList} />
                      </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
