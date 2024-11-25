import axios from "axios"


export const ReportComment = async (data: {
  CommentTitle: string;
  ReasonForReport: string;
  CommentId: string;
  Date: string;
}) => {
  try {
    const res = await axios.post("https://673d05514db5a341d833bf75.mockapi.io/report/Comment-Report", data);
    return res.data;
  } catch (error) {
    console.log(error, "Error posting");
    return null;
  }
};

export const AddOpinionForSite = async (data) => {
  try {
    const res = await axios.post("https://66103a720640280f219ca24e.mockapi.io/card/Produc", data);
    return res.data;
  } catch (error) {
    console.log(error, "Error posting");
    return null;
  }
}