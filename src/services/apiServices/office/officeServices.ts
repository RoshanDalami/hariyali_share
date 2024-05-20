import { apiUrls } from "@/services/apiUrls";
import { mainApi } from "@/services/apiHelpers";

export async function GetState(){
    let response = await mainApi(
        apiUrls.office.getState.method,
        apiUrls.office.getState.url,
    )
    return response
}

export async function GetDistrict(id:number){
    let response = await mainApi(
        apiUrls.office.getDistrict.method,
        apiUrls.office.getDistrict.url+`?stateId=${id}`,
    )
    return response
}

export async function GetPalika(id:number){
    let response = await mainApi(
        apiUrls.office.getPalika.method,
        apiUrls.office.getPalika.url+`?districtId=${id}`,
    )
    return response
}