"use client"

import React from "react";
import InfoPic from "@/assets/StudentPanel/Info.png";
import { DateConvert } from "@/core/services/utils/date";
import Image from "next/image";

interface Props {
  profileData: any | null;
  DataState: any;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProfileData {
    fName: string;
    lName: string;
    nationalCode: string;
    birthDay: string;
    gender: boolean;
    userAbout: string;
    telegramLink: string;
    linkdinProfile: string;
    HomeAdderess: string;
    latitude: number | null;
    longitude: number | null;
    currentPictureAddress: string;
    userImage: Array<{ id: string; pictureAddress: string; pictureName: string }>;
  }

export const UserInfoView: React.FC<Props> =({ profileData, DataState, setShowEdit }) => {

    const checkGender = (dataState: UserProfileData) => {
        return dataState.gender ? "مرد" : "زن";
      };

    return(
        <div className="w-full h-full flex justify-center items-center">
        <div className="w-[815px] relative h-[520px] flex items-center rounded-xl justify-center flex-wrap bg-[#C8C1ED26] shadow-[0_1px_3px_0] shadow-black">
          <div className="w-12 h-12 absolute -top-8 right-[5%] rounded-xl bg-[#5751E1] shadow-[4px_3px_0_0] shadow-black/25 border border-[#C8C1ED80] flex justify-center items-center overflow-hidden">
            {" "}
            <Image src={InfoPic} className="w-full h-full" alt="" />{" "}
          </div>
          <div className="w-1/2 h-[80%] overflow-hidden flex flex-wrap items-center justify-center">
            <div className="w-[90%] flex justify-between overflow-auto">
              <div>نام و نام خانوادگی : </div>
              <div>
                {" "}
                {DataState
                  ?  `${DataState.lName}${DataState.fName}`
                  : "نام موجود نیست"}
              </div>
            </div>
            <div className="w-[90%] flex justify-between">
              <div>کد ملی : </div>
              <div> {DataState?.nationalCode || "اطلاعات موجود نیست"} </div>
            </div>
            <div className="w-[90%] flex justify-between overflow-auto">
              <div>ایمیل :</div>
              <div> {DataState?.email || "اطلاعات موجود نیست"} </div>
            </div>
            <div className="w-[90%] flex justify-between">
              <div> تاریخ تولد : </div>
              <div>
                {" "}
                {DataState?.birthDay
                  ? DateConvert(DataState.birthDay)
                  : "اطلاعات موجود نیست"}{" "}
              </div>
            </div>
            <div className="w-[90%] flex justify-between">
              <div> جنسیت : </div>
              <div>
                {" "}
                {DataState ? checkGender(DataState) : "اطلاعات موجود نیست"}{" "}
              </div>
            </div>
            <div className="w-[90%] max-h-20 overflow-y-auto flex justify-between">
              <div>درباره من : </div>
              <div> {DataState?.userAbout || "اطلاعات موجود نیست"} </div>
            </div>
          </div>
          <div className="w-1/2 border-r overflow-hidden border-[#C8C1ED80] h-[80%] flex flex-wrap items-center justify-center">
            <div className="w-[90%] flex justify-between">
              <div>شماره همراه :</div>
              <div> {DataState?.phoneNumber || "اطلاعات موجود نیست"} </div>
            </div>
            <div className="w-[90%] flex justify-between">
              <div>تلگرام :</div>
              <div> {DataState?.telegramLink || "اطلاعات موجود نیست"} </div>
            </div>
            <div className="w-[90%] flex justify-between">
              <div>لینکداین :</div>
              <div> {DataState?.linkdinProfile || "اطلاعات موجود نیست"} </div>
            </div>
            <div className="w-[90%] flex flex-wrap h-[50%] p-5 items-center justify-between">
              <div className="w-full flex justify-between">
                {" "}
                <div>ادرس :</div>
                <div> {DataState?.homeAdderess || "اطلاعات موجود نیست"} </div>
              </div>
              <div className="w-full flex justify-between">
                {" "}
                <div>طول جفرافیایی :</div>
                <div> {DataState?.longitude || "اطلاعات موجود نیست"} </div>
              </div>
              <div className="w-full flex justify-between">
                {" "}
                <div>عرض جغرافیایی :</div>
                <div> {DataState?.latitude || "اطلاعات موجود نیست"} </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="bg-[#FFC224] rounded-[20px] w-[130px] h-8 shadow-[4px_4px_0_0] shadow-[#3D3D3D]"
          >
            ویرایش
          </button>
        </div>
      </div>
    )
}