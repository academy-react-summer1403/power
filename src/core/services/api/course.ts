import { toast } from "react-hot-toast";
import axios from "axios";
import { BaseUrl } from "@/config";

export const getallCourseList = async () => {
  try {
    const url = "/Home/GetCoursesWithPagination";

    const result = await axios.get(`${BaseUrl}${url}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getallbypgCourseList = async (
  sort  : string,
  search  : string,
  cat  : string,
  type  : string,
  level  : string,
  costDown  : string,
  costUp  : string,
  page : string
) => {
  try {

    const queryParams = [];
    if (page) queryParams.push(`PageNumber=${page}`);
    if (search) queryParams.push(`Query=${search}`);
    if (level) queryParams.push(`courseLevelId=${level}`);
    if (sort) queryParams.push(`SortingCol=${sort}`);
    if (cat.length) {
      if (cat) {
        queryParams.push(`ListTech=${cat}`);
        queryParams.push(`TechCount=1`);
      }
    }

    if (type) queryParams.push(`CourseTypeId=${type}`);
    if (costUp) {
      queryParams.push(`CostUp=${costUp}`);
      if (!costDown) queryParams.push(`CostDown=0`);
    }
    if (costDown) queryParams.push(`CostDown=${costDown}`);

    const url = `/Home/GetCoursesWithPagination?RowsOfPage=12&${queryParams.join(
      "&"
    )}`;
    // console.log("tt",{ url });

    // const result = await axios.get(`/Home/GetCoursesWithPagination?Query=${search}&TechCount=1&courseLevelId=${level}&SortingCol=${sort}&ListTech=${cat}&CourseTypeId=${type}`);
    const result = await axios.get(`${BaseUrl}${url}`);
    //console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getallbypgCourseListt = async (search : string) => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(
      `${BaseUrl}/Home/GetCoursesWithPagination?Query=${search}`
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCat = async () => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/Home/GetTechnologies`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCourseType = async () => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/CourseType/GetCourseTypes`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCourseLevel = async () => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/CourseLevel/GetAllCourseLevel`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCourseById = async (id : string) => {
  //console.log(id);
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/Home/GetCourseDetails?CourseId=${id}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCommentById = async (id : string) => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/Course/GetCourseCommnets/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRepCommentById = async (a : string, b : string) => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/Course/GetCourseReplyCommnets/${a}/${b}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addReserve = async (id : string) => {
  try {
    //console.log("Fetching started...");
    const objj = { courseId: id };
    const result = await axios.post(`${BaseUrl}/CourseReserve/ReserveAdd`, objj);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const reserved = async () => {
  try {
    //console.log("Fetching started...");
    const result = await axios.get(`${BaseUrl}/SharePanel/GetMyCoursesReserve`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const liked = async (id : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(`${BaseUrl}/Course/AddCourseLike?CourseId=${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const disLiked = async (id : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(`${BaseUrl}/Course/AddCourseDissLike?CourseId=${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deletliked = async (data : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.delete(`${BaseUrl}/Course/DeleteCourseLike`, {
      data: data,
    });
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const topCourse = async () => {
  try {
    //console.log("Fetching started...");
    const result = await axios.get(`${BaseUrl}Home/GetCoursesTop?Count=5`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const favorite = async (a : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(`${BaseUrl}/Course/AddCourseFavorite`, a);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addcomment = async (data : string) => {
  try {
    //console.log("Fetching started...");
    const result = await axios.post(`${BaseUrl}/Course/AddCommentCourse`, data);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const repcomment = async (rc: string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(`${BaseUrl}/Course/AddReplyCourseComment`, rc);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const likedCourseCmnt = async (id : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(
      `${BaseUrl}/Course/AddCourseCommentLike?CourseCommandId=${id}`
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const disLikedCourseCmnt = async (id : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(
      `${BaseUrl}/Course/AddCourseCommentDissLike?CourseCommandId=${id}`
    );

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deletlikedCourseCmnt = async (id : string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.delete(
      `${BaseUrl}/Course/DeleteCourseCommentLike?CourseCommandId=${id}`
    );

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
