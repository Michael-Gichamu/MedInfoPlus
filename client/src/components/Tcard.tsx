import { TcardType } from "../types/types";
import React from "react";
export const TitleCardComponent: React.FC<TcardType> = ({
  image,
  content,
  title,
}) => {
  console.log(image);
  return (
    <>
      <div className="flex flex-col py-4">
        <div className=" w-[90vw] bg-white h-[15rem] min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center mx-5 w-[20%]   items-center">
            <div className=" text-center mx-auto my-auto ">
              <img src={`/${image}`} alt={`${image}`} />
            </div>
          </div>
          <div className="h-[100%] w-[80%]  flex flex-col">
            <div className="title">
              <p className="text-black text-2xl pl-5 pt-5">{title}</p>
            </div>
            <div className="content mt-[5rem] pl-5">
              <p className="text-black text-sm ">Content:</p>
              <p className="  text-xl">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
