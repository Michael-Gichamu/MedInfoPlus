import React from "react";
import { TcardType } from "../types/types";
export const SmallCardComponent: React.FC<TcardType> = ({
  image,
  title,
  content,
}) => {
  return (
    <>
      <div className="flex flex-col py-4">
        <div className=" w-[90vw] bg-white h-[10rem] min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center mx-5 w-[20%]   items-center">
            <div className=" text-center mx-auto my-auto ">
              <img src={`/${image}`} alt={`${image}`} />
            </div>
          </div>
          <div className="h-[100%] w-[80%]  flex flex-col">
            <div className="title">
              <p className="text-black text-2xl pl-5 pt-5">Title: {title}</p>
            </div>
            <div className="content mt-[0.2rem] pl-5">
              <p className="text-white text-sm ">Content: </p>
              <p className="  text-xl">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
