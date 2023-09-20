import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import { datafromServer } from "../actions/med.actions";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [logedin, setLogedin] = useState<boolean>(false);

  const HealthOptions = new Set();
  const wellnessOptions = new Set();
  const [healthOptions, setHealthOptions] = useState<any>([]);
  const [wellOptions, setWellnessOptions] = useState<any>([]);

  const getresourceType = async () => {
    const response = await datafromServer("/resources");
    HealthOptions.add("All articles");

    response.map((resource: any) => {
      if (resource.medical_type === "Health Condition") {
        HealthOptions.add(resource.name);
      }
      if (resource.medical_type === "Wellness") {
        wellnessOptions.add(resource.name);
      }
    });
    const healthArray = Array.from(HealthOptions);
    const wellnessArray = Array.from(wellnessOptions);
    setHealthOptions(healthArray);
    setWellnessOptions(wellnessArray);
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    getresourceType();
    if (user) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, []);
  return (
    <div className="h-[100%] w-[100%] bg-blue-500 flex gap-4 justify-between">
      <div className=" text-black text-2xl p-5">MedInfoPlus</div>
      <div className="others ml-[5rem] flex justify-center items-center">
        <div className=" p-5 border-none focus:outline-none">
          <CustomDropdown title="Health Conditions" options={healthOptions} />{" "}
        </div>
        <div className=" p-5 border-none focus:outline-none">
          <CustomDropdown title="Wellness" options={wellOptions} />
        </div>

        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div className="">Health Cost Estimator</div>
        </div>
        {!logedin ? (
          <div className="flex">
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
          </div>
        ) : (
          <div className="flex">
            <div className=" p-5 border-none focus:outline-none cursor-pointer">
              <div onClick={logOut} className="">
                Log out
              </div>
            </div>
            <div className=" flex items-center border-none focus:outline-none cursor-pointer">
              <Link to="/dashboard">
                <img src="/home.svg" alt="Home" className="w-[30px] h-[30px]" />
              </Link>
            </div>
          </div>
        )}

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
