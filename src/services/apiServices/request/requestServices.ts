import { mainApi } from "@/services/apiHelpers";
import { apiUrls } from "@/services/apiUrls";

export async function CreateRequest(data: any) {
  let response = await mainApi(
    apiUrls?.request?.createRequest?.method,
    apiUrls?.request?.createRequest?.url,
    data
  );
  return response;
}

export async function GetRequest() {
  let response = await mainApi(
    apiUrls?.request?.getRequest?.method,
    apiUrls?.request?.getRequest?.url
  );
  return response;
}

export async function UpdateOpenStatus(id: string) {
  let response = await mainApi(
    apiUrls?.request?.updateOpenStatus?.method,
    apiUrls?.request?.updateOpenStatus?.url + `/${id ? id : ""}`
  );
  return response;
}

export async function GetRequestById(id: string) {
  let resposne = await mainApi(
    apiUrls?.request?.getRequestById?.method,
    apiUrls?.request?.getRequestById?.url + `/${id ? id : ""}`
  );
  return resposne;
}

export async function DeclineRequest(data: any) {
  let response = await mainApi(
    apiUrls?.request?.declineRequest?.method,
    apiUrls?.request?.declineRequest?.url ,
    data
  );
  return response;
}

export async function AcceptRequest(data: any) {
  let response = await mainApi(
    apiUrls?.request?.accpetRequest?.method,
    apiUrls?.request?.accpetRequest?.url,
    data
  );
  return response;
}

export async function GetAcceptedRequest(){
    let response = await mainApi(
        apiUrls?.request?.getAcceptedRequest?.method,
        apiUrls?.request?.getAcceptedRequest?.url,
    )
    return response
}

export async function GetDeclinedRequest(){
    let response = await mainApi(
        apiUrls?.request?.getDeclinedRequest?.method,
        apiUrls?.request?.getDeclinedRequest?.url,
    );
    return response
}

export async function GenerateCertificate(id:string){
  let response = await mainApi(
    apiUrls.request.generateCertificate.method,
    apiUrls.request.generateCertificate.url+`/${id?id:''}`,
  )
  return response
}

export async function GetNewRequestCount(){
  let response = await mainApi(
    apiUrls.request.getNewRequestCount.method,
    apiUrls.request.getNewRequestCount.url,
  )
  return response
}

export async function GetApprovedCount(){
  let response = await mainApi(
    apiUrls.request.getApprovedCount.method,
    apiUrls.request.getApprovedCount.url,
  )
  return response
}
export async function GetDeclinedCount(){
  let response = await mainApi(
    apiUrls.request.getDeclinedCount.method,
    apiUrls.request.getDeclinedCount.url,
  )
  return response
}