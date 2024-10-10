import { BaseUrl } from "@/config";
import axios from "axios";

interface User {
    phoneOrGmail: string;
    password: string;
    rememberMe: boolean;
}

export const LoginApi = async (user : any) => {
    try {
        const response = await axios.post(`${BaseUrl}/Sign/Login`, user);
        return response.data; 
    } catch (error) {
        console.error(error, "Error");
        throw error; 
    }
}

export const SignUpS1Api = async (phoneOrGmail : string) => {
try {
    await axios.post(`${BaseUrl}/Sign/SendVerifyMessage` , phoneOrGmail)
} catch (error) {
    console.log(error, "Error");
}
}


export const SignUpS2Api = async (Code :  number) => {
try {
    await axios.post(`${BaseUrl}/Sign/VerifyMessage` , Code)
} catch (error) {
    console.log(error, "Error");
}
}

export const SignUpS3Api = async (OBJ :  string) => {
try {
    await axios.post(`${BaseUrl}/Sign/Register` , OBJ)
} catch (error) {
    console.log(error, "Error");
}
}

