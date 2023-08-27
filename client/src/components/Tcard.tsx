import React from "react";
export const TitleCardComponent: React.FC = () => {
  return (
    <>
      <div className="flex flex-col py-4">
        <div className=" w-[90vw] bg-white h-[15rem] min-h-fit flex  items-center ">
          <div className=" h-[80%] flex justify-center mx-5 w-[20%]   items-center">
            <div className=" text-center mx-auto my-auto ">Article</div>
          </div>
          <div className="h-[100%] w-[80%]  flex flex-col">
            <div className="title">
              <p className="text-black text-2xl pl-5 pt-5">Title:</p>
            </div>
            <div className="content mt-[5rem] pl-5">
              <p className="text-black text-sm ">Content:</p>
              <p className="  text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                quaerat natus, repellendus quibusdam pariatur, quo explicabo
                sequi minima totam aut est illo hic ipsam corporis porro
                doloremque dolore distinctio recusandae.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
