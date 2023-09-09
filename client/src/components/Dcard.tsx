import React from "react";
import { DcardType } from "../types/types";
export const DiabetesComponentCard: React.FC<DcardType> = ({ text, width }) => {
  return (
    <>
      <div
        className={`w-[${width}] p-5 h-[2rem] bg-white flex
       justify-center items-center text-black font-semibold rounded-lg cursor-pointer`}
      >
        {text}
      </div>
    </>
  );
};
