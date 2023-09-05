import React from "react";
import { TcardType } from "../types/types";

import { useNavigate } from "react-router-dom";
export const SmallCardComponent: React.FC<TcardType> = ({
  image,
  title,
  content,
  id,
}) => {
  const text = "save";
  const navigate = useNavigate();
  const gotoPost = (article: string | number) => {
    navigate(`/article/${article}`);
  };

  return (
    <>
      <div className="flex flex-col py-4">
        <div className=" w-[90vw] bg-white h-[10rem] min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center mx-5 w-[20%]   items-center">
            <div
              className=" text-center mx-auto my-auto "
              onClick={() => gotoPost(id)}
            >
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
            <div className="save flex justify-end mr-4 ">
              <button className="flex gap-3 border-lime-300  border">
                <p className="mt-2 p-1">{text}</p>
                <img
                  className="w-[50px] h-[50px] p-2"
                  src="/save.png"
                  alt="save-btn"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
