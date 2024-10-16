import axios from "axios";
import http from "../interceptor";
import { BaseUrl } from "@/config";

interface NewsResponse {
  news: Array<any>; // Replace 'any' with the correct type based on your news structure
  totalCount: number;
}

export const getNews = async (
  page: number,
  sort: string,
  query: string,
  catId: string
): Promise<NewsResponse | null> => {
  try {
    const queryParams = [];
    if (page) queryParams.push(`PageNumber=${page}`);
    if (sort) queryParams.push(`SortingCol=${sort}`);
    if (query) queryParams.push(`query=${query}`);
    if (catId) queryParams.push(`NewsCategoryId=${catId}`);
    const url = `/News?&RowsOfPage=12&${queryParams.join("&")}`;
    const result = await axios.get(`${BaseUrl}${url}`);
    return result.data; 
  } catch (error) {
    console.error("Error fetching papers:", error);
    return null;
  }
};

export const getPaperCat = async (): Promise<Array<any> | null> => {
  try {
    const result = await axios.get(`${BaseUrl}/News/GetListNewsCategory`);
    return result.data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

export const getPaperCaById = async (id) => {
  try {
    //console.log("Fetching started...");

    const result = await http.get(`/News/${id}`);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCommentById = async (id) => {
  try {
    //console.log("Fetching started...");

    const result = await http.get(`/News/GetNewsComments?NewsId=${id}`);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const likedPaper = async (id) => {
  try {
    //console.log("Fetching started...");
    const result = await http.post(`/News/NewsLike/${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deletlikedPaper = async (id) => {
  console.log(id);
  try {
    //console.log("Fetching started...");
    const result = await http.delete("/News/DeleteLikeNews", { data: id });
    console.log("ss", data);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const newsDisLiked = async (id) => {
  try {
    console.log("Fetching started...");
    const result = await http.post(`/News/NewsDissLike/${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const newsFavorite = async (id) => {
  try {
    console.log("Fetching started...");
    const result = await http.post(`/News/AddFavoriteNews?NewsId=${id}`);
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const delNewsFavorite = async (id) => {
  try {
    console.log("Fetching started...");
    const result = await http.delete("/News/DeleteFavoriteNews", { data: id });
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getPaperCommentReplies = async (id) => {
  try {
    console.log("Fetching started...");

    const result = await http.get(`/News/GetRepliesComments?Id=${id}`);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addPaperComment = async (comment) => {
  try {
    console.log("Fetching started...");

    const result = await http.post("/News/CreateNewsComment", comment);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addPaperReplyComment = async (reply) => {
  try {
    console.log("Fetching started...");

    const result = await http.post("/News/CreateNewsReplyComment", reply);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getFavoriteNews = async () => {
  try {
    console.log("Fetching started...");

    const result = await http.get("/SharePanel/GetMyFavoriteNews");

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
