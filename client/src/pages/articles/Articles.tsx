import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { datafromServer } from "../../actions/med.actions";
import { DiabetesComponentCard } from "../../components/Dcard";
import { useNavigate } from "react-router-dom";
export const ArticlesComponent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<any>();
  const [FirstDataimage, setFirstDataimage] = useState<any>();
  const [SecondDataimage, setSecondDataimage] = useState<any>();
  const [FirstTitle, setFirstTitle] = useState<any>();
  const [SecondTitle, setSecondTitle] = useState<any>();

  const getData = async () => {
    try {
      const response = await datafromServer("medicalarticles/toparticles");
      setFirstDataimage(response[0].image);
      setSecondDataimage(response[1].image);
      setFirstTitle(response[0].title);
      setSecondTitle(response[1].title);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (!user) {
      navigate("/auth/login");
    }

    getData();
  }, []);
  const text = "Diabetes";
  if (!error) {
    return (
      <>
        <div className=" flex flex-col bg-gray-300 h-[100%] overflow-y-scroll">
          <div className=" text-black text-lg ml-5 font-semibold mt-2">
            {text} article
          </div>
          <div className="ml-5 mt-2 text-black text-xl font-medium">
            {text}, Signs & Symptoms, <br /> Treatment & care
          </div>
          <div className="flex gap-4 ml-5 mt-3">
            <DiabetesComponentCard width="10rem" text="Things to know" />
            <DiabetesComponentCard width="5rem" text="Causes" />
          </div>
          <div className="flex gap-4 ml-5 mt-3">
            <DiabetesComponentCard width="15rem" text="Signs & symptoms" />
            <DiabetesComponentCard width="15rem" text="Diagnosis & Treatment" />
          </div>
          <div className="things2know flex  justify-between ml-5 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-lg  mt-[4rem]">
                Things to Know
              </p>
              <div className=" flex-wrap flex ">
                <section>
                  <h2>Fact : Chronic Condition</h2>
                  <p>
                    Diabetes is a chronic health condition affecting blood sugar
                    levels.
                  </p>
                </section>
              </div>
            </div>
            <div className="image w-[30%]  mt-[5rem] ml-10">
              <div className=" mb-4 underline">Recomended Articles </div>
              <div className="">{FirstTitle}</div>
              <div className="   flex h-[10rem] w-[10rem] text-center justify-center items-center">
                <img src={`/${FirstDataimage}`} alt={FirstDataimage} />
              </div>
            </div>
          </div>
          <div className="whatislungcancer flex  justify-between ml-5 pb-4 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-lg  mt-[4rem]">
                What is {text}
              </p>
              <div className=" flex-wrap flex ">
                Diabetes is a chronic medical condition that affects how your
                body processes glucose (sugar), a vital source of energy.
                <section>
                  <h2>Symptoms and Diagnosis</h2>
                  <p>
                    Common symptoms of diabetes include increased thirst,
                    frequent urination, and unexplained weight loss.
                  </p>
                  <p>
                    Diagnosis involves blood tests to measure blood sugar
                    levels.
                  </p>
                </section>
                <section>
                  <h2>Treatment</h2>
                  <p>
                    Treatment for diabetes may include lifestyle changes,
                    medication, and insulin therapy.
                  </p>
                </section>
              </div>
            </div>
            <div className="image w-[30%]  mt-[5rem] ml-10 ">
              <div className="mb-2">{SecondTitle}</div>
              <div className=" bg-green-400  flex h-[10rem] w-[10rem] text-center justify-center items-center">
                <img src={`/${SecondDataimage}`} alt={SecondDataimage} />
              </div>
            </div>
          </div>
          <div className="whatislungcancer flex  justify-between ml-5 pb-4 ">
            <div className="text flex flex-col w-[70%]">
              <p className="text font-medium text-lg  mt-[4rem]">
                What are the causes of {text}
              </p>
              <div className=" flex-wrap flex ">
                <h1>Causes of Diabetes</h1>

                <h2>Type 1 Diabetes:</h2>
                <p>
                  <strong>Autoimmune Reaction:</strong> Type 1 diabetes occurs
                  when the immune system attacks and destroys insulin-producing
                  cells in the pancreas.
                </p>

                <h2>Type 2 Diabetes:</h2>
                <p>
                  <strong>Insulin Resistance:</strong> Type 2 diabetes is linked
                  to insulin resistance, where cells don't respond effectively
                  to insulin.
                </p>
                <p>
                  <strong>Obesity:</strong> Excess body weight, especially
                  abdominal obesity, increases the risk of type 2 diabetes.
                </p>
                <p>
                  <strong>Physical Inactivity:</strong> Lack of regular physical
                  activity contributes to insulin resistance.
                </p>
                <p>
                  <strong>Unhealthy Diet:</strong> A diet high in sugars and
                  unhealthy fats raises the risk of type 2 diabetes.
                </p>
                <p>
                  <strong>Genetics:</strong> Family history and genetics play a
                  role in determining the risk of type 2 diabetes.
                </p>

                <h2>Gestational Diabetes:</h2>
                <p>
                  <strong>Hormonal Changes:</strong> During pregnancy, hormonal
                  changes can lead to insulin resistance and gestational
                  diabetes.
                </p>
              </div>
            </div>
            <div className="image w-[30%]  mt-[5rem] ml-10 ">
              {/* <div className=" bg-green-400  flex h-[10rem] w-[10rem] text-center justify-center items-center">
                Article Image
              </div> */}
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
