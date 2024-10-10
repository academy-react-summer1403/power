"use client";

import React from "react";

interface LandingNewsProps {
  Id: string;
  title: string;
  Img: string;
  Date: string;
  miniDescribe: string;
  View: number;
}

export const LandingNews: React.FC<LandingNewsProps> = ({ Id, title, Img, Date, miniDescribe, View }) => {
    return (
        <div className="w-[345px] overflow-hidden h-[470px] bg-white border border-[#B5B5C380] rounded-[10px]">
            <img src={Img} alt={title} className="w-full h-[200px] object-cover rounded-t-[10px]" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-500">{Date}</p>
                <p className="text-base">{miniDescribe}</p>
                <p className="text-sm text-gray-600">Views: {View}</p>
            </div>
        </div>
    )}