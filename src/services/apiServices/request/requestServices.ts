import { mainApi } from "@/services/apiHelpers";
import { apiUrls } from "@/services/apiUrls";


export async function CreateRequest(data:any){
    let response = await mainApi(
        apiUrls?.request?.createRequest?.method,
        apiUrls?.request?.createRequest?.url,
        data
    )
    return response
}

export async function GetRequest(){
    let response = await mainApi(
        apiUrls?.request?.getRequest?.method,
        apiUrls?.request?.getRequest?.url,
    )
    return response
}

export async function UpdateOpenStatus(id:string){
    let response = await mainApi(
        apiUrls?.request?.updateOpenStatus?.method,
        apiUrls?.request?.updateOpenStatus?.url+`/${id?id:''}`,
    )
    return response
}