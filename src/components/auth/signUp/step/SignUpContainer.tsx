import React, { useState } from "react";
import {SignUpStep} from "../SignUpStep"; 
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

export const SignUpContainer: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [number, setNumber] = useState<string | undefined>();

  const handleStepOneSubmit = async (values: { phoneOrGmail: string }) => {
    const phoneOrGmail = { phoneNumber: values.phoneOrGmail };
    setNumber(values.phoneOrGmail);
    
    const loadingToast = toast.loading("Sending verification code...");
    
    try {
        await SignUpS1Api(phoneOrGmail);
        setCount(2);
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong! Please try again.");
    } finally {
        toast.dismiss(loadingToast);
    }
  };

  const handleStepTwoSubmit = async (values: { verifyCode: string }) => {
    const Code = {
      phoneNumber: setNumber,
      verifyCode: Number(values.verifyCode),
    };

    const loadingToast = toast.loading("Sending verification code...");
    try {
      await SignUpS2Api(Code);
      setCount(3);
      toast.success("Verification code sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleStepThreeSubmit = async (values: { gmail: string; password: string }) => {
    const OBJ = {
      phoneNumber: setNumber, 
      gmail: values.gmail,
      password: values.password,
    };
    const loadingToast = toast.loading("Sending verification code...");
    try {
      await SignUpS3Api(OBJ);
      setCount(3);
      toast.success("Verification code sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      toast.dismiss(loadingToast);
      setCount(4);
    }
  };

  return (
    <>
      {count === 1 && (
        <SignUpStep
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
                          <h1 className=" w-full text-[36px] font-semibold text-center"> عملیات ثبت نام با موفقیت انجام شد </h1>

                          <Link to="/Login" className="w-auto p-5 h-auto bg-[#FFC224] rounded-[30px] shadow-[4px_4px_0_0_] shadow-[#3D3D3D]"> لطفا با زدن این دکمه به صفحه لاگین بروید و لاگین کنید  </Link>
             </div>
      )}
    </>
  );
};