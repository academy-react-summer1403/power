import http from "../interceptor"

export const GetTeacherDetail = (id  :string) => {
    try {
        const res = http.get(`/Home/GetTeacherDetails?TeacherId=${id}`);
        return res
    } catch (error) {
        console.log(error , "Error getting")
        return null;
    }
}