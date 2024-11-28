import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  addProfileImage,
  deleteProfileImage,
  getProfile,
  selectProfileImage,
  updateProfile,
} from "@/core/services/api/userPanel";
import { UserInfoView } from "./components/userInfoView";
import { UserProfileForm } from "./components/userProfileForm";

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



  return showEdit ? (
    <UserProfileForm
      profileData={profileData}
      selectedImage={selectedImage}
      imageList={imageList}
      onSubmit={handleSubmit}
      handleDeleteImage={handleDeleteImage}
      handleAddImage={handleAddImage}
      handleSelectImage={handleSelectImage}
      setShowEdit={setShowEdit}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      setProfileData={setProfileData}
    />
  ) : (
    <UserInfoView
      profileData={profileData}
      DataState={DataState}
      setShowEdit={setShowEdit}
    />
  );
};


export default UserInfo;
