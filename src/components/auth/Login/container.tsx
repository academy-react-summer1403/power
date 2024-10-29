"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { LoginValidation } from "@/core/validation/Auth";
import toast from "react-hot-toast";
import { setItem } from "@/core/services/common/storage.services";
import { LoginApi } from "@/core/services/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContent } from "../authDefualt";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 

export const LoginContainer = () => {
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#5751E1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  const [isLoading, setIsLoading] = useState(false); 

  const OnSubmit = async (value: {phoneOrGmail: string | number, password: string, rememberMe: boolean}) => {
    const user = {
      phoneOrGmail: value.phoneOrGmail,
      password: value.password,
      rememberMe: value.rememberMe,
    };

    setIsLoading(true); 
    const toastId = toast.loading("در حال ورود..."); 

    try {
      const send = await LoginApi(user);
      if (send.success) {
        setItem("token", send.token);
        setItem("id", send.id);
        setItem("apiKey", send.apiKey);
        navigate("/StudentPanel/dashboard")
        toast.success("با موفقیت لاگین کردید");
      } else {
        toast.error(send.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    } finally {
      setIsLoading(false); 
      toast.dismiss(toastId);
    }
  };

  return (
<div className="h-screen flex justify-center items-center relative overflow-hidden dark:bg-gray-900">
    {init && (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0"
      />
    )}
    <Formik
      initialValues={{ phoneOrGmail: "", password: "", rememberMe: false }}
      validationSchema={LoginValidation}
      onSubmit={OnSubmit}
    >
      <Form>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div data-aos='flip-up' className="w-[95%] flex-wrap h-auto lg:flex-nowrap md:w-[85%] 2xl:w-[1645px] lg:h-[85%] bg-white/50 dark:bg-gray-800 rounded-[50px] flex">
            <div className="w-full overflow-y-auto md:w-[40%] h-full flex flex-wrap justify-center items-center bg-white rounded-[50px] dark:bg-gray-700 p-8 md:p-20 shadow-[10px_8px_0_0] shadow-[#000000]">
              <h1 className="w-full text-[30px] md:text-[35px] 2xl:text-[40px] text-gray-900 dark:text-white">
                خوش اومدید!
              </h1>
              <p className="w-full text-[#6D6C80] dark:text-gray-300 text-[16px] md:text-[20px] mb-4">
                برای ورود به حساب خود ایمیل یا شماره موبایل و رمز عبور خود را وارد کنید
              </p>
              <Field
                name="phoneOrGmail"
                className="bg-[#FBFBFB] dark:bg-gray-600 w-full md:w-[480px] h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                placeholder="ایمیل خود را وارد کنید..."
              />
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="phoneOrGmail"
              />
              <div className="flex items-center bg-[#FBFBFB] w-full md:w-[480px] h-[60px] rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4 mt-8">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="p-2 outline-none flex-grow text-gray-900 dark:text-white"
                  placeholder="رمز عبور خود را وارد کنید..."
                />
                <button
                  type="button"
                  className="ml-2 text-gray-900 dark:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye className="text-[#5751E1]"/> : <FaEyeSlash className="text-[#5751E1]"/>}
                </button>
              </div>
              <ErrorMessage
                className="text-sm text-red-700"
                component={"p"}
                name="password"
              />

              <div className="w-full flex flex-col md:flex-row justify-between items-center mt-6 mb-4">
                <div className="flex items-center gap-2">
                  <Field
                    className="outline-none border-2 border-[#8E8E8E] dark:border-gray-500 rounded-sm"
                    name="rememberMe"
                    id="SavePass"
                    type="checkbox"
                  />
                  <label htmlFor="SavePass" className="ml-2 dark:text-white">
                    مرا به خاطر بسپار
                  </label>
                </div>
                <Link
                  to="/Forget"
                  className="text-[#6D6C80] dark:text-gray-300 text-sm md:text-base"
                >
                  فراموشی رمز؟
                </Link>
              </div>
              <button 
                type="submit"
                className={`w-full md:w-[480px] h-[60px] rounded-[50px] bg-[#FFC224] border border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? "در حال ورود..." : "ورود به حساب کاربری"}
              </button>
              <Link
                to="/SignUp"
                className="flex justify-center mt-4 text-sm gap-1 font-semibold text-[20px] md:text-base dark:text-gray-300"
              >
                حساب کاربری ندارید؟ <span className="font-bold text-[#050079] dark:text-[#FFC224]"> ثبت نام </span>
              </Link>
            </div>
            <AuthContent />
          </div>
        </div>
      </Form>
    </Formik>
  </div>
  );
};
