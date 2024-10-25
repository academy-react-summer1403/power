import { DateConvert } from "@/core/services/utils/date";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoPic from "@/assets/StudentPanel/Info.png";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EditeProfileVal } from "@/core/validation/EditeProfile";
import EditeProfPic from "@/assets/StudentPanel/editeInfo.png";
import {
  addProfileImage,
  deleteProfileImage,
  getProfile,
  selectProfileImage,
  updateProfile,
} from "@/core/services/api/userPanel";
import AccountPic from "@/assets/StudentPanel/4a2ffe27f124d61856d4e3f78bc5a961.png";
import { UserLocationMap } from "./components/userLocationMap";

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

const UserInfo = () => {
  const { DataState } = useOutletContext();
  const [showEdit, setShowEdit] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageList, setImageList] = useState<
    Array<{ id: string; pictureAddress: string; pictureName: string }>
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkGender = (dataState: UserProfileData) => {
    return dataState.gender ? "مرد" : "زن";
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getProfile();
      if (res) {
        setProfileData(res);
        setSelectedImage(res.currentPictureAddress);
        setImageList(res.userImage || []);
      } else {
        setErrorMessage("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (values: UserProfileData) => {
    const Form = new FormData();
    Object.keys(values).forEach((key) => {
      Form.append(key, values[key]);
    });
    const response = await updateProfile(Form);
    if (response) {
      setShowEdit(false);
      fetchUserProfile();
    } else {
      setErrorMessage("Update failed");
    }
  };

  const handleDeleteImage = async (imgId: string) => {
    const response = await deleteProfileImage(imgId);
    if (response) {
      setImageList((prev) => prev.filter((image) => image.id !== imgId));
    }
  };

  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("formFile", file);
      const response = await addProfileImage(formData);
      if (response) {
        setImageList((prev) => [...prev, response]);
      }
    }
  };

  const handleSelectImage = async (imgId: string) => {
    const response = await selectProfileImage(imgId);
    if (response) {
      fetchUserProfile();
    }
  };

  const validateImageSrc = (src: string) => {
    return (
      src && 
      src !== AccountPic &&
      (src.startsWith("http") || src.startsWith("https") || src.startsWith("/"))
    );
  };

  // const handleLocationChange = (lat, lng) => {
  //   console.log("Updated coordinates:", lat, lng);
  //   setProfileData((prevState) => ({
  //     ...prevState,
  //     latitude: lat,
  //     longitude: lng,
  //   }));
  // };

  return showEdit ? (
    <Formik
      initialValues={{
        fName: profileData ? profileData.fName : "",
        lName: profileData ? profileData.lName : "",
        nationalCode: profileData ? profileData.nationalCode : "",
        birthDay: profileData ? profileData.birthDay.slice(0, 10) : "",
        gender: profileData ? profileData.gender : true,
        userAbout: profileData ? profileData.userAbout : "",
        telegramLink: profileData ? profileData.telegramLink : "",
        linkdinProfile: profileData ? profileData.linkdinProfile : "",
        HomeAdderess: profileData ? profileData.HomeAdderess : "",
        latitude:
          profileData && profileData.latitude != null
            ? profileData.latitude
            : 0,
        longitude:
          profileData && profileData.longitude != null
            ? profileData.longitude
            : 0,
      }}
      validationSchema={EditeProfileVal}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="flex w-[90%] items-center gap-2 mb-4">
          <div className="w-[50px] h-[50px] rounded-xl bg-[#5751E1] overflow-hidden flex justify-center items-center">
            <Image src={EditeProfPic} className="w-full h-full" alt="" />
          </div>
          <div className="flex w-[150px] text-center font-semibold text-[20px] text-[#161439]">
            ویرایش پروفایل
          </div>
          <div className="w-[90%] border-b border-[#F2F2F2]"></div>
        </div>
        <div className=" w-full flex  justify-between items-center ">
          <div className="w-1/2">
            {" "}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col">
                <label htmlFor="lName" className="mb-1 font-medium">
                  نام:
                </label>
                <Field
                  name="lName"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="lName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="fName" className="mb-1 font-medium">
                  نام خانوادگی:
                </label>
                <Field
                  name="fName"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="fName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="nationalCode" className="mb-1 font-medium">
                  کد ملی:
                </label>
                <Field
                  name="nationalCode"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="nationalCode" component="div" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="birthDay" className="mb-1 font-medium">
                  تاریخ تولد:
                </label>
                <Field
                  name="birthDay"
                  type="date"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="birthDay" component="div" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="gender" className="mb-1 font-medium">
                  جنسیت:
                </label>
                <Field
                  name="gender"
                  as="select"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value={true}>مرد</option>
                  <option value={false}>زن</option>
                </Field>
              </div>

              <div className="flex flex-col">
                <label htmlFor="telegramLink" className="mb-1 font-medium">
                  لینک تلگرام:
                </label>
                <Field
                  name="telegramLink"
                  className="p-2 border border-gray-300 rounded-md"
                  type="text"
                />
                <ErrorMessage name="telegramLink" component="div" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="linkdinProfile" className="mb-1 font-medium">
                  لینک لینکدین:
                </label>
                <Field
                  name="linkdinProfile"
                  className="p-2 border border-gray-300 rounded-md"
                  type="text"
                />
                <ErrorMessage name="linkdinProfile" component="div" />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center flex-wrap">
            {" "}
            <div className="flex flex-col mb-4">
              <div className="flex items-center">
                <div onClick={() => setIsModalOpen(true)}>
                  <Image
                    width={128}
                    height={128}
                    className="rounded-full w-32 h-32"
                    src={
                      validateImageSrc(selectedImage)
                        ? selectedImage
                        : "/default-image.png"
                    }
                    alt="Profile Picture"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="userAbout" className="mb-1 font-medium">
                  درباره من:
                </label>
                <Field
                  name="userAbout"
                  as="textarea"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            {" "}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label htmlFor="HomeAdderess" className="mb-1 font-medium">
                  آدرس:
                </label>
                <Field
                  name="HomeAdderess"
                  type="text"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="HomeAdderess" component="div" />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            {" "}
            <div className="w-24 h-24 overflow-hidden border border-gray-300 rounded-full mb-4">
              <UserLocationMap
                latitude={profileData?.latitude || 0}
                longitude={profileData?.longitude || 0}
                // onLocationChange={handleLocationChange}
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
          <div>
            <h2 className="text-xl mb-4">تصاویر پروفایل</h2>
            {imageList.length > 0 ? (
              imageList.map((image) => (
                <div
                  key={image.id}
                  className="flex items-center justify-between mb-2"
                >
                  {validateImageSrc(image.pictureAddress) ? (
                    <Image
                      src={image.pictureAddress}
                      width={50}
                      height={50}
                      alt={image.pictureName}
                    />
                  ) : (
                    <span>No Image Available</span>
                  )}
                  <div>
                    <button
                      onClick={() => handleSelectImage(image.id)}
                      className="text-blue-500 mr-2"
                    >
                      انتخاب
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <span>هیچ عکسی بارگذاری نشده است.</span>
            )}
            <input
              type="file"
              onChange={handleAddImage}
              className="mt-4"
              accept="image/*"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-[#FFC224] rounded-lg p-2"
            >
              بستن
            </button>
          </div>
        </Modal>
      </Form>
    </Formik>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[815px] relative h-[520px] flex items-center rounded-xl justify-center flex-wrap bg-[#C8C1ED26] shadow-[0_1px_3px_0] shadow-black">
        <div className="w-12 h-12 absolute -top-8 right-[5%] rounded-xl bg-[#5751E1] shadow-[4px_3px_0_0] shadow-black/25 border border-[#C8C1ED80] flex justify-center items-center overflow-hidden">
          {" "}
          <Image src={InfoPic} className="w-full h-full" alt="" />{" "}
        </div>
        <div className="w-1/2 h-[80%] flex flex-wrap items-center justify-center">
          <div className="w-[90%] flex justify-between">
            <div>نام و نام خانوادگی : </div>
            <div>
              {" "}
              {DataState
                ? ` ${DataState.lName}${DataState.fName}`
                : "نام موجود نیست"}{" "}
            </div>
          </div>
          <div className="w-[90%] flex justify-between">
            <div>کد ملی : </div>
            <div> {DataState?.nationalCode || "اطلاعات موجود نیست"} </div>
          </div>
          <div className="w-[90%] flex justify-between">
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
        <div className="w-1/2 border-r border-[#C8C1ED80] h-[80%] flex flex-wrap items-center justify-center">
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
  );
};

export default UserInfo;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-40">
      <div className="modal-content bg-white p-5 rounded-md shadow-lg">
        <span className="close cursor-pointer" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};
