import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import { datafromServer } from "../actions/med.actions";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const HealthOptions: any = ["All articles"];
  const wellnessOptions: any = [];

  const getresourceType = async () => {
    const response = await datafromServer("/resources");
    response.map((resource: any) => {
      if (resource.medical_type === "Health Condition") {
        HealthOptions.push(resource.name);
      }
      if (resource.medical_type === "Wellness") {
        wellnessOptions.push(resource.name);
      }
    });
  };
  // const newHealthOptions = [...new Set(HealthOptions)];
  // const newWellnessOptions = [...new Set(wellnessOptions)];

  useEffect(() => {
    getresourceType();
  }, []);
  return (
    <div className="h-[100%] w-[100%] bg-blue-500 flex gap-4 justify-between">
      <div className=" text-black text-2xl p-5">MedInfoPlus</div>
      <div className="others ml-[5rem] flex justify-center items-center">
        <div className=" p-5 border-none focus:outline-none">
          <CustomDropdown title="Health Conditions" options={HealthOptions} />{" "}
        </div>
        <div className=" p-5 border-none focus:outline-none">
          <CustomDropdown title="Wellness" options={wellnessOptions} />
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div className="">Health Cost Estimator</div>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div onClick={() => navigate("/auth/login")} className="">
            Log in
          </div>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div onClick={() => navigate("/auth/signup")} className="">
            Sign Up
          </div>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <input
            type="text"
            placeholder="search"
            className="border-none focus:outline-none p-1 rounded-xl "
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
