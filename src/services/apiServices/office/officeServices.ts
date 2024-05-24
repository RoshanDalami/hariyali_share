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

export async function CreateFiscal(data:any){
    let response = await mainApi(
        apiUrls?.office?.createFiscalYear.method,
        apiUrls?.office?.createFiscalYear.url,
        data
    )
    return response 
}

export async function GetFiscal(){
    let response = await mainApi(
        apiUrls.office.getFiscal.method,
        apiUrls.office.getFiscal.url 
    )
    return response
}

export async function GetFiscalById(id:string){
    let response = await mainApi(
        apiUrls.office.getFiscalById.method,
        apiUrls.office.getFiscalById.url+`/${id?id:''}`,
    )
    return response
}

export async function UpdateStatus(id:string){
    let response = await mainApi(
        apiUrls.office.updateStatus.method,
        apiUrls.office.updateStatus.url+`/${id?id:''}`,
    )
    return response
}