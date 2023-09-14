import React from "react";

export const LandingHeader: React.FC = () => {
  return (
    <div>
      <div className=" static flex justify-between text-white bg-blue-400 w-full h-[100%] py-[1.5rem]">
        <div className=" border border-r-white mx-5 w-[15rem] p-2 flex justify-center rounded-md font-semibold">
          <img
            src="/med-logo.png"
            alt="medinfopng"
            className="w-[25px] h-auto "
          />
          MEDINFOPLUS
        </div>
        <div className="flex gap-[5rem] mr-[3rem] text-lg">
          <div className="">Features</div>
          <div className="">About</div>
          <div className="">Login</div>
          <div className="">Newsletter</div>
        </div>
      </div>
    </div>
  );
};
