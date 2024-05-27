import { mainApi } from "@/services/apiHelpers";
import { apiUrls } from "@/services/apiUrls";

export async function CreateAdmin(data:any){
    let response = await mainApi(
        apiUrls?.admin.create.method,
        apiUrls?.admin.create.url,
        data 
    )
    return response
}
export async function LoginAdmin(data:any){
    let response = await mainApi(
        apiUrls.admin.login.method,
        apiUrls.admin.login.url,
        data
    )
    return response
}
export async function Me (){
    let response = await mainApi(
        apiUrls.admin.me.method,
        apiUrls.admin.me.url,
    )
    return response
}