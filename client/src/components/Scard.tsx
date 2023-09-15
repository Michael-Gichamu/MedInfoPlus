import React, { useState } from "react";
import { TcardType } from "../types/types";
import { saveService } from "../actions/savedarticle.actions";
import { useNavigate } from "react-router-dom";
export const SmallCardComponent: React.FC<TcardType> = ({
  image,
  title,
  content,
  id,
}) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const gotoPost = (article: string | number) => {
    navigate(`/article/${article}`);
  };
  const handleClick = async (id: string | number) => {
    const str_id = JSON.stringify(id);
    try {
      const saved = await saveService(str_id);
      setText("Saved");
      console.log(str_id, saved);

      return saved;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col py-4">
        <div className=" sm:w-[90vw] w-[100vw] bg-white  h-fit min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center sm:mx-5 sm:w-[20%]   items-center">
            <div
              className=" text-center mx-auto my-auto hidden sm:block "
              onClick={() => gotoPost(id)}
            >
              <img src={`/${image}`} alt={`${image}`} />
            </div>
          </div>
          <div className="h-[100%] w-[80%]  flex flex-col">
            <div className="title">
              <p className="text-black text-2xl pl-5 pt-5"> {title}</p>
            </div>
            <div className="content mt-[0.2rem] pl-5">
              <p className="text-white text-sm ">Content: </p>
              <p className="  text-xl">{content}</p>
            </div>
            <div className="save flex justify-end mr-4  my-4">
              <button
                onClick={() => handleClick(id)}
                className="flex gap-3  rounded-md bg-blue-500 border-none"
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
