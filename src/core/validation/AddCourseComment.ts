import * as yup from "yup";


export const AddCommentValidation =yup.object().shape({
    Title:yup.string().required("این فیلد الزامی است"),
    Describe:yup.string().required("این فیلد الزامی است")
  })