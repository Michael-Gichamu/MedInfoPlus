import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Error from "../components/Error";
import { FaYahoo, FaMicrosoft, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./auth.css";

import "react-toastify/dist/ReactToastify.css";
export const Login: React.FC = () => {
  const [error, setError] = useState<string>("");

  return (
    <div className="h-screen sm:flex  ">
      <div className="clip-path w-full h-[15%] md:h-full sm:w-[50%] flex items-center justify-center bg-[#03103c] ">
        <img className="h-[6rem] md:h-auto" src="/se.png" alt="" />
      </div>
      <ToastContainer />
      <form
        className="sm:w-[50%]  flex items-center justify-center p-4"
        // onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="sm:w-[50%] w-full">
          {error && <Error message={error} />}
          <div className="flex flex-col gap-2 justify-between mb-[1.5rem]">
            <button
              className="flex items-center justify-center gap-3 border-2 rounded h-[2.5rem] w-full"
              type="button"
            >
              <FaMicrosoft />
              Continue with Microsoft
            </button>
            <button
              className="flex items-center justify-center gap-3 border-2 rounded h-[2.5rem]  w-full"
              type="button"
            >
              <FaGoogle />
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-2 border-2 rounded  h-[2.5rem]">
              <FaYahoo /> Continue with Yahoo
            </button>
          </div>
          <div className="group mb-[1.5rem] ">
            <input
              //   {...register("email")}
              type="email"
              className="input w-full"
            />
            <span className="highlight "></span>
            <span className="bar w-full"></span>
            <label>Email</label>
            <p className="text-[red]">{}</p>
          </div>
          <div className="group mb-[2.5rem] ">
            <input
              //   {...register("password")}
              type="password"
              className="input w-full"
            />
            <span className="highlight"></span>
            <span className="bar w-full"></span>
            <label>Password</label>
            <p className="text-[red]">{}</p>
          </div>
          <button className="auth-btn border-none  flex items-center justify-center   text-white h-[2.55rem] w-full mb-[1.5rem] rounded">
            Login
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>{" "}
          <div>
            <span>
              <Link to="/auth/signup" className="text-[blue]">
                Or SignUp here
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
