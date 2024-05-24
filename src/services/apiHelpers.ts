import axios from "axios";

// export const baseurl = 'http://localhost:8000/api/v1';
export const baseurl = 'https://hariyali-share-backend.onrender.com/api/v1';

export const mainApi = async(method:string,url:string,data?:string) =>{
    let response = await axios({
        method,
        url:`${baseurl}${url}`,
        data,
        headers:{
            Authorization:`Bearer`
        }
    });
    return response.data
}