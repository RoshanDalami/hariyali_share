import React from "react";
interface Item {
  name: string;
  desc: string;
}
const Page = () => {
  const arr = [
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
    {
      name: "This is a formal email message that will let you know when shit is done",
      desc: "this is me",
      date: "April 5,2024",
    },
  ];

  return (
    <>
      {arr?.map((item, index) => {
        return (
          <div
            className=" flex justify-between w-[1225px] h-[40px] bg-white border-b-2 border-b-gray-100  text-center  hover:shadow-2xl hover:pointer hover:bg-[#F2F6FC] hover:text-black hover:font-semibold p-2 "
            key={index}>
            <div className="ml-4  text-[14px]">{item.name}</div>
            <div className="text-[12px]">{item.date}</div>
          </div>
        );
      })}
    </>
  );
};

export default Page;
