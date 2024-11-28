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
    userLikeId: string;
    userIsLiked: boolean;
    userIsDissLiked: boolean;
}

interface CourseWrapperProps {
    stateTopCourse: CourseType[];
    viewMode: "flex" | "grid";
}

export const CourseWrapper: React.FC<CourseWrapperProps> = ({ stateTopCourse , viewMode }) => {
    return (
        <>
            {stateTopCourse && stateTopCourse.length > 0 ? (
                stateTopCourse.map((item , index) => (
                    <Course
                        viewMode={viewMode}
                        key={index} 
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
                        userLikeId={item.userLikeId}
                        userIsLiked={item.userIsLiked}
                        userIsDissLiked={item.userIsDissLiked}
                    />
                ))
            ) : (
                <div className="text-center"> منتظر بمانید ... </div>
            )}
        </>
    );
};
