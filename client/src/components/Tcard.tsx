import { TcardType } from "../types/types";
import { saveService } from "../actions/savedarticle.actions";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
export const TitleCardComponent: React.FC<TcardType> = ({
  image,
  content,
  title,
  id,
}) => {
  const navigate = useNavigate();
  const [text, setText] = useState("save");
  const gotoPost = (article: string | number) => {
    navigate(`/article/${article}`);
  };

  const handleClick = async (id: string | number) => {
    const str_id = JSON.stringify(id);
    try {
      const saved = await saveService(str_id);
      setText("Saved");
      return saved;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col py-4 ">
        <div className=" w-[90vw] bg-white h-[15rem] min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center mx-5 w-[20%]   items-center">
            <div
              className=" text-center mx-auto my-auto "
              onClick={() => gotoPost(id)}
            >
              <img src={`/${image}`} alt={`${image}`} />
            </div>
          </div>
          <div className="h-[100%] w-[80%]  flex flex-col">
            <div className="title" onClick={() => gotoPost(id)}>
              <p className="text-black text-2xl pl-5 pt-5">{title}</p>
            </div>
            <div className="content mt-[5rem] pl-5">
              <p className="text-black text-sm ">Content:</p>
              <p className="  text-xl">{content}</p>
            </div>
            <div className="save flex justify-end mr-4 overflow-hidden ">
              <button
                className="flex gap-3 border-lime-300 text-sm  border"
                onClick={() => handleClick(id)}
              >
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
