import { useNavigate } from "react-router-dom";
export const LandingPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth/login");
  };
  return (
    <>
      <div className=" h-[100vh] flex overflow-auto bg-blue-400 ">
        <div className=" bg-blue-400 sm:w-[50%] h-[100%] w-[100%]">
          <div className="text-white  mx-4 text-3xl flex font-semibold rounded-lg border justify-center mt-[3rem]  p-5">
            MedInfoPlus
          </div>
          <div className="text-white text-xl p-5 flex text-opacity-50">
            <blockquote>
              &quot; MedInfoPlus: Your go-to resource for medical procedures and
              conditions. Access accurate, easy-to-understand articles to make
              informed healthcare decisions. Explore our trusted content today
              for a healthier tomorrow. &quot;
            </blockquote>
          </div>
          <div className="text-white text-xl p-5 flex flex-col ">
            <div className="">
              <p>What inspired this project:</p>
            </div>
            <div className="text-opacity-50">
              <blockquote className=" text-opacity-50 font-light">
                The inspiration behind this project stems for alx school
                projects.
              </blockquote>
            </div>
          </div>
          <div className="text-white text-xl p-5 flex flex-col ">
            <div className="">
              <p>Who are the Authors:</p>
            </div>
            <div className="text-opacity-50">
              <blockquote className=" text-opacity-50 font-light">
                The Authors include:
                <div className="flex flex-col ml-4  underline">
                  {" "}
                  <span className="">
                    <a href="https://github.com/AMO15310" target="_blank">
                      Amos wachira
                    </a>
                  </span>
                  <span className="">
                    <a
                      href="https://github.com/Michael-Gichamu"
                      target="_blank"
                    >
                      Michael Gichamu
                    </a>
                  </span>
                </div>
              </blockquote>
            </div>
          </div>
          <div className="sm:p-[5rem] mt-[1rem] mx-[2rem]">
            <button
              onClick={handleClick}
              className="auth-btn border-none    flex items-center justify-center bg-blue-800  text-white h-[2.55rem] w-full mb-[1.5rem] rounded"
            >
              Continue to Login
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </button>
          </div>
        </div>
        <div className="w-[50%] sm:block  hidden">
          <img
            className=" rounded-full mt-4"
            src="/landing-background.jpeg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
