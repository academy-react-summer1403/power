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