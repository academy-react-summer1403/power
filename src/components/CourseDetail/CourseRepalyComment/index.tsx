"use client"

import AcountDefualtPic from "@/assets/CourseDetail/images.png";
import { DateConvert } from "@/core/services/utils/date";
import Image from "next/image"
import React from "react"

interface CourseRepalyCommentProps {
  Img: string;
  author: string;
  Explanation: string;
  Date: string;
  }

export const ReplayComment: React.FC<CourseRepalyCommentProps> = ({
  Img,
  author,
  Explanation,
  Date,
}) => {

  const placeholderImage = AcountDefualtPic;
  const imageSrc =
    Img && (Img.startsWith("/") || Img.startsWith("http"))
      ? Img
      : placeholderImage;

    return (
        <div className="flex gap-2 w-full border-b border-gray-300 dark:border-gray-600 p-4">
        <div className="lg:flex hidden h-full justify-center w-[20%] items-center">
          <Image
            src={imageSrc}
            alt=""
            width={112}
            height={112}
            className="w-28 h-28 bg-cover rounded-full"
          />
        </div>
        <div className="flex flex-col w-[90%] p-3 justify-center flex-wrap">
          <div className="flex justify-between w-full">
            <h3 className="text-lg font-semibold dark:text-white">{author}</h3>
            <span className="text-gray-500 dark:text-gray-400">
              {DateConvert(Date)}
            </span>
          </div>
          <p className="my-2 w-full text-[#6D6C80] dark:text-gray-300">
            {Explanation}
          </p>
          <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400">
          </div>
        </div>
      </div>
    )
}