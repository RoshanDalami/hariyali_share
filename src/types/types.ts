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
  interface Nominee {
    name: string;
    contactNumber: string;
    email: string;
    relation: string;
    citizenship: string;
    permanentAddress: Address;
    temporaryAddress: Address;
  }
  
  export interface ShareRequest {
    _id: string;
    name: string;
    nid:string;
    grandFatherName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    children: Child[];
    citizenshipNo: string;
    citizenshipFrontImage: string;
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
    personalImage:string
    __v: number;
    nominee:Nominee;
    voucherImage:'',
    dateOfBirth:'',
    pernamentStateName: string,
    tempStateName: string,
    pernamentDistrictName: string,
    tempDistrictName: string,
    pernamentPalikaName: string,
    tempPalikaName: string,
    nomineeTepmStateName: string,
    nomineeTempDistrictName: string,
    nomineeTempPalikaName: string
    shareApprovedDate:string
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