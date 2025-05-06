import axios from "axios"

const LOGIN_URL =  import.meta.env.VITE_LOGIN_URL
const BASE_URL = import.meta.env.VITE_BASE_URL
export const httpService = axios.create({
    baseURL:BASE_URL
})

export const httpInterceptedService = axios.create({
    baseURL:BASE_URL,
    // headers: {
    //     'Content-Type': 'application/json', 
    //   },
})
httpInterceptedService.interceptors.response.use(
    (response) => response,
    async (error) =>{
        if(error.response?.status == 401){
            window.location.href ='login'
        } 
        return Promise.reject(error)
    }
)