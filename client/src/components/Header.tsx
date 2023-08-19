import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<string>("/");

  const navigate = useNavigate();
  const handleConditionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedCondition(selectedValue);
    navigate(`${selectedValue}`);
  };
  console.log(selectedCondition);

  return (
    <div className="  min-w-full h-[10%] bg-blue-500 flex gap-4 justify-between">
      <div className=" text-black text-2xl p-5">MedInfoPlus</div>
      <div className="others ml-[5rem] flex justify-center items-center">
        <div className=" p-5 border-none focus:outline-none">
          <select
            className=" bg-inherit border-none focus:outline-none"
            name="Health and Conditions"
            id=""
            onChange={handleConditionChange}
          >
            <option value="/">Health and Condition</option>
            <option value="/diabetes">Diabetes</option>
          </select>
        </div>
        <div className=" p-5 border-none focus:outline-none">
          <select
            className=" bg-inherit border-none focus:outline-none"
            name="Wellness"
            id=""
          >
            <option value="">Wellness</option>
          </select>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div className="">Health Cost Estimator</div>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div className="">Log in</div>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <div className="">Sign Up</div>
        </div>
        <div className=" p-5 border-none focus:outline-none cursor-pointer">
          <input
            type="text"
            placeholder="search"
            className="border-none focus:outline-none p-1 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
