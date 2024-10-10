"use client";

import { SignUpStepThree } from "@/core/validation/Auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import Vector from "@/assets/landing/Vector.png";
import LoginPic from "@/assets/auth/Mobile login-amico 1.png";
import { AuthHeader } from "@/components/auth/authHeader";
import { SignUpS3Api } from "@/core/services/api/auth";
import toast from "react-hot-toast";

interface StepThreeProps {
  setNumber: (number: number) => void;
  setCount: (count: number) => void;
}

export const StepThree: React.FC<StepThreeProps> = ({ setNumber, setCount }) => {
  const Submit = async (value: { gmail: string; password: string }) => {
    const OBJ = {
      phoneNumber: setNumber, // Assuming you want to set it to some initial value
      gmail: value.gmail,
      password: value.password,
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
    <Formik
      initialValues={{ gmail: "", password: "" }}
      validationSchema={SignUpStepThree}
      onSubmit={Submit}
    >
      <Form>
        <div className="bg-[#5751E1] h-auto md:h-screen flex justify-center items-center w-full">
          <div className="w-[95%] flex-wrap h-auto lg:flex-nowrap md:w-[85%] 2xl:w-[1645px] lg:h-[85%] bg-white/50 rounded-[50px] flex">
            <div className="w-full md:w-[40%] h-full overflow-y-auto flex flex-wrap justify-center items-center bg-white rounded-[50px] p-8 md:p-20 shadow-[10px_8px_0_0] shadow-[#000000]">
              <h1 className="w-full text-[30px] md:text-[35px] 2xl:text-[40px]">
                ایمیل و پسورد را وارد کنید
              </h1>
              <p className="w-full text-[#6D6C80] text-[16px] md:text-[20px] mb-4">
                ایمیل و پسورد خود را وارد کنید
              </p>
              <Field
                name="gmail"
                className="bg-[#FBFBFB] w-full md:w-[480px] h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                placeholder="ایمیل خود را وارد کنید"
              />
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="gmail"
              />
              <Field
                name="password"
                className="bg-[#FBFBFB] w-full md:w-[480px] mt-3 h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                placeholder="رمز عبور"
              />
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="password"
              />
              <button className="w-full md:w-[480px] mt-3 h-[60px] rounded-[50px] bg-[#FFC224] border border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D]" type="submit">
                تکمیل ثبت نام
              </button>
              <div className="w-[460px] h-[100px] flex justify-between mt-28">
                <div>
                  <div className="w-[60px] h-[60px] bg-[#5751E1] text-white rounded-full text-center content-center">
                    1
                  </div>
                  <p className="font-semibold text-[#6D6C80]">شماره تماس</p>
                </div>
                <div>
                  <div className="w-[60px] h-[60px] bg-[#5751E1] text-white rounded-full text-center content-center">
                    2
                  </div>
                  <p className="font-semibold text-[#6D6C80]">دریافت کد</p>
                </div>
                <div>
                  <div className="w-[60px] h-[60px] bg-[#FFC224] rounded-full text-center content-center">
                    3
                  </div>
                  <p className="font-semibold text-black">مشخصات کاربری</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[60%] flex overflow-hidden items-end justify-end flex-wrap">
              <div className="w-full flex flex-wrap justify-center mt-4 md:mt-0">
                <AuthHeader />
                <h1 className="h-24 w-full md:w-[500px] 2xl:w-[740px] text-[#161439] text-[24px] md:text-[35px] 2xl:text-[40px] font-semibold">
                  <div className="w-full flex">
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