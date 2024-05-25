import axios from "axios";
import Cookies from "js-cookie";
export const baseurl = 'http://localhost:8000/api/v1';
// export const baseurl = 'https://hariyali-share-backend.onrender.com/api/v1';
const token = Cookies.get('token')
export const mainApi = async(method:string,url:string,data?:any) =>{
    let response = await axios({
        method,
        url:`${baseurl}${url}`,
        data,
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data
}