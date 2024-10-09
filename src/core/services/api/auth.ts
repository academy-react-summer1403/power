import { BaseUrl } from "@/config";
import axios from "axios";

interface User {
    phoneOrGmail: string;
    password: string;
    rememberMe: boolean;
}

export const LoginApi = async (user) => {
    try {
        const response = await axios.post(`${BaseUrl}/Sign/Login`, user);
        return response.data; 
    } catch (error) {
        console.error(error, "Error");
        throw error; 
    }
}