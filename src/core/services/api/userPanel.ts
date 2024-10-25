import http from "../interceptor";


export const getfave = async () => {
  try {
    //console.log("Fetching started...");
    const result = await http.get(`/SharePanel/GetMyFavoriteCourses`);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deletFavorite = async (data: string) => {
      //console.log("ff",data);

  try {
    //console.log("Fetching started...");
    const result = await http.delete(`/Course/DeleteCourseFavorite`, {data});
    //console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deletReserve = async (data: string) => {

try {
const result = await http.delete(`/CourseReserve`, {data:data});
return result;
} catch (error) {
console.log(error);
return [];
}
};

export const changePass = async (user: string) => {
  try {
    const response = await http.post("/SharePanel/ChangePassword", user);

    return response;
  } catch (error) {
    return false;
  }
};

export const getProfile = async () => {
  try {
    const response = await http.get("/SharePanel/GetProfileInfo");
    return response;
  } catch (error) {
    return false;
  }
};

export const updateProfile = async (user: string) => {
  try {
    const response = await http.put("/SharePanel/UpdateProfileInfo", user);

    return response;
  } catch (error) {
    return false;
  }
};

export const getMyCourse = async () => {
  try {
    const response = await http.get("/SharePanel/GetMyCourses");

    return response.data;
  } catch (error) {
    return false;
  }
};

export const getNewCourse = async () => {
  try {
    const res = await http.get("/Home/GetCoursesTop?Count=3")
    return res;
  } catch (error) {
    console.log(error , "error")
  }
}

export const addProfileImage = async (image: string) => {
  try {
    const response = await http.post("/SharePanel/AddProfileImage", image);

    return response;
  } catch (error) {
    return false;
  }
};

export const selectProfileImage = async (imgId: number) => {
  try {
    const response = await http.post("/SharePanel/SelectProfileImage", imgId);

    return response;
  } catch (error) {
    return false;
  }
};

export const deleteProfileImage = async (imgId: number) => {
  try {
    const response = await http.delete("/SharePanel/DeleteProfileImage", {
        imgId,
    });

    return response;
  } catch (error) {
    return false;
  }
};
