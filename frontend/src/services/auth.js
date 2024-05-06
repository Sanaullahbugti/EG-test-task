
import axios from "axios";
const BASE_URL = "http://localhost:3001/";
const API = axios.create({ baseURL: BASE_URL });

export const signIn = async ({email, password}) => {
    try {
        return await axios.post(BASE_URL + "auth/login", { email, password });
    } catch (error) {
        
       throw {
        success:false,
        message:error?.response?.data?.message
       }
    }
};

export const signup = async ({email, password,name}) => {
    try {
        return await axios.post(BASE_URL + "auth/signup", { email, password,name });
    } catch (error) {
       throw {
        success:false,
        message:error?.response?.data?.message
       }
    }
};