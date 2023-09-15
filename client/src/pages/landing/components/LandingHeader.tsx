import React from "react";
import { Link } from "react-router-dom";

import { LandingHeaderProps } from "../../../types/types";
export const LandingHeader: React.FC<LandingHeaderProps> = ({
  aboutSectionRef,
  featureSectionRef,
}) => {
  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToFeature = () => {
    featureSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
          <Link to="" onClick={scrollToFeature} className="">
            Features
          </Link>
          <Link onClick={scrollToAbout} to="" className="">
            About
          </Link>
          <Link to="/auth/signup">
            <div className="">Signup</div>
          </Link>
          <Link to="" onClick={scrollToAbout} className="">
            Newsletter
          </Link>
        </div>
      </div>
    </div>
  );
};
