import { useNavigate } from "react-router-dom";
export const LandingPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth/login");
  };
  return (
    <>
      <div className=" h-[100vh] flex ">
        <div className=" bg-blue-400 w-[50%]">
          <div className="text-white  mx-4 text-3xl flex font-semibold rounded-lg border justify-center my-[10rem]  p-5">
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
          <div className="p-[5rem] my-[5rem] mx-[2rem]">
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
        <div className="w-[50%]">
          <img className="" src="/landing-background.jpeg" alt="" />
        </div>
      </div>
    </>
  );
};
