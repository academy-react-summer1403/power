"use client";

import React, { useRef } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import UserLocationMap from "./userLocationMap";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EditeProfileVal } from "@/core/validation/EditeProfile";
import AccountPic from "@/assets/StudentPanel/4a2ffe27f124d61856d4e3f78bc5a961.png";
import EditeProfPic from "@/assets/StudentPanel/editeInfo.png";
import { FaCheck, FaPlus } from "react-icons/fa";

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

interface Props {
  profileData: UserProfileData | null;
  selectedImage: string;
  imageList: Array<{ id: string; pictureAddress: string; pictureName: string }>;
  onSubmit: (values: UserProfileData) => void;
  handleDeleteImage: (imgId: string) => void;
  handleAddImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectImage: (imgId: string) => void;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileData: () => void;
}

export const UserProfileForm: React.FC<Props> = ({
  profileData,
  selectedImage,
  imageList,
  onSubmit,
  handleDeleteImage,
  handleAddImage,
  handleSelectImage,
  setShowEdit,
  isModalOpen,
  setIsModalOpen,
  setProfileData,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const datePickerOnChange = (date: any) => {
    const formattedDate = `${date.year}/${date.month}/${date.day}`;
    onSubmit({
      ...profileData,
      birthDay: formattedDate,
    } as UserProfileData);
  };

  const validateImageSrc = (src: string) => {
    return (
      src &&
      src !== AccountPic &&
      (src.startsWith("http") || src.startsWith("https") || src.startsWith("/"))
    );
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setProfileData((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          latitude: lat,
          longitude: lng,
        };
      }
      return {
        fName: "",
        lName: "",
        nationalCode: "",
        birthDay: "",
        gender: true,
        userAbout: "",
        telegramLink: "",
        linkdinProfile: "",
        HomeAdderess: "",
        latitude: lat,
        longitude: lng,
        currentPictureAddress: "",
        userImage: [],
      };
    });
  };

  return (
    <Formik
      initialValues={{
        fName: profileData?.fName || "",
        lName: profileData?.lName || "",
        nationalCode: profileData?.nationalCode || "",
        birthDay: profileData?.birthDay || "",
        gender: profileData?.gender ?? true,
        userAbout: profileData?.userAbout || "",
        telegramLink: profileData?.telegramLink || "",
        linkdinProfile: profileData?.linkdinProfile || "",
        HomeAdderess: profileData?.HomeAdderess || "",
        latitude: profileData?.latitude ?? 0,
        longitude: profileData?.longitude ?? 0,
      }}
      validationSchema={EditeProfileVal}
      onSubmit={onSubmit}
    >
      <Form className=" overflow-y-auto mb-20">
        <div className="flex w-full items-center gap-2 mb-4">
          <div className="w-[50px] h-[50px] rounded-xl bg-[#5751E1] overflow-hidden flex justify-center items-center">
            <Image src={EditeProfPic} className="w-full h-full" alt="" />
          </div>
          <div className="flex w-[150px] text-center font-semibold text-[20px] text-[#161439] dark:text-white">
            ویرایش پروفایل
          </div>
          <div className="w-[90%] border-b border-[#F2F2F2] dark:border-gray-600"></div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="lName"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  نام:
                </label>
                <Field
                  name="lName"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                />
                <ErrorMessage
                  name="lName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="fName"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  نام خانوادگی:
                </label>
                <Field
                  name="fName"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                />
                <ErrorMessage
                  name="fName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="nationalCode"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  کد ملی:
                </label>
                <Field
                  name="nationalCode"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                />
                <ErrorMessage name="nationalCode" component="div" />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="birthDay"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  تاریخ تولد:
                </label>
                <DatePicker
                  className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                  value={profileData ? profileData.birthDay : ""}
                  format="YYYY/MM/DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  onChange={(date) => datePickerOnChange(date)}
                />
                <ErrorMessage name="birthDay" component="div" />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="gender"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  جنسیت:
                </label>
                <Field
                  name="gender"
                  as="select"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value={true}>مرد</option>
                  <option value={false}>زن</option>
                </Field>
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="telegramLink"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  لینک تلگرام:
                </label>
                <Field
                  name="telegramLink"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                  type="text"
                />
                <ErrorMessage name="telegramLink" component="div" />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="linkdinProfile"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  لینک لینکدین:
                </label>
                <Field
                  name="linkdinProfile"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                  type="text"
                />
                <ErrorMessage name="linkdinProfile" component="div" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center flex-wrap">
            <div className="flex flex-col mb-4">
              <div className="flex items-center">
                <div onClick={() => setIsModalOpen(true)}>
                  <Image
                    width={128}
                    height={128}
                    className="rounded-full border border-[#F2F2F2] w-32 h-32"
                    src={
                      validateImageSrc(selectedImage)
                        ? selectedImage
                        : AccountPic
                    }
                    alt="Profile Picture"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <label
                  htmlFor="userAbout"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  درباره من:
                </label>
                <Field
                  name="userAbout"
                  as="textarea"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="HomeAdderess"
                  className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  آدرس:
                </label>
                <Field
                  name="HomeAdderess"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
                />
                <ErrorMessage name="HomeAdderess" component="div" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-24 h-24 overflow-hidden border border-gray-300 rounded-full mb-4">
              <UserLocationMap
                latitude={profileData?.latitude || 0}
                longitude={profileData?.longitude || 0}
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <button
            type="submit"
            className="bg-[#FFC224] rounded-[20px] w-[40%] h-10"
          >
            ارسال
          </button>
          <button
            type="button"
            onClick={() => setShowEdit(false)}
            className="bg-[#F5F5F5] text-black rounded-[20px] w-[40%] h-10 mt-2"
          >
            انصراف
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-4">
              {imageList.map((image) => (
                <div key={image.id} className="relative group">
                  <Image
                    src={image.puctureAddress}
                    alt={image.pictureName}
                    width={100}
                    height={100}
                    className="rounded-xl border"
                  />
                  <button
                    onClick={() => handleSelectImage(image.id)}
                    className="absolute top-2 left-2 w-8 h-8 bg-green-500 text-white rounded-full flex justify-center items-center"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex justify-center items-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleFileClick}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-full flex items-center"
            >
              <FaPlus className="mr-2" />
              افزودن تصویر
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleAddImage}
              className="hidden"
            />
          </div>
        </Modal>
      </Form>
    </Formik>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-40">
      <div className="modal-content w-[80%] h-[80%] bg-[#525252B2] p-5 rounded-md shadow-lg">
        <button className="w-7 h-7 rounded-full bg-[#B9B9B9] flex justify-center items-center">
          <span className="close cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </button>
        {children}
      </div>
    </div>
  );
};
