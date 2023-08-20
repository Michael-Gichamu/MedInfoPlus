import React from "react";
import { useParams } from "react-router-dom";
import { DiabetesComponentCard } from "../../components/Dcard";
export const ArticlesComponent: React.FC = (): JSX.Element => {
  const { id } = useParams();
  if (id == "1") {
    return (
      <>
        <div className=" flex flex-col bg-gray-300 h-[100%] overflow-y-scroll">
          <div className=" text-black text-lg ml-5 font-semibold mt-2">
            Cancer health / Lung cancer article
          </div>
          <div className="ml-5 mt-2 text-black text-xl font-medium">
            Lung cancer, Signs & Symptoms, <br /> Treatment & care
          </div>
          <div className="flex gap-4 ml-5 mt-3">
            <DiabetesComponentCard width="10rem" text="Things to know" />
            <DiabetesComponentCard width="5rem" text="Causes" />
          </div>
          <div className="flex gap-4 ml-5 mt-3">
            <DiabetesComponentCard width="15rem" text="Signs & symptoms" />
            <DiabetesComponentCard width="15rem" text="Diagnosis & Treatment" />
          </div>
          <div className="things2know flex  justify-between ml-5 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-lg  mt-[4rem]">
                Things to Know
              </p>
              <div className=" flex-wrap flex ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                assumenda similique nisi accusantium necessitatibus, illo
                dignissimos. Natus assumenda doloremque eveniet architecto
                expedita magni, id ducimus. Ad dicta vel quidem facere.
              </div>
            </div>
            <div className="image w-[30%]  mt-[5rem] ml-10">
              <div className=" bg-green-400  flex h-[10rem] w-[10rem] text-center justify-center items-center">
                Article Image
              </div>
            </div>
          </div>
          <div className="whatislungcancer flex  justify-between ml-5 pb-4 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-lg  mt-[4rem]">
                What is Lung Cancer
              </p>
              <div className=" flex-wrap flex ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                assumenda similique nisi accusantium necessitatibus, illo
                dignissimos. Natus assumenda doloremque eveniet architecto
                expedita magni, id ducimus. Ad dicta vel quidem facere.
              </div>
            </div>
            <div className="image w-[30%]  mt-[5rem] ml-10 ">
              <div className=" bg-green-400  flex h-[10rem] w-[10rem] text-center justify-center items-center">
                Article Image
              </div>
            </div>
          </div>
          <div className="whatislungcancer flex  justify-between ml-5 pb-4 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-lg  mt-[4rem]">
                What are the causes of Lung Cancer
              </p>
              <div className=" flex-wrap flex ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                assumenda similique nisi accusantium necessitatibus, illo
                dignissimos. Natus assumenda doloremque eveniet architecto
                expedita magni, id ducimus. Ad dicta vel quidem facere.
              </div>
            </div>
            <div className="image w-[30%]  mt-[5rem] ml-10 ">
              <div className=" bg-green-400  flex h-[10rem] w-[10rem] text-center justify-center items-center">
                Article Image
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" text-center text-3xl text-black">
          Article Not Found
        </div>
      </>
    );
  }
};
