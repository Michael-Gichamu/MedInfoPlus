import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { datafromServer } from "../../actions/med.actions";
import { useNavigate, useParams } from "react-router-dom";
export const ArticlesComponent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<any>();
  const [FirstDataimage, setFirstDataimage] = useState<any>();
  const [SecondDataimage, setSecondDataimage] = useState<any>();
  const [FirstTitle, setFirstTitle] = useState<any>();
  const [SecondTitle, setSecondTitle] = useState<any>();
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [newLinkFirst, setnewLinkFirst] = useState("");
  const [newLinkSecond, setnewLinkSecond] = useState("");
  const [clicked, setclicked] = useState(false);

  const { id } = useParams();

  const getData = async () => {
    try {
      const response = await datafromServer("medicalarticles/toparticles");
      setFirstDataimage(response[0].image);
      setSecondDataimage(response[1].image);
      setFirstTitle(response[0].title);
      setSecondTitle(response[1].title);
      setnewLinkFirst(response[0].id);
      setnewLinkSecond(response[1].id);
    } catch (error) {
      setError(error);
    }
  };
  const getAlldata = async () => {
    try {
      const resp = await datafromServer(`medicalarticles/${id}`);
      setTitle(resp.title);
      setContent(resp.content);
    } catch (error) {
      // setError(error);
    }
  };
  const handleClicked = (link: string) => {
    navigate(`/article/${link}`);
    setclicked(true);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth/login");
    }

    getData();
    getAlldata();
  }, [clicked]);
  const text = "";
  if (!error) {
    return (
      <>
        <div className=" flex flex-col bg-gray-300 h-[100%] overflow-y-scroll">
          <div className=" text-black text-lg ml-5 font-semibold mt-2"></div>
          <div className="ml-5 mt-2 text-black text-xl font-medium">
            {text} <br /> {title}
          </div>
          {/* <div className="flex gap-4 ml-5 mt-3">
            <DiabetesComponentCard width="10rem" text="Things to know" />
            <DiabetesComponentCard width="5rem" text="Causes" />
          </div>
          <div className="flex gap-4 ml-5 mt-3">
            <DiabetesComponentCard width="15rem" text="Signs & symptoms" />
            <DiabetesComponentCard width="15rem" text="Diagnosis & Treatment" />
          </div> */}
          <div className="things2know flex  justify-between ml-5 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-xl  mt-[4rem] mb-2">
                Things to Know
              </p>
              <div className=" flex-wrap flex ">
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </div>

            <div className="image w-[30%]  mt-[5rem] ml-10">
              <div className=" mb-4 underline">Recomended Articles </div>
              <div
                className=" cursor-pointer"
                onClick={() => handleClicked(newLinkFirst)}
              >
                {FirstTitle}
              </div>
              <div className="   flex h-[10rem] w-[10rem] text-center justify-center items-center">
                <img src={`/${FirstDataimage}`} alt={FirstDataimage} />
              </div>
              <div className="image   mt-[5rem]  w-full ">
                <div
                  className="mb-2 cursor-pointer"
                  onClick={() => handleClicked(newLinkSecond)}
                >
                  {SecondTitle}
                </div>
                <div className="  flex h-[10rem] w-[10rem] text-center justify-center items-center">
                  <img src={`/${SecondDataimage}`} alt={SecondDataimage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" text-center text-3xl text-black">
          Article Not Found
        </div>
      </>
    );
  }
};
