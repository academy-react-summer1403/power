import Image from "next/image";
import React, { useState } from "react";
import SecurePic from "@/assets/StudentPanel/secure.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // برای اعتبار سنجی
import { changePass } from "@/core/services/api/userPanel";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("رمز عبور قدیمی الزامی است"),
    newPassword: Yup.string()
      .required("رمز عبور جدید الزامی است")
      .min(6, "رمز عبور جدید باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "تکرار رمز عبور باید با رمز عبور جدید مطابقت داشته باشد"
      )
      .required("تکرار رمز عبور الزامی است"),
  });

  const handleChangePassword = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const value = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    const response = await changePass(value);
    if (response) {
      toast.success("رمز عبور با موفقیت تغییر یافت");
    } else {
      toast.error("تغییر رمز عبور ناموفق بود");
    }
  };

  return (
    <div className="w-[855px] h-[530px] flex justify-center flex-wrap">
      <div className="flex w-[90%] items-center gap-2">
        <div className="w-[50px] h-[50px] rounded-xl bg-[#5751E1] overflow-hidden flex justify-center items-center">
          <Image src={SecurePic} className="w-full h-full" alt="" />
        </div>
        <div className="flex w-[150px] text-center font-semibold text-[20px] text-[#161439]">
          تنظیمات امنیتی
        </div>
        <div className="w-[90%] border-b border-[#F2F2F2]"></div>
      </div>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {() => (
          <Form className="w-full mt-4 grid grid-cols-3 gap-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="oldPassword" className="mb-1 font-medium">رمز عبور قدیمی:</label>
              <div className="flex items-center border rounded-md border-gray-300">
                <Field
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  className="p-2 outline-none flex-grow"
                />
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEye  className="text-[#5751E1]"/> : <FaEyeSlash className="text-[#5751E1]"/>}
                </button>
              </div>
              <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="newPassword" className="mb-1 font-medium">رمز عبور جدید:</label>
              <div className="flex items-center border rounded-md border-gray-300">
                <Field
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className="p-2 outline-none flex-grow"
                />
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEye className="text-[#5751E1]"/> : <FaEyeSlash className="text-[#5751E1]"/>}
                </button>
              </div>
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="confirmPassword" className="mb-1 font-medium">تکرار رمز عبور جدید:</label>
              <div className="flex items-center border rounded-md border-gray-300">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="p-2 outline-none flex-grow"
                />
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye className="text-[#5751E1]"/> : <FaEyeSlash className="text-[#5751E1]"/>}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="w-full flex flex-col justify-center">
            <button
              type="submit"
              className="bg-[#FFC224]  shadow-[4px_4px_0_0] shadow-[#3D3D3D] rounded-[25px]  w-[135px] h-[30px] "
            >
              تغییر رمز عبور
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Settings;
