import * as yup from "yup"

export const LoginValidation = yup.object().shape({
    phoneOrGmail: yup.string().required("لطفا نام کاربری خودرا وارد کنید"),
    password: yup.string().required("لطفا رمز وارد کنید"),
  });