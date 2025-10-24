import React, { useState } from "react";
import { SignUpStep } from "../SignUpStep"; 
import {
  SignUpStepOne,
  SignUpStepTwo,
  SignUpStepThree,
} from "@/core/validation/Auth";
import {
  SignUpS1Api,
  SignUpS2Api,
  SignUpS3Api,
} from "@/core/services/api/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

export const SignUpContainer: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleStepOneSubmit = async (values: { phoneOrGmail: string }) => {
    const phoneOrGmail = values.phoneOrGmail;
    setPhoneNumber(phoneOrGmail);
    
    const loadingToast = toast.loading("در حال ارسال کد تأیید...");
    
    try {
      await SignUpS1Api(phoneOrGmail);
      setCount(2);
      toast.success("کد تأیید با موفقیت ارسال شد");
    } catch (error) {
      console.error(error);
      toast.error("مشکلی در ارسال کد پیش آمد! لطفاً مجدداً تلاش کنید.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleStepTwoSubmit = async (values: { verifyCode: string }) => {
    const verifyData = {
      phoneNumber: phoneNumber,
      verifyCode: Number(values.verifyCode),
    };

    const loadingToast = toast.loading("در حال تأیید کد...");
    try {
      await axios.post("https://sepehracademy.liara.run/Sign/VerifyMessage", verifyData);
      setCount(3);
      toast.success("کد با موفقیت تأیید شد!");
    } catch (error) {
      console.error(error);
      toast.error("کد نامعتبر است! لطفاً مجدداً تلاش کنید.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleStepThreeSubmit = async (values: { gmail: string; password: string }) => {
    const loadingToast = toast.loading("در حال تکمیل ثبت نام...");
    try {
      const signUpData = JSON.stringify({
        phoneNumber: phoneNumber,
        gmail: values.gmail,
        password: values.password,
      });
      
      await SignUpS3Api(signUpData);
      toast.success("ثبت نام با موفقیت انجام شد!");
      setCount(4);
    } catch (error) {
      console.error(error);
      toast.error("مشکلی در ثبت نام پیش آمد! لطفاً مجدداً تلاش کنید.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      {count === 1 && (
        <SignUpStep
          stepNumber={1} // اضافه کردن stepNumber
          initialValues={{ phoneOrGmail: "" }}
          validationSchema={SignUpStepOne}
          onSubmit={handleStepOneSubmit}
          stepTitle="ثبت نام"
          stepDescription="جهت دریافت کد یک بار مصرف شماره تلفن خود را وارد کنید"
          fieldNames={["phoneOrGmail"]}
          buttonLabel="دریافت کد یکبار مصرف"
        />
      )}
      {count === 2 && (
        <SignUpStep
          stepNumber={2} // اضافه کردن stepNumber
          initialValues={{ verifyCode: "" }}
          validationSchema={SignUpStepTwo}
          onSubmit={handleStepTwoSubmit}
          stepTitle="دریافت کد"
          stepDescription="کد ارسال شده برای شما را وارد کنید"
          fieldNames={["verifyCode"]}
          buttonLabel="تایید کد یکبار مصرف"
        />
      )}
      {count === 3 && (
        <SignUpStep
          stepNumber={3} // اضافه کردن stepNumber
          initialValues={{ gmail: "", password: "" }}
          validationSchema={SignUpStepThree}
          onSubmit={handleStepThreeSubmit}
          stepTitle="ایمیل و پسورد را وارد کنید"
          stepDescription="ایمیل و پسورد خود را وارد کنید"
          fieldNames={["gmail", "password"]}
          buttonLabel="تکمیل ثبت نام"
        />
      )}
      {count === 4 && (
        <div className="h-screen w-full flex flex-wrap justify-center items-center">
          <h1 className="w-full text-[36px] font-semibold text-center">
            عملیات ثبت نام با موفقیت انجام شد
          </h1>
          <Link 
            to="/Login" 
            className="w-auto p-5 h-auto bg-[#FFC224] rounded-[30px] shadow-[4px_4px_0_0_] shadow-[#3D3D3D] mt-4"
          >
            لطفا با زدن این دکمه به صفحه لاگین بروید و لاگین کنید
          </Link>
        </div>
      )}
    </>
  );
};