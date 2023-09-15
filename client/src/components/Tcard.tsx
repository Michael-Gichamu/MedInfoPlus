import { TcardType } from "../types/types";
import { deleteArticle, saveService } from "../actions/savedarticle.actions";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
export const TitleCardComponent: React.FC<TcardType> = ({
  image,
  content,
  title,
  id,
  saved,
}) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [Deletetext, setDeleteText] = useState("Delete");
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
  const handleDelete = async (id: string | number) => {
    const str_id = JSON.stringify(id);
    try {
      const deletedArticleResp = await deleteArticle(str_id);
      setDeleteText("Deleted");

      return deletedArticleResp;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col py-4 ">
        <div className=" w-[100vw] sm:w-[90vw] bg-white sm:h-[15rem] min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center sm:mx-5 sm:w-[20%]   items-center">
            <div
              className=" text-center mx-auto my-auto hidden sm:block "
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
            {!saved ? (
              <div className=" save flex justify-end mr-4 overflow-hidden ">
                <button
                  className="flex gap-3 rounded-md bg-blue-500 border-none text-sm"
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
            ) : (
              <div className=" mt-1 save flex justify-end mr-4 overflow-hidden ">
                <button
                  className="flex gap-3 rounded-md font-semibold bg-red-400 text-white border-none text-sm"
                  onClick={() => handleDelete(id)}
                >
                  <p className="mt-2 p-1">{Deletetext}</p>
                  <img
                    className="w-[50px] h-[50px] p-2"
                    src="/delete-icon.svg"
                    alt="save-btn"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
