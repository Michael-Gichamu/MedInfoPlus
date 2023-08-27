import React from "react";
import { useNavigate } from "react-router-dom";
import { TitleCardComponent } from "../../components/Tcard";
import { SmallCardComponent } from "../../components/Scard";

export const HomeComponentPage: React.FC = () => {
  const navigate = useNavigate();
  const gotoPost = (article: string) => {
    navigate(article);
  };
  return (
    <>
      <div className=" flex flex-col min-h-[77vh] bg-gray-200">
        <div
          onClick={() => gotoPost("/article/1")}
          className=" flex justify-center cursor-pointer    pt-4  text-black text-3xl"
        >
          <TitleCardComponent />
        </div>
        <div className=" px-[4rem] flex flex-col justify-center ">
          <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
            Todays Top stories
          </div>
          <div
            onClick={() => gotoPost("/article/1")}
            className=" cursor-pointer"
          >
            <SmallCardComponent />
          </div>
        </div>
        <div className=" px-[4rem] flex flex-col justify-center ">
          <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
            More Recent Articles
          </div>
          <div
            onClick={() => gotoPost("/article/1")}
            className=" cursor-pointer"
          >
            <SmallCardComponent />
          </div>
        </div>
      </div>
    </>
  );
};
