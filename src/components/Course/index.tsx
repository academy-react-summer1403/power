"use client";

import React from "react";
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
import { AddCourseFavoriteApi } from "@/core/services/api/landing";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
  isUserFavorite
}) => {
  const placeholderImage = DefualtPic;
  const imageSrc = tumbImageAddress || placeholderImage;
  const totalVotes = likeCount + dissLikeCount;
  const likeRatio = totalVotes > 0 ? likeCount / totalVotes : 0;
  const score = totalVotes > 0 ? 1 + 4 * likeRatio : 1;
  const formattedCost = (parseFloat(cost) / 10000).toFixed(0); 

  const AddCoursefavorite = async () => {
    const CouseId = id;
     const res = await AddCourseFavoriteApi(CouseId)
  }

  return (
    <Link to={``} className="w-[350px] h-[470px] relative p-6 flex justify-center flex-wrap rounded-xl bg-[#FFFFFF] border border-[#B5B5C380]">
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={190}
        className="rounded-xl h-[190px]  w-[300px]"
      />
      <div className=" absolute w-9 h-9 flex justify-center items-center cursor-pointer bg-white left-9 top-10 rounded-md" onClick={() => AddCoursefavorite()} >
                <Image src={isUserFavorite? FavotiteTruePic : FavoritePic } alt="" />
      </div>
      <div className="p-4 w-[95%]">
        <h2 className="text-xl font-semibold mt-4">{title}</h2>
        <div className="w-full h-auto flex justify-between items-center">
          <p className="text-sm w-[70px] bg-[#EFEFF1] mt-2 rounded-[50px] text-center">
            {NumerOfLessons}
          </p>
          <p className="text-sm flex gap-2">
            {score.toFixed(1)} <Image src={StarPic} alt="StartPic" />{" "}
          </p>
        </div>
        <div className="w-full h-auto mt-4 flex justify-between">
          <div className="flex gap-1 items-center">
            <Image className="w-4 h-4" src={StudentPic} alt="" /> {totalVotes}{" "}
          </div>
          <div className="flex gap-1 text-[#888888] font-medium">
            <Image src={TypeCoursePic} alt="" /> {typeName}{" "}
          </div>
        </div>
        <div className="w-full h-auto mt-4 flex justify-between">
          <div className="flex gap-1">
            <Image src={TeacherPic} alt="Teacher" />
            <p className="text-sm w-16 overflow-hidden text-ellipsis whitespace-nowrap">
              {teacherName}
            </p>
          </div>
          <div className="w-auto flex gap-1 h-auto font-medium">
            <button className="bg-[#EFEFF1] min-w-16 rounded-full flex items-center justify-center"> <Image src={DisLikePic} className="w-6 h-6" alt="" /> {dissLikeCount} </button>
            <button className="bg-[#EFEFF1] min-w-16 rounded-full flex items-center justify-center"> <Image src={LikePic} className="w-6 h-6" alt="" /> {likeCount} </button>
          </div>
        </div>
        <div className="w-full h-auto flex border-t border-[#E3E3F0] mt-6 justify-between">
          <p className=" font-bold text-[#888888] flex"> <Image src={CalenderPic} alt=""/> {DateConvert(date)}</p>
          <p className=" text-[#5F5F66] "> <span className="text-[#5751E1] font-bold"> {formattedCost} </span>  تومان </p>
        </div>

      </div>
    </Link>
  );
};
