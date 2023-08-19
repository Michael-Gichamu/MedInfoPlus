import { TitleCardComponent } from "../../components/Tcard";
import { SmallCardComponent } from "../../components/Scard";
import React from "react";

export const HomeComponentPage: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col min-h-[77vh] black-bg">
        <div className=" flex justify-center    pt-4  text-white text-3xl">
          <TitleCardComponent />
        </div>
        <div className=" px-[4rem] flex flex-col justify-center ">
          <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
            Todays Top stories
          </div>
          <div className="">
            <SmallCardComponent />
          </div>
        </div>
        <div className=" px-[4rem] flex flex-col justify-center ">
          <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
            More Recent Articles
          </div>
          <div className="">
            <SmallCardComponent />
          </div>
        </div>
      </div>
    </>
  );
};
