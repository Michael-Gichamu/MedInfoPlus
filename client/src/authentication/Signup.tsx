import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Error from "../components/Error";
import { FaYahoo, FaMicrosoft, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./auth.css";

import "react-toastify/dist/ReactToastify.css";
import img from "../../public/se.png";

export const SignUp: React.FC = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="md:flex justify-center items-center  sm:h-screen">
      <div className="clip-path w-full md:w-[50%] h-[15%] md:h-full bg-[#03103c] flex items-center justify-center">
        <img className="h-[6rem] md:h-auto" src={img} alt="" />
      </div>
      <ToastContainer />
      <form className="flex flex-col sm:items-center sm:justify-center md:w-[50%] h-full p-4">
        <div className="w-full md:w-[50%]">
          {error && <Error message={error} />}
          {showOptions && (
            <>
              <div className="flex flex-col gap-4">
                <button
                  className="flex items-center justify-center gap-3 w-full border-2 rounded h-[2.5rem]"
                  type="button"
                >
                  <FaMicrosoft />
                  Continue with Microsoft
                </button>
                <button
                  className="flex items-center justify-center gap-3 border-2 rounded w-full h-[2.5rem]"
                  type="button"
                >
                  <FaGoogle />
                  Continue with Google
                </button>
                <button className="flex items-center justify-center gap-2 border-2 rounded  h-[2.5rem]">
                  <FaYahoo /> Continue with Yahoo
                </button>
                <h2 className="line-aside border-b">
                  <span>OR</span>
                </h2>
              </div>
            </>
          )}

          <div>
            <button
              className="border-2 rounded w-full h-[2.5rem] mt-[1rem] mb-[1.3rem]"
              type="button"
              onClick={() => {
                setShowForm(!showForm);
                setShowOptions(!showOptions);
              }}
            >
              {showOptions ? "Continue with Email" : "Other Options"}
            </button>
          </div>
          {showForm && (
            <>
              <div className="group mb-[1.5rem] ">
                <input
                  //   {...register("username")}
                  type="text"
                  className="input w-full"
                />
                <span className="highlight"></span>
                <span className="bar w-full"></span>
                <label>Name</label>
                <p className="text-[red]">{}</p>
              </div>
              <div className="group mb-[1.5rem] ">
                <input
                  //   {...register("email")}
                  type="email"
                  className="input w-full"
                />
                <span className="highlight"></span>
                <span className="bar w-full"></span>
                <label>Email</label>
                <p className="text-[red]">{}</p>
              </div>
              <div className="group mb-[1.5rem] ">
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
              <div className="group mb-[1.5rem] ">
                <input
                  //   {...register("confirmpass")}
                  type="password"
                  className="input w-full"
                />
                <span className="highlight"></span>
                <span className="bar w-full"></span>
                <label>Confirm Password</label>
                <p className="text-[red]">{}</p>
              </div>

              <button className="auth-btn flex items-center justify-center border-none   text-white h-[2.55rem] w-full mb-2 rounded">
                Sign up
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
              <div>
                <span>
                  <Link to="/auth/login " className="text-[blue]">
                    Or Login here
                  </Link>
                </span>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
