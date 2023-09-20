import ImageSlider from "./components/ImageSlider";
import { LandingHeader } from "./components/LandingHeader";
import { useNavigate } from "react-router-dom";
import image1 from "/slider1.jpg";
import image2 from "/slider2.jpg";
import image3 from "/slider3.jpg";
import { useState, useRef } from "react";
import { Testimonials } from "./components/Testimonials";
import { ToastContainer, toast } from "react-toastify";
import { sendNotification } from "../../actions/subscribe.actions";
export const LandingPage = (): JSX.Element => {
  const [images] = useState<any>([image1, image2, image3]);
  const [email, setemail] = useState<string>("");
  const aboutSectionRef = useRef(null);
  const featureRef = useRef(null);
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/auth/signup");
  };
  const handleSubscribe = async () => {
    const subscription = await sendNotification(email);
    toast(subscription.message);

    return subscription;
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setemail(e.target.value);
  };
  return (
    <>
      <div className=" h-[100vh] w-full  flex flex-col overflow-y-scroll bg-black ">
        <div className=" top-0  w-[100%]  sticky ">
          <LandingHeader
            aboutSectionRef={aboutSectionRef}
            featureSectionRef={featureRef}
          />
          <div className="">
            <ToastContainer />
          </div>
        </div>
        <div className="mt-[0.4px]">
          <ImageSlider images={images} />
        </div>
        <div
          ref={featureRef}
          className="mt-[1.6rem] gap-5  bg-gray-800 flex-col flex justify-center w-full"
        >
          <p className=" text-xl w-full text-center mt-3  text-white">
            Welcome to MedInfoPlus
          </p>
          <div className=" text-white text-center">
            Your Trusted Source for Comprehensive Medical Information
          </div>
        </div>
        <div className="flex justify-between  pt-5 px-4 bg-gray-800">
          <img
            src="/article1.png"
            alt="aticles"
            className="w-[45%] rounded-sm"
          />
          <img
            src="resource1.png"
            alt="aticles"
            className="w-[45%] rounded-sm"
          />
        </div>
        <div
          id="about"
          ref={aboutSectionRef}
          className="flex justify-center flex-col bg-gray-800"
        >
          <p className=" text-white text-xl text-center  font-medium">About</p>
          <p className=" text-center text-gray-400">What inspired us ?</p>
          <p className="text-white mt-4 p-3  bg-gray-900">
            At MedInfoPlus, our diverse team of medical engineers and software
            engineers came together with a shared vision – to revolutionize the
            way people access and understand medical information. Our journey
            began with a simple yet powerful idea: to combine our expertise in
            both the medical and technological fields to create a platform that
            empowers individuals to make informed healthcare decisions. As
            medical engineers, we've witnessed firsthand the complexity of
            medical knowledge and the challenges people face when seeking
            credible information. As software engineers, we knew we could
            leverage technology to bridge that gap and provide you with
            accurate, user-friendly medical articles.
          </p>
        </div>
        <div className="mb-3 w-full justify-center flex flex-col bg-gray-800">
          <p className="text-white text-lg text-center ">
            Stay informed! Signup Today!
          </p>
          <p className="text-white text-center flex-wrap py-5">
            "Join our community of health-conscious individuals and medical
            enthusiasts. Receive exclusive healthcare tips, in-depth articles,
            and the latest medical insights. Don't miss out – sign up for our
            newsletter now!"
          </p>
          <div className="w-full flex justify-center">
            <button
              onClick={handleSignUp}
              className=" bg-blue-400   auth-btn border-none text-lg  flex items-center justify-center   text-white h-[2.55rem] w-[10rem] mb-[1.5rem] rounded"
            >
              Signup
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </button>{" "}
          </div>
          <div className=" py-5 flex justify-center w-full gap-5 text-white">
            <input
              type="email"
              name=""
              onChange={handleEmail}
              id=""
              placeholder="you@example.com"
              className="w-[15rem] text-center text-black h-[2rem] border-none rounded-sm focus:border-b-orange-700 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="hover:border hover:border-gray-400 p-1 rounded-md  "
            >
              Subscribe
            </button>
          </div>
        </div>
        <div>
          <div className=" text-white flex flex-col justify-center w-full bg-gray-800">
            <p className=" text-xl font-medium text-center ">Testimonials</p>
            <div className="flex justify-around w-full flex-wrap gap-2 py-5">
              <Testimonials
                name="Dr. Sarah Johnson, MD"
                designition="Family Physician"
                content="MedInfoPlus has been an invaluable resource for me as a healthcare professional. The articles are not only well-researched and up-to-date but also presented in a way that's easily understandable for patients. It's become my go-to reference when explaining medical conditions and procedures to my patients. Thank you for providing such a valuable tool in the world of healthcare."
              />
              <Testimonials
                name="Emily Martinez"
                designition="Health-conscious Individual"
                content="As someone who values their health, I'm always looking for reliable sources of medical information. MedInfoPlus has exceeded my expectations. The content is thorough, and I appreciate the commitment to accuracy. I've learned so much and feel more confident in managing my health because of this website. Keep up the fantastic work!"
              />
              <Testimonials
                name="Mark Davis"
                designition="MedInfoPlus User"
                content="I stumbled upon MedInfoPlus while researching my recent diagnosis. The articles not only provided me with the information I needed but also gave me a sense of empowerment in understanding my condition. The personal stories and expert insights shared here were incredibly comforting during a challenging time. I can't thank you enough for creating this resource"
              />
            </div>
          </div>
        </div>
        <div className="text-white flex justify-center flex-col bg-gray-800">
          <p className=" text-xl font-medium text-center">Contact Us</p>
          <div className="flex w-full justify-around py-3  mt-3 border-none rounded-md bg-gray-900">
            <div className="">
              <p className="text-center flex gap-3 text-lg underline">
                LinkedIn{" "}
                <img src="/linkedin.svg" className="w-[30px]" alt="linkedin" />{" "}
              </p>
              <div className="flex flex-col text-gray-400 mt-2">
                <p className="">Amos Wachira</p>
                <p>Michael Gichamu</p>
              </div>
            </div>
            <div className="">
              <p className="text-center text-lg gap-3 underline flex">
                Github{" "}
                <img src="/github.svg" className="w-[30px]" alt="github" />{" "}
              </p>
              <div className="flex flex-col text-gray-400 mt-2">
                <p>Amos Wachira</p>
                <p>Michael Gichamu</p>
              </div>
            </div>
            <div className="">
              <p className="text-center text-lg underline flex gap-3">
                Portfolio{" "}
                <img
                  src="/portfolio.svg"
                  className="w-[30px]"
                  alt="portfolio"
                />{" "}
              </p>
              <div className="flex flex-col text-gray-400 mt-2">
                <p>Amos Wachira</p>
                <p>Michael Gichamu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
