import * as yup from "yup"

export const EditeProfileVal = yup.object().shape({
    fName: yup.string().required('فیلد نام الزامی است'),
    lName: yup.string().required('فیلد نام خانوادگی الزامی است'),
    nationalCode: yup.string().length(10, 'کد ملی باید 10 رقم باشد').required('فیلد کد ملی الزامی است'),
    birthDay: yup.date().required('فیلد تاریخ تولد الزامی است'),
    telegramLink: yup.string().url('لینک تلگرام معتبر نیست'),
    linkdinProfile: yup.string().url('لینک لینکدین معتبر نیست'),
    HomeAdderess: yup.string().required('فیلد آدرس الزامی است'),
  });