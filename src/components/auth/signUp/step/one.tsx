"use client";

import { SignUpStepOne } from "@/core/validation/Auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import { Link } from "react-router-dom";
import Vector from "@/assets/landing/Vector.png";
import LoginPic from "@/assets/auth/Mobile login-amico 1.png";
import { AuthHeader } from "@/components/auth/authHeader";
import { SignUpS1Api } from "@/core/services/api/auth";
import toast from "react-hot-toast";

interface StepOneProps {
    setNumber: (number: string) => void;
    setCount: (count: number) => void;
}

export const StepOne: React.FC<StepOneProps> = ({ setNumber, setCount }) => {
    const Submit = async (value: { phoneOrGmail: string }) => {
        const phoneOrGmail = { phoneNumber: value.phoneOrGmail };
        setNumber(value.phoneOrGmail);
        
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

  return (
    <Formik
      initialValues={{phoneOrGmail:""}}
      validationSchema={SignUpStepOne}
      onSubmit={Submit}
    >
      <Form>
        <div className="bg-[#5751E1] h-auto md:h-screen flex justify-center items-center w-full">
          <div data-aos='zoom-in' className="w-[95%] flex-wrap h-auto lg:flex-nowrap md:w-[85%] 2xl:w-[1645px] lg:h-[85%] bg-white/50 rounded-[50px] flex">
            <div className="w-full md:w-[40%] h-full flex flex-wrap justify-center items-center bg-white rounded-[50px] p-8 md:p-20 shadow-[10px_8px_0_0] shadow-[#000000]">
              <h1 className="w-full  text-[30px] md:text-[35px] 2xl:text-[40px]">
                {" "}
                ثبت نام
              </h1>
              <p className=" w-full text-[#6D6C80] text-[16px] md:text-[20px] mb-4">
                جهت دریافت کد یک بار مصرف شماره تلفن خود را وارد کنید
              </p>
              <Field
                name="phoneOrGmail"
                className="bg-[#FBFBFB] w-full md:w-[480px] h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                placeholder="شماره مبایل خود را وارد کنید"
              />
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="phoneOrGmail"
              />
              <button className="w-full md:w-[480px] mt-10 h-[60px] rounded-[50px] bg-[#FFC224] border border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D]">
              دریافت کد یکبار مصرف
              </button>
              <div className="w-[460px] h-[100px] flex justify-between mt-28">
                <div>
                  <div className="w-[60px] h-[60px] bg-[#FFC224] rounded-full text-center content-center">
                    1
                  </div>{" "}
                  <p className="font-semibold text-black">شماره تماس</p>{" "}
                </div>
                <div>
                  <div className="w-[60px] h-[60px] bg-[#5751E1] text-white rounded-full text-center content-center">
                    2
                  </div>{" "}
                  <p className="font-semibold text-[#6D6C80]">دریافت کد</p>
                </div>
                <div>
                  <div className="w-[60px] h-[60px] bg-[#5751E1] text-white rounded-full text-center content-center">
                    3
                  </div>{" "}
                  <p className="font-semibold text-[#6D6C80]">مشخصات کاربری</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[60%] flex overflow-hidden items-end justify-end flex-wrap">
              <div className="w-full flex flex-wrap justify-center mt-4 md:mt-0">
                <AuthHeader />
                <h1 className=" h-24 w-full md:w-[500px] 2xl:w-[740px] text-[#161439] text-[24px] md:text-[35px] 2xl:text-[40px] font-semibold">
                  <div className="w-full flex">
                    {" "}
                    هرگز از{" "}
                    <div
                      className="w-[100px] lg:w-[215px] h-9 lg:h-14 text-[#FFFFFF] text-center content-center font-bold m-1"
                      style={{
                        backgroundImage: `url(${Vector.src})`,
                        backgroundSize: "cover",
                      }}
                    >
                      یادگیری
                    </div>
                  </div>
                  دست نکشید زندگی هرگز از آموزش دست نمی کشد
                </h1>
              </div>
              <Image
                className="w-[100%] md:w-[465px] h-auto"
                src={LoginPic}
                alt="Login Image"
              />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
