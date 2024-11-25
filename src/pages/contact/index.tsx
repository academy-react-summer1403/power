"use client";

import React, { useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import { LearningJourney } from "@/components/landing/body/learningJourney";
import { NewsletterSection } from "@/components/landing/body/newsletterSection";
import { ContactSection } from "@/components/contact/contactSection";
import { WhatWeOfferSection } from "@/components/contact/whatWeOfferSection";
import toast from "react-hot-toast";
import { AddOpinionForSite } from "@/core/services/api/more";

export const Contact = () => {
  const path = ["درباره ما"];
  const title = "ما کی هستیم";

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("ابتدا وارد حساب کاربری خود شوید!");
      return;
    }

    setIsLoading(true);

    const data = {
      title: titleInput,
      description: descriptionInput,
      userId,
    };

    const result = await AddOpinionForSite(data);
    setIsLoading(false);

    if (result) {
      toast.success("نظر شما با موفقیت ارسال شد!");
      setTitleInput("");
      setDescriptionInput("");
    } else {
      toast.error("ارسال نظر با خطا مواجه شد، دوباره امتحان کنید.");
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb path={path} title={title} />
      <ContactSection />
      <WhatWeOfferSection />
      <NewsletterSection />
      <LearningJourney />
      <div className="mt-10 mb-52 p-6 bg-[#1c1a2f] dark:bg-gray-700 rounded-lg shadow-md max-w-[85%] mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-[#5851d5] dark:text-white mb-4">
          ارسال نظر
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-[80%] flex flex-col items-center"
        >
          <div className="w-full mb-4">
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-[#acaadf] dark:text-gray-300"
            >
              عنوان
            </label>
            <input
              id="title"
              type="text"
              className="p-2 border w-full h-[50px] rounded bg-[#F7F7F9] dark:bg-gray-700 outline-none dark:border-gray-600 dark:text-white"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              required
            />
          </div>
          <div className="w-full mb-4">
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-[#acaadf] dark:text-gray-300"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              className="p-2 border w-full h-[100px] rounded bg-[#F7F7F9] dark:bg-gray-700 outline-none dark:border-gray-600 dark:text-white resize-none"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-[230px] h-[50px] flex justify-center items-center rounded-[50px] 
        text-white font-medium shadow-[4px_6px_0_0] shadow-[#050071]
        ${
          isLoading
            ? "bg-gray-400"
            : "bg-[#5751E1] hover:bg-[#4a46c1] dark:bg-[#6D6C80]"
        }`}
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "ارسال نظر"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};