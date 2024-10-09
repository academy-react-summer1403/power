"use client"
import React from "react";
import { TopCourse } from "./index";

interface Course {
    id: number;
    title: string; 
    tumbImageAddress: string;
    lastUpdate: string;
    Hours: string;
    levelName: string;
    teacherName: string;
    likeCount: number;
    dissLikeCount: number;
    commandCount: number;
    describe: string;
    statusName: string;
    cost: string;
    courseId: number;
    typeName: string;
    isUserFavorite: boolean;
}

interface CourseWrapperProps {
    stateTopCourse: Course[];
}

export const CourseWrapper: React.FC<CourseWrapperProps> = ({ stateTopCourse }) => {
    return (
        <>
            {stateTopCourse.map((item) => (
                <TopCourse
                    key={item.id}
                    tumbImageAddress={item.tumbImageAddress}
                    title={item.title}
                    date={item.lastUpdate}
                    Hours={item.Hours}
                    NumerOfLessons={item.levelName} 
                    teacherName={item.teacherName}
                    likeCount={item.likeCount}
                    dissLikeCount={item.dissLikeCount}
                    describe={item.describe}
                    statusName={item.statusName}
                    typeName={item.typeName}
                    cost={item.cost}
                    id={item.courseId}
                    isUserFavorite={item.isUserFavorite}
                />
            ))}
        </>
    );
};
