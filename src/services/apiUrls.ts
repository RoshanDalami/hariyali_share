export const apiUrls = {
    office:{
        getState:{
            method:"GET",
            url:"/office/getState"
        },
        getDistrict:{
            method:"GET",
            url:"/office/getDistrict"
        },
        getPalika:{
            method:"GET",
            url:"/office/getPalika"
        }
    },
    request:{
        createRequest:{
            method:"POST",
            url:"/request/createRequest"
        },
        getRequest:{
            method:"GET",
            url:"/request/getRequest"
        },
        updateOpenStatus :{
            method:"GET",
            url:"/request/requestOpen"
        }
        
    }
}