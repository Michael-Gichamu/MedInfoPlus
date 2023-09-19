import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Error from "../components/Error";
import { FaYahoo, FaMicrosoft, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { LoginSchema } from "../schemas/login.schema";
import { useForm } from "react-hook-form";
import { login } from "../actions/auth.actions";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-toastify/dist/ReactToastify.css";
export const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const dataFromServer = await login(data);

      if (dataFromServer.error) {
        setError(dataFromServer.error);
        toast("Login failed!");
      } else {
        reset();
      }
      if (dataFromServer.status == 401) {
        console.log("unauthorized");
      }
      if (dataFromServer.token) {
        const { token, user_data } = dataFromServer;
        console.log(user_data);
        localStorage.setItem("user_id", user_data.id);
        localStorage.setItem("user_name", user_data.name);

        localStorage.setItem("user", JSON.stringify(token));
        toast("Login Success");
        setTimeout(() => {
          navigate("/articles");
        }, 3000);
      } else {
        toast("Check your credentials and try again");
      }
    } catch (error) {
      toast("Log in failed! try again later");
    }
  };
  const checkLoggedIn = () => {
    const userdata = localStorage.getItem("user");
    if (userdata) {
      toast("You are already logged in");
      setTimeout(() => {
        // navigate(-1);
      }, 5000);
    } else {
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="h-screen sm:flex  ">
      <div className="clip-path w-full h-[15%] md:h-full sm:w-[50%] flex items-center justify-center bg-[#03103c] ">
        <img className="h-[6rem] md:h-auto" src="/se.png" alt="" />
      </div>
      <ToastContainer />
      <form
        className="sm:w-[50%]  flex items-center justify-center p-4"
        onSubmit={handleSubmit(onSubmit)}
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
              {...register("email", { required: true })}
              type="email"
              className="input w-full"
            />
            <span className="highlight "></span>
            <span className="bar w-full"></span>
            <label>Email</label>
            <p className="text-[red]">{errors.email?.message}</p>
          </div>
          <div className="group mb-[2.5rem] ">
            <input
              //   {...register("password")}
              {...register("password", { required: true })}
              type="password"
              className="input w-full"
            />
            <span className="highlight"></span>
            <span className="bar w-full"></span>
            <label>Password</label>
            <p className="text-[red]">{errors.password?.message}</p>
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
