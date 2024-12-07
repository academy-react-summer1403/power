"use client";

import Image from "next/image";
import React from "react";
import DefultPic from "@/assets/landing/course/defualtPic.png";
import { formatDescription } from "@/core/services/utils/formatDescription";
import { motion } from "framer-motion";
import { formatCostWithUnit } from "@/core/services/utils/formatCostWithUnit";

interface TopCourseProps {
  courseTitle: string;
  paymentStatus: string;
  courseId: string;
  describe: string;
  cost: number;
  tumbImageAddress: string;
}

export const PayCourse: React.FC<TopCourseProps> = ({
  tumbImageAddress,
  cost,
  describe,
  courseId,
  paymentStatus,
  courseTitle,
}) => {
  const Def = DefultPic;
  const imageSrc =
    tumbImageAddress &&
    (tumbImageAddress.startsWith("/") || tumbImageAddress.startsWith("http"))
      ? tumbImageAddress
      : Def;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-[1062px] rounded-xl flex h-[100px] border-[#B5B5C380] border"
    >
      <div className="w-[162px] flex justify-center items-center h-full">
        <Image
          width={124}
          height={69}
          className="w-[125px] h-[70px] rounded-md"
          src={imageSrc}
          alt=""
        />
      </div>
      <div className="w-full flex justify-around items-center h-full">
        <div className="flex flex-wrap h-full items-center w-[335px]">
          <h1 className="text-[#161439] text-[18px] h-[24px] overflow-auto ">
            {" "}
            {courseTitle}{" "}
          </h1>
          <div className="h-11 w-[330px] overflow-auto text-[#6D6C80] text-[13px]">
            {" "}
            {formatDescription(describe)}{" "}
          </div>
        </div>
        <div className="w-[200px] flex flex-wrap h-full items-center ">
          <div className="font-medium text-[#5F5F66] flex gap-2 items-center">
            <span className="font-bold text-[#5751E1] text-[20px]">
              {formatCostWithUnit(cost)}
            </span>{" "}
            تومان{" "}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
