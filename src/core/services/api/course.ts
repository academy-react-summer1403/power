import axios from "axios";
import { BaseUrl } from "@/config";
import http from "../interceptor";

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
  sort: string,
  SortType: string,
  search: string,
  cat: string,
  type: string,
  level: string,
  costDown: string,
  costUp: string,
  page: string,
  teacherId: number
) => {
  try {
    const queryParams = [];
    if (SortType) queryParams.push(`SortType=${SortType}`);
    if (page) queryParams.push(`PageNumber=${page}`);
    if (search) queryParams.push(`Query=${search}`);
    if (level) queryParams.push(`courseLevelId=${level}`);
    if (sort) queryParams.push(`SortingCol=${sort}`);
    if (cat.length) {
      if (cat.length) {
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
    if (teacherId) queryParams.push(`TeacherId=${teacherId}`);

    const url = `/Home/GetCoursesWithPagination?RowsOfPage=12&${queryParams.join(
      "&"
    )}`;
    const result = await axios.get(`${BaseUrl}${url}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetPayCourse = async (search: string, page: string) => {
  try {
    const queryParams = [];
    if (page) queryParams.push(`PageNumber=${page}`);
    if (search) queryParams.push(`Query=${search}`);

    const url = `/SharePanel/GetMyCourses?RowsOfPage=12&${queryParams.join(
      "&"
    )}`;
    const result = await http.get(`${url}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getallbypgCourseListt = async (search: string) => {
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
export const getCourseById = async (id: string) => {
  try {
    const result = await axios.get(
      `${BaseUrl}/Home/GetCourseDetails?CourseId=${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCommentById = async (id: string) => {
  try {
    //console.log("Fetching started...");

    const result = await axios.get(`${BaseUrl}/Course/GetCourseCommnets/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRepCommentById = async (id: string, CourseId: string) => {
  try {
    const result = await axios.get(
      `${BaseUrl}/Course/GetCourseReplyCommnets/${CourseId}/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addReserve = async (id: string) => {
  try {
    //console.log("Fetching started...");
    const objj = { courseId: id };
    const result = await http.post(`/CourseReserve/ReserveAdd`, objj);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const reserved = async () => {
  try {
    const res = await http.get("/SharePanel/GetMyCoursesReserve");
    if (res) {
      return res;
    } else {
      throw new Error("No data returned");
    }
  } catch (error) {
    console.log(error, "error");
    return null;
  }
};
export const liked = async (id: string) => {
  try {
    console.log("Fetching started...");
    const result = await http.post(`/Course/AddCourseLike?CourseId=${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const disLiked = async (id: string) => {
  try {
    console.log("Fetching started...");
    const result = await http.post(`/Course/AddCourseDissLike?CourseId=${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deletliked = async (data: string) => {
  try {
    console.log("Fetching started...");
    const result = await http.delete(`/Course/DeleteCourseLike`, {
      data: data,
    });

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const favorite = async (a: string) => {
  try {
    console.log("Fetching started...");
    const result = await axios.post(`${BaseUrl}/Course/AddCourseFavorite`, a);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addcomment = async (data: string) => {
  try {
    const result = await http.post(`/Course/AddCommentCourse`, data);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const repcomment = async (data: any) => {
  try {
    const result = await http.post(
      `/Course/AddReplyCourseComment`,
      data
    );

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const likedCourseCmnt = async (id: string) => {
  try {
    const result = await http.post(
      `${BaseUrl}/Course/AddCourseCommentLike?CourseCommandId=${id}`
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const disLikedCourseCmnt = async (id: string) => {
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
export const deleteCourseComment = async (id = String) => {
  try {
    await http.delete(`/Course/DeleteCourseComment?CourseCommandId=${id}`);
  } catch (error) {
    console.log(error, "error");
  }
};
export const deleteLikedCourseCmnt = async (id: string) => {
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
// GetTeacherDetailForCourseDetail
export const GetTeacherDetailById = async (id: string) => {
  try {
    const res = await axios.get(
      `${BaseUrl}/Home/GetTeacherDetails?TeacherId=${id}`
    );
    res.data;
  } catch (error) {
    console.log(error, "Error");
  }
};

export const GetMyCourseComment = async () => {
  try {
    const res = await http.get("/SharePanel/GetMyCoursesComments");
    return res;
  } catch (error) {
    console.log(error, "Error");
    return null;
  }
};

export const GetMyNewsComment = async () => {
  try {
    const res = await http.get("/SharePanel/GetMyNewsComments");
    return res;
  } catch (error) {
    console.log(error, "Error");
    return null;
  }
};

export const AddCourseRate = async (id: String, RateNumber: number) => {
  try {
    const res = await http.post(
      `/Course/SetCourseRating?CourseId=${id}&RateNumber=${RateNumber}`
    );
    return res;
  } catch (error) {
    console.log(error, "Error");
    return [];
  }
};

export const StudentAddPeyment = async (data : string) => {
    try {
      const res = await http.post("CoursePayment/StudentAddPeyment" , data)
      return res;
    } catch (error) {
      console.log(error , "Error")
    }
}


export const GetTeacherCourses = async (id : string) => {
  try {
    const res = await http.get(`/Home/GetCoursesWithPagination?TeacherId=${id}`)
    return res
  } catch (error) {
    console.log(error ,"Error")
    return null
  }
}

