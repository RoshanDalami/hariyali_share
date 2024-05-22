import React from "react";
import { ShareRequest } from "@/types/types";
export default function IndividualRequest() {
  const data: any = {
    name: "John Doe",
    grandFatherName: "William Doe",
    fatherName: "Robert Doe",
    motherName: "Mary Doe",
    spouseName: "Jane Doe",
    children: [
      {
        name: "Emily Doe",
        age: 10,
      },
      {
        name: "Michael Doe",
        age: 8,
      },
    ],
    citizenshipNo: "A12345678",
    citizenshipFrontImage: "citizenship_front.jpg",
    citizenshipBackImage: "citizenship_back.jpg",
    email: "john.doe@example.com",
    contactNumber: "+1234567890",
    shareRate: 50.5,
    shareQuantity: 100,
    totalShareAmount: 5050,
    permanentAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "Anystate",
      zipCode: "12345",
      country: "Anyland",
    },
    temporaryAddress: {
      street: "456 Secondary St",
      city: "Othertown",
      state: "Otherstate",
      zipCode: "67890",
      country: "Otherland",
    },
    isApproved: true,
    isDeleted: false,
    shareNumberStart: 1,
    shareNumberEnd: 100,
    isOpened: true,
    date: "2024-05-22",
  };

  return (
    <>
      <div className=" grid grid-cols-3   items-center mx-4 gap-x-24 gap-y-8 pt-4">
        <p>Name:{data.name}</p>
        <p>GrandFatherName:{data.grandFatherName}</p>
        <p>FatherName:{data.fatherName}</p>
        <p>MotherName:{data.motherName}</p>
        <p>spouseName:{data.spouseName}</p>
        {/* <p>spouseName:{data.children.map}</p> */}
        <p>citizenshipNo:{data.citizenshipNo}</p>
        <p>citizenshipFrontImage:{data.citizenshipFrontImage}</p>
        <p>citizenshipBackImage:{data.citizenshipBackImage}</p>
        <p>email:{data.email}</p>
        <p>shareRate: {data.shareRate}</p>
        <p>totalShareAmount:{data.totalShareAmount}</p>
        <p>permanentAddressStreet:{data.permanentAddress.street}</p>
        <p>permanentAddressCity:{data.permanentAddress.city}</p>
        <p>permanentAddressState:{data.permanentAddress.state}</p>
        <p>permanentAddressZipCode:{data.permanentAddress.zipCode}</p>
        <p>permanentAddressCountry:{data.permanentAddress.country}</p>
        <p>temporaryAddressStreet:{data.temporaryAddress.street}</p>
        <p>temporaryAddressCity:{data.temporaryAddress.city}</p>
        <p>temporaryAddressState:{data.temporaryAddress.state}</p>
        <p>temporaryAddressZipCode:{data.temporaryAddress.zipCode}</p>
        <p>temporaryAddressCountry:{data.temporaryAddress.country}</p>
        <p>permanentAddressCountry:{data.permanentAddress.country}</p>
        <p>isApproved:{data.isApproved}</p>
        <p> isDeleted:{data.isDeleted}</p>
        <p>shareNumberStart:{data.shareNumberStart}</p>
        <p> shareNumberEnd:{data.shareNumberEnd}</p>
        <p>isOpened:{data.isOpened}</p>
        <p> date : {data.date}</p>
        {/* <div className=""> */}
          {data.children.map((child: any, index: any) => (
            <p className="flex flex-gap-x-4" key={index}>
              Child Name: {child.name}<br></br>
              Age: {child.age}
            </p>
          ))}
        {/* </div> */}
      </div>
    </>
  );
}
