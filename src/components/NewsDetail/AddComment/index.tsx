"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import React from "react";
import InputEmoji from "react-input-emoji";
import ArowPic from "@/assets/CourseDetail/arow.png";
import { AddCommentValidation } from "@/core/validation/AddCourseComment";
import { handleInputChange } from "@/core/validation/forbiddenWords";

interface AddNewsCommentProp {
  onSubmit: (values: { Title: string; Describe: string }) => Promise<void>;
}

export const NewsAddComment: React.FC<AddNewsCommentProp> = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={AddCommentValidation}
      onSubmit={(values) => onSubmit(values)}
      initialValues={{ Title: "", Describe: "" }}
    >
      {({ isSubmitting, setFieldValue, setFieldError, setFieldTouched }) => (
        <Form className="w-full h-auto flex flex-wrap items-center justify-center bg-[#F7F7FA] dark:bg-[#1F1F1F] rounded-xl mt-5 p-5">
          <h1 className="w-[90%] text-[30px] text-[#161439] dark:text-[#F7F7FA] font-semibold">
            ارسال نظر
          </h1>
          <div className="w-full max-w-[90%] mt-4">
            <h4 className="w-full text-[#6D6C80] dark:text-[#D1D1D1]">عنوان پیام</h4>
            <Field name="Title">
              {({ field }: any) => (
                <InputEmoji
                  value={field.value}
                  onChange={(value) => {
                    handleInputChange(
                      value,
                      (sanitizedValue) => setFieldValue("Title", sanitizedValue),
                      (errorMessage) => setFieldError("Title", errorMessage)
                    );
                  }}
                  onBlur={() => setFieldTouched("Title", true)}
                  placeholder="عنوان پیام را وارد کنید..."
                  cleanOnEnter={false}
                  className="p-3 w-full border rounded-md bg-white dark:bg-[#2C2C2C] dark:border-gray-600"
                />
              )}
            </Field>
            <ErrorMessage name="Title" component="p" className="text-red-500 mt-1" />
          </div>
          <div className="w-full max-w-[90%] mt-4">
            <h4 className="w-full text-[#6D6C80] dark:text-[#D1D1D1]">توضیحات بیشتر</h4>
            <Field name="Describe">
              {({ field }: any) => (
                <InputEmoji
                  value={field.value}
                  onChange={(value) => {
                    handleInputChange(
                      value,
                      (sanitizedValue) => setFieldValue("Describe", sanitizedValue),
                      (errorMessage) => setFieldError("Describe", errorMessage)
                    );
                  }}
                  onBlur={() => setFieldTouched("Describe", true)}
                  placeholder="توضیحات بیشتر را وارد کنید..."
                  cleanOnEnter={false}
                  className="p-3 w-full border rounded-md bg-white dark:bg-[#2C2C2C] dark:border-gray-600"
                />
              )}
            </Field>
            <ErrorMessage name="Describe" component="p" className="text-red-500 mt-1" />
          </div>
          <h4 className="w-full max-w-[90%] text-[#6D6C80] dark:text-[#D1D1D1] text-center mt-3">
            نظر شما پس از تایید توسط ادمین ثبت خواهد شد!
          </h4>
          <div className="w-full max-w-[90%] mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#FFC224] rounded-[50px] text-black flex justify-center items-center gap-2 w-full max-w-[210px] h-[55px] border-2 border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال نظر"}
              <Image src={ArowPic} alt="" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
