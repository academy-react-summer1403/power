import * as yup from "yup"

export const LoginValidation = yup.object().shape({
    phoneOrGmail: yup.string().required("لطفا نام کاربری خودرا وارد کنید"),
    password: yup.string().required("لطفا رمز وارد کنید"),
  });


export const SignUpStepOne = yup.object().shape({
    phoneOrGmail: yup.string().required("لطفا شماره خودرا وارد کنید"),
  });


  export const SignUpStepTwo = yup.object().shape({
    verifyCode: yup.string().required("Required").min(6, "Too Short!"),
  });


export const SignUpStepThree = yup.object().shape({
      password: yup.string().required("لطفا وارد کنید"),
    gmail: yup.string().required("لطفا وارد کنید"),
  });