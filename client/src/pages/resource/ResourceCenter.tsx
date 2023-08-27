import { useState } from "react";
import { DiabetesTitleComponentCard } from "../../components/DTcard";
import { DiabetesComponentCard } from "../../components/Dcard";
const condition = "Diabetes";
export const ResourceCenterComponent: any = () => {
  const [overView, setOverview] = useState<boolean>(true);
  return (
    <>
      <div className=" flex flex-col min-h-[77vh] bg-gray-200">
        <div className="img flex justify-center mt-4">
          <img src="/diabetes-img.webp" className=" rounded-full" alt="" />
        </div>
        <div className=" flex justify-center font-bold pb-3  pt-4  text-black text-3xl">
          {condition} Resource Center
        </div>
        <div className=" text-blue-700 text-center text-xl">
          Trusted, comprehesive information and resources for your diabetes
          journey
        </div>
        <div className="cards mt-5 ">
          <div className="first flex justify-center gap-4">
            <DiabetesComponentCard text="Type 1 Diabetes" width="[10rem]" />
            <DiabetesComponentCard text="Type 2 Diabetes" width="[5rem]" />
            <DiabetesComponentCard text="Gestational Diabetes" width="[5rem]" />
          </div>
          <div className="second flex justify-center gap-3 mt-5">
            <DiabetesComponentCard text="Symptoms" width="[6rem]" />
            <DiabetesComponentCard text="Causes" width="[6rem]" />
            <DiabetesComponentCard text="Diagnosis" width="[6rem]" />
            <DiabetesComponentCard text="Treatment" width="[6rem]" />
          </div>
          <div className="third flex justify-center mt-5">
            <DiabetesComponentCard
              text="Browse more on diabetes"
              width="[15rem]"
            />
          </div>
          <div className="select flex gap-4 pt-5 font-medium justify-center">
            <p
              className="overview underline cursor-pointer"
              onClick={() => setOverview(true)}
            >
              Overview & Types
            </p>
            <p
              className="symptoms underline cursor-pointer"
              onClick={() => {
                setOverview(false);
              }}
            >
              Symptoms & Diagnostics
            </p>
          </div>

          {overView ? (
            <div className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[3rem]">
              <DiabetesTitleComponentCard title="Overview" content="" />
              <DiabetesTitleComponentCard title="Overview" content="" />
            </div>
          ) : (
            <div className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[3rem]">
              <DiabetesTitleComponentCard title="Symptoms" content="" />
              <DiabetesTitleComponentCard title="Symptoms" content="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
