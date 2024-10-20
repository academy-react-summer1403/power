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
import { NewsRelated } from "@/components/NewsDetail/newsRelated";
import { NewsDetailContent } from "@/components/NewsDetail/newsDetailContent";
import { Loading } from "@/components/loading";
import { NewsContainer } from "@/components/NewsDetail/container";

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
  const [comment, setComment] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [sortedComments, setSortedComments] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const getNewsDetail = async () => {
    const res = await getPaperDetail(params.id);
    setDetail(res.detailsNewsDto);
    setComment(res.commentDtos);
    setSortedComments(res.commentDtos);
  };

  const sortComments = (comments, option) => {
    switch (option) {
      case "newest":
        return [...comments].sort(
          (a, b) => new Date(b.insertDate) - new Date(a.insertDate)
        );
      case "mostLiked":
        return [...comments].sort(
          (a, b) => (b.likeCount || 0) - (a.likeCount || 0)
        );
      case "leastLiked":
        return [...comments].sort(
          (a, b) => (a.likeCount || 0) - (b.likeCount || 0)
        );
      default:
        return comments;
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setSortedComments(sortComments(comment, option)); // Update sorted comments
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

    toast.loading("لطفا منظر بمانید");

    try {
      await addNewsComment(commentData);
      toast.success("نظر با موفقیت اضافه شد");
    } catch (error) {
      toast.error("خطا" + error);
    } finally {
      toast.dismiss();
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

  if (!detail) {
    return <Loading />;
  }

  const path = [`وبلاگ ها > ${detail?.title}`];
  const title = "توضیحات خبر";

  return (
    <>
      <Header />
      <div className="h-auto w-full flex flex-wrap justify-center gap-8 bg-white dark:bg-gray-800">
        <Breadcrumb path={path} title={title} />
        <NewsContainer
          newsList={newsList}
          detail={detail}
          onSubmit={onSubmit}
          sortedComments={sortedComments}
          handleSortChange={handleSortChange}
          sortOption={sortOption}
        />
      </div>
      <Footer />
    </>
  );
};
