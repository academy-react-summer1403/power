"use client"
import React from "react";
import { Course } from "./index";

interface CourseType {
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
    stateTopCourse: CourseType[];
}

export const CourseWrapper: React.FC<CourseWrapperProps> = ({ stateTopCourse }) => {
    return (
        <>
            {stateTopCourse && stateTopCourse.length > 0 ? (
                stateTopCourse.map(item => (
                    <Course
                        key={item.courseId} 
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
                ))
            ) : (
                <div className="text-center"> منتظر بمانید ... </div>
            )}
        </>
    );
};
