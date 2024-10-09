"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Vector from "@/assets/landing/Vector.png";
import LoginPic from "@/assets/auth/Mobile login-amico 1.png";
import React from "react";
import Image from "next/image";
import { LoginValidation } from "@/core/validation/Auth";
import toast from "react-hot-toast";
import { setItem } from "@/core/services/common/storage.services";
import { LoginApi } from "@/core/services/api/auth";
import { Link } from "react-router-dom";
import HomePic from "@/assets/auth/Frame.png";
import AdimPic from "@/assets/auth/icons8-admin-48 1.png";

export const LoginContainer = () => {
  const OnSubmit = async (value) => {
    const user = {
      phoneOrGmail: value.phoneOrGmail,
      password: value.password,
      rememberMe: value.rememberMe,
    };

    try {
      const send = await LoginApi(user);

      if (send.success) {
        setItem("token", send.token);
        setItem("id", send.id);
        setItem("apiKey", send.apiKey);
        toast.success("با موفقیت لاگین کردید");
      } else {
        toast.error(send.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <Formik
      initialValues={{ phoneOrGmail: "", password: "", rememberMe: false }}
      validationSchema={LoginValidation}
      onSubmit={OnSubmit}
    >
      <Form>
        <div className="bg-[#5751E1] h-auto md:h-screen flex justify-center items-center w-full">
          <div className="w-[95%] flex-wrap h-auto lg:flex-nowrap md:w-[85%] 2xl:w-[1645px] lg:h-[85%] bg-white/50 rounded-[50px] flex">
            <div className="w-full md:w-[40%] h-full flex flex-wrap justify-center items-center bg-white rounded-[50px] p-8 md:p-20 shadow-[10px_8px_0_0] shadow-[#000000]">
              <h1 className="w-full  text-[30px] md:text-[35px] 2xl:text-[40px]">خوش اومدید!</h1>
              <p className=" w-full text-[#6D6C80] text-[16px] md:text-[20px] mb-4">
                {" "}
                برای ورود به حساب خود ایمیل یا شماره موبایل و رمز عبور خود را وارد کنید{" "}
              </p>
              <Field
                name="phoneOrGmail"
                className="bg-[#FBFBFB] w-full md:w-[480px] h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                placeholder="ایمیل خود را وارد کنید..."
              />
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="phoneOrGmail"
              />
              <Field
                name="password"
                className="bg-[#FBFBFB] mt-8 md:mt-0 w-full md:w-[480px] h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                placeholder="رمز عبور خود را وارد کنید..."
              />
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="password"
              />
              <div className="w-full flex flex-col md:flex-row justify-between items-center mt-4 mb-4">
                <div className="flex items-center gap-2">
                  <Field
                    className="outline-none  border-2 border-[#8E8E8E] rounded-sm"
                    name="rememberMe"
                    id="SavePass"
                    type="checkbox"
                  />{" "}
                  <label htmlFor="SavePass" className="ml-2">مرا به خاطر بسپار</label>{" "}
                </div>
                <Link to="/Forget" className="text-[#6D6C80] text-sm md:text-base">قراموشی رمز ؟</Link>
              </div>
              <button className="w-full md:w-[480px] h-[60px] rounded-[50px] bg-[#FFC224] border border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D]">
                ورود به حساب کاربری
              </button>
              <Link to="/SignUp" className="flex justify-center mt-4 text-sm md:text-base">
                حساب کاربری ندارید؟ <span className="font-bold"> ثبت نام </span>
              </Link>
            </div>
            <div className="w-full md:w-[60%] flex overflow-hidden items-end justify-end flex-wrap">
              <div className="w-full flex flex-wrap justify-center mt-4 md:mt-0">
                <div className="w-[90%] flex h-auto items-center justify-end gap-6 ">
                  <Link to="/SignUp">
                    <Image src={AdimPic} alt="Admin Icon" />
                  </Link>
                  <Link to="/">
                    <Image src={HomePic} alt="Home Icon" />
                  </Link>
                </div>
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
              <Image className="w-[100%] md:w-[465px] h-auto" src={LoginPic} alt="Login Image" />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
