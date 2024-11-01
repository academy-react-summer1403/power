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
import {UserLocationMap} from "./components/userLocationMap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
    Object.entries(values).forEach(([key, value]) => {
      Form.append(key, value);
    });

    try {
      const response = await updateProfile(Form);
      if (response) {
        setShowEdit(false);
        await fetchUserProfile();
      } else {
        setErrorMessage("Update failed");
      }
    } catch (error) {
      setErrorMessage("Error updating profile: " + error);
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

  const datePickerOnChange = (date: any) => {
    const formattedDate = `${date.year}/${date.month}/${date.day}`;
    handleSubmit({
      ...profileData,
      birthDay: formattedDate,
    } as UserProfileData);
  };

  return showEdit ? (
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
  onSubmit={handleSubmit}
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
            <label htmlFor="lName" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              نام:
            </label>
            <Field
              name="lName"
              type="text"
              className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
            />
            <ErrorMessage name="lName" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="fName" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              نام خانوادگی:
            </label>
            <Field
              name="fName"
              type="text"
              className="p-2 border border-gray-300 rounded-md text-[#5751E1] dark:text-gray-200 dark:bg-gray-700 outline-none dark:border-gray-600"
            />
            <ErrorMessage name="fName" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="nationalCode" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
            <label htmlFor="birthDay" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
            <label htmlFor="gender" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
            <label htmlFor="telegramLink" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
            <label htmlFor="linkdinProfile" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
                  validateImageSrc(selectedImage) ? selectedImage : AccountPic
                }
                alt="Profile Picture"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="userAbout" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
            <label htmlFor="HomeAdderess" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
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
            <input type="file" onChange={handleAddImage} className="mt-4" />
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
  );
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
  children,
}) => {
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
export default UserInfo;