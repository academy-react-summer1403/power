"use client";

import React from "react";
import { PayCourse } from ".";

interface CourseType {
  courseTitle: string;
  paymentStatus: string;
  courseId: string;
  describe: string;
  cost: number;
  tumbImageAddress: string;
}

interface CourseWrapperProps {
  stateCourse: CourseType[];
}

export const PayCourseWrapper: React.FC<CourseWrapperProps> = ({
  stateCourse,
}) => {
  return (
    <>
      {stateCourse && stateCourse.length > 0 ? (
        stateCourse.map((item , index) => (
          <PayCourse
            key={index}
            tumbImageAddress={item.tumbImageAddress}
            cost={item.cost}
            describe={item.describe}
            courseId={item.courseId}
            paymentStatus={item.paymentStatus}
            courseTitle={item.courseTitle}
          />
        ))
      ) : (
        <div className="text-center"> منتظر بمانید ... </div>
      )}
    </>
  );
};
