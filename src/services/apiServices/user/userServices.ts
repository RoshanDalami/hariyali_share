import { mainApi } from "@/services/apiHelpers";
import { apiUrls } from "@/services/apiUrls";

export async function Register(data: any) {
  let response = await mainApi(
    apiUrls?.user?.register?.method,
    apiUrls?.user?.register?.url,
    data
  );
  return response;
}

export async function Login(data: any) {
  let response = await mainApi(
    apiUrls?.user?.login?.method,
    apiUrls?.user?.login?.url,
    data
  );
  return response;
}

export async function Me() {
  let response = await mainApi(
    apiUrls?.user?.me?.method,
    apiUrls?.user?.me?.url
  );
  return response;
}
