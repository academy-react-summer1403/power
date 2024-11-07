"use client";

import React, { useState } from "react";
import Image from "next/image";
import DefualtPic from "@/assets/landing/course/defualtPic.png";
import StarPic from "@/assets/landing/course/star.svg";
import TypeCoursePic from "@/assets/landing/course/level 1.png";
import StudentPic from "@/assets/landing/course/Students 1.png";
import TeacherPic from "@/assets/landing/course/coch 1.png";
import LikePic from "@/assets/landing/course/like.png";
import DisLikePic from "@/assets/landing/course/dislike.png";
import CalenderPic from "@/assets/landing/course/calender.svg";
import FavoritePic from "@/assets/landing/course/favorite.png";
import FavotiteTruePic from "@/assets/landing/course/favorite-true.png";
import { DateConvert } from "@/core/services/utils/date";
import { AddCourseFavoriteApi} from "@/core/services/api/landing";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { disLiked, liked } from "@/core/services/api/course";
import { getItem } from "@/core/services/common/storage.services";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { formatCostWithUnit } from "@/core/services/utils/formatCostWithUnit";

interface TopCourseProps {
  tumbImageAddress: string;
  title: string;
  date: string;
  Hours: string;
  NumerOfLessons: string;
  teacherName: string;
  dissLikeCount: number;
  likeCount: number;
  NumberOfStudents: number;
  cost: string;
  id: number;
  describe: string;
  statusName: string;
  typeName: string;
  isUserFavorite: boolean;
  userLikeId: string;
  userIsLiked: boolean;
  userIsDissLiked: boolean
}

export const Course: React.FC<TopCourseProps> = ({
  tumbImageAddress,
  title,
  date,
  Hours,
  NumerOfLessons,
  teacherName,
  dissLikeCount,
  likeCount,
  NumberOfStudents,
  cost,
  id,
  describe,
  statusName,
  typeName,
  isUserFavorite,
  userLikeId,
  userIsLiked,
  userIsDissLiked
}) => {
  const navigate = useNavigate();
  const [localIsUserFavorite, setLocalIsUserFavorite] = useState(isUserFavorite);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [localDislikeCount, setLocalDislikeCount] = useState(dissLikeCount);
  const [likedByUser, setLikedByUser] = useState(userIsLiked);
  const [dislikedByUser, setDislikedByUser] = useState(userIsDissLiked);

  const placeholderImage = DefualtPic;
  const imageSrc = (tumbImageAddress && (tumbImageAddress.startsWith('/') || tumbImageAddress.startsWith('http')))
    ? tumbImageAddress
    : placeholderImage;
  const totalVotes = localLikeCount + localDislikeCount;
  const likeRatio = totalVotes > 0 ? localLikeCount / totalVotes : 0;
  const score = totalVotes > 0 ? 1 + 4 * likeRatio : 1;


  const AddCoursefavorite = async () => {
    const data = { courseId: id };
    if(getItem("token")){
    try {
      const loadingToast = toast.loading("Adding course to favorites...");
      const res = await AddCourseFavoriteApi(data);
      setLocalIsUserFavorite(true);
      toast.success("Course added to favorites!");
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.error("Failed to add to favorites.");
    }
  }
  else{
    toast.error("لطفا ابتدا وارد سایت شوید")
  }
  };

  const handleDoubleClick = () => {
    navigate(`/CourseDetail/${id}`);
  };

  const handleLike = async () => {
    if (!getItem("token")) return toast.error("لطفا ابتدا وارد سایت شوید");
    
    try {
      const loadingToast = toast.loading("Liking course...");
      const res = await liked(id);
      if (res.success) {
        setLocalLikeCount(prev => likedByUser ? prev - 1 : prev + 1);
        if (dislikedByUser) {
          setLocalDislikeCount(prev => prev - 1);
          setDislikedByUser(false);
        }
        setLikedByUser(!likedByUser);
        toast.success(res.message);
      } else {
        toast.error(res.ErrorMessage);
      }
      toast.dismiss(loadingToast);
    } catch {
      toast.error("Failed to like the course.");
    }
  };

  const handleDislike = async () => {
    if (!getItem("token")) return toast.error("لطفا ابتدا وارد سایت شوید");

    try {
      const loadingToast = toast.loading("Disliking course...");
      const res = await disLiked(id);
      if (res.success) {
        setLocalDislikeCount(prev => dislikedByUser ? prev - 1 : prev + 1);
        if (likedByUser) {
          setLocalLikeCount(prev => prev - 1);
          setLikedByUser(false);
        }
        setDislikedByUser(!dislikedByUser);
        toast.success(res.message);
      } else {
        toast.error(res.ErrorMessage);
      }
      toast.dismiss(loadingToast);
    } catch {
      toast.error("Failed to dislike the course.");
    }
  };

  return (
    <div
      className="card w-[350px] h-[470px] relative p-6 flex justify-center flex-wrap rounded-xl bg-white border border-[#B5B5C380] dark:bg-[#1F1F1F] dark:border-[#444444]"
      onDoubleClick={handleDoubleClick}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={190}
        className="rounded-xl h-[190px] w-[300px] cover-image"
      />
      <div className="absolute z-20 w-9 h-9 flex justify-center items-center cursor-pointer bg-white left-9 top-10 rounded-md dark:bg-[#2C2C2C]" onClick={AddCoursefavorite}>
        <Image src={localIsUserFavorite ? FavotiteTruePic : FavoritePic} alt="" />
      </div>
      <div className="p-4 w-[95%] wrapper">
        <h2 className="title text-xl font-semibold mt-4 text-black dark:text-white">{title}</h2>
        <div className="w-full h-auto flex justify-between items-center">
          <p className="text-sm w-[70px] bg-[#EFEFF1] mt-2 rounded-full text-center dark:bg-[#333333] dark:text-white">
            {NumerOfLessons}
          </p>
          <p className="text-sm flex gap-2 text-black dark:text-white">
            {score.toFixed(1)} <Image src={StarPic} alt="StarPic" />
          </p>
        </div>
        <div className="w-full h-auto mt-4 flex justify-between">
          <div className="flex gap-1 items-center text-black dark:text-white">
            <Image className="w-4 h-4" src={StudentPic} alt="" /> {totalVotes}
          </div>
          <div className="flex gap-1 text-[#888888] font-medium dark:text-gray-400">
            <Image src={TypeCoursePic} alt="" /> {typeName}
          </div>
        </div>
        <div className="w-full h-auto mt-4 flex justify-between">
          <div className="flex gap-1 text-black dark:text-white">
            <Image src={TeacherPic} alt="Teacher" />
            <p className="text-sm w-16 overflow-hidden text-ellipsis whitespace-nowrap">
              {teacherName}
            </p>
          </div>
          <div className="w-auto flex gap-1 h-auto font-medium">
          <button
              onClick={handleDislike}
              className="bg-[#EFEFF1] min-w-16 rounded-full flex items-center justify-center dark:bg-[#333333] dark:text-white"
            >
              {userIsDissLiked ? (
                <FaThumbsDown className="w-4 h-4 text-red-500" />
              ) : (
                <FaThumbsDown className="w-4 h-4 text-gray-600" />
              )}
              {localDislikeCount}
            </button>
            <button
              onClick={handleLike}
              className="bg-[#EFEFF1] min-w-16 rounded-full flex items-center justify-center dark:bg-[#333333] dark:text-white"
            >
              {userIsLiked ? (
                <FaThumbsUp className="w-4 h-4 text-blue-500" />
              ) : (
                <FaThumbsUp className="w-4 h-4 text-gray-600" />
              )}
              {localLikeCount}
            </button>
          </div>
        </div>
        <div className="w-full h-auto flex border-t border-[#E3E3F0] mt-6 justify-between dark:border-[#444444]">
          <p className="font-bold text-[#888888] flex dark:text-gray-400"><Image src={CalenderPic} alt=""/> {DateConvert(date)}</p>
          <p className="text-[#5F5F66] dark:text-white flex items-center gap-1"><span className="text-[#5751E1] font-bold text-xl flex">{formatCostWithUnit(cost)}</span> تومان</p>
        </div>
      </div>
    </div>

  );
};
