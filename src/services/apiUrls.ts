export const apiUrls = {
  user: {
    register: {
      method: "POST",
      url: "/user/register",
    },
    login: {
      method: "POST",
      url: "/user/login",
    },
    me: {
      method: "GET",
      url: "/user/me",
    },
  },
  office: {
    getState: {
      method: "GET",
      url: "/office/getState",
    },
    getDistrict: {
      method: "GET",
      url: "/office/getDistrict",
    },
    getPalika: {
      method: "GET",
      url: "/office/getPalika",
    },
    createFiscalYear: {
      method: "POST",
      url: "/office/createFiscal",
    },
    getFiscal: {
      method: "GET",
      url: "/office/getFiscal",
    },
    getFiscalById: {
      method: "GET",
      url: "/office/getFiscalYearById",
    },
    updateStatus: {
      method: "GET",
      url: "/office/updateFiscalYearStatus",
    },
  },
  request: {
    createRequest: {
      method: "POST",
      url: "/request/createRequest",
    },
    getRequest: {
      method: "GET",
      url: "/request/getRequest",
    },
    updateOpenStatus: {
      method: "GET",
      url: "/request/requestOpen",
    },
    getRequestById: {
      method: "GET",
      url: "/request/getRequestById",
    },
    declineRequest: {
      method: "POST",
      url: "/request/declineRequest",
    },
    accpetRequest: {
      method: "POST",
      url: "/request/acceptRequest",
    },
    getAcceptedRequest: {
      method: "GET",
      url: "/request/getAcceptedRequest",
    },
    getDeclinedRequest: {
      method: "GET",
      url: "/request/getDeclinedRequest",
    },
    generateCertificate: {
      method: "GET",
      url: "/request/generateCertificate",
    },
    getNewRequestCount: {
      method: "GET",
      url: "/request/getNewRequestCount",
    },
    getApprovedCount: {
      method: "GET",
      url: "/request/getApprovedCount",
    },
    getDeclinedCount: {
      method: "GET",
      url: "/request/getDeclinedCount",
    },
  },
  admin:{
    create:{
      method:"POST",
      url:"/admin/createAdmin"
    },
    login:{
      method:"POST",
      url:"/admin/adminLogin"
    },
    me:{
      method:"GET",
      url:"/admin/me"
    }
  }
};
