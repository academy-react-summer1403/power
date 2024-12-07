import * as yup from "yup";

export const AddCommentValidation = yup.object().shape({
    Title: yup.string()
        .required("این فیلد الزامی است")
        .min(10, "عنوان باید حداقل 10 کاراکتر باشد"),
    Describe: yup.string()
        .required("این فیلد الزامی است")
});