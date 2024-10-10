import { BaseUrl } from "@/config";
import axios from "axios";
import toast from "react-hot-toast";

export const GetLandingApi = async () => {
    try {
        const res = await axios.get(`${BaseUrl}/Home/LandingReport`)
        return res.data;
    } catch (error) {
        console.log(error, "error")
    }
}

export const GetTopCoursesApi = async () => {
    try {
        const res = await axios.get(`${BaseUrl}/Home/GetCoursesTop/?Count=4`)
        return res.data;
    } catch (error) {
        console.log(error , "error")
    }
}

export const AddCourseFavoriteApi = async (CouseId : string) => {
    try {
        await axios.post(`${BaseUrl}/Course/AddCourseFavorite` , CouseId)
    } catch (error) {
        console.log(error , "error")
    }
}
export const GetNewsForLanding = async () => { 
    try {
      const res = await axios.get(`${BaseUrl}/News`); 
      return res.data;
    } catch (error) {
      console.error(error, "error");
    }
  };