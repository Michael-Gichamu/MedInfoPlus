import { DiabetesTitleComponentCard } from "../../components/DTcard";
import { DiabetesComponentCard } from "../../components/Dcard";
export const ResourceCenterComponent: any = () => {
  return (
    <>
      <div className=" flex flex-col min-h-[77vh] black-bg">
        <div className=" flex justify-center  pt-4  text-white text-3xl">
          Diabetes Resource Center
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
          <div className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[5rem]">
            <DiabetesTitleComponentCard />
            <DiabetesTitleComponentCard />
          </div>
        </div>
      </div>
    </>
  );
};
