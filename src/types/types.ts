interface Address {
    stateId: number;
    districtId: number;
    palikaId: number;
    ward: string;
    tole: string;
    houseNo: string;
    _id: string;
  }
  
  interface Child {
    childrenName: string;
    _id: string;
  }
  
  export interface ShareRequest {
    _id: string;
    name: string;
    grandFatherName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    children: Child[];
    citizenshipNo: string;
    citizenshipFrontImage: string;
    citizenshipBackImage: string;
    email: string;
    contactNumber: string;
    shareRate: number;
    shareQuantity: number;
    totalShareAmount: number;
    permanentAddress: Address;
    temporaryAddress: Address;
    isApproved: boolean;
    isDeleted: boolean;
    shareNumberStart: number;
    shareNumberEnd: number;
    isOpened: boolean;
    date: string;
    shareCertificateNumber:string;
    remarks:string;
    __v: number;
  }
  

  export interface FiscalYear {
    _id:string,
    fiscalYear:string,
    startYear:number,
    endYear:number,
    startDate:string,
    endDate:string,
    status:boolean,
    __v:number
  }