import { DiabetesTitleComponentCard } from "../../components/DTcard";
import { DiabetesComponentCard } from "../../components/Dcard";
import { useEffect, useState } from "react";
import { datafromServer } from "../../actions/med.actions";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../components/Loading";
const condition = "Diabetes";
export const ResourceCenterComponent: any = () => {
  const [overView, setOverview] = useState<boolean>(true);
  const [symptoms, setSymptoms] = useState<
    { name: string; summary: string; title: string; id: number }[]
  >([]);
  const [overviewTypes, setOverviewTypes] = useState<
    { name: string; summary: string; title: string; id: number }[]
  >([]);
  const [loading, setloading] = useState<boolean>(true);
  const getdata = async () => {
    const data = await datafromServer("medicalarticles");
    const symptomsData = [];
    const overviewtypesArray = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].category == "Symptoms & Diagnosis") {
        symptomsData.push({
          name: data[i].category,
          summary: data[i].summary,
          title: data[i].title,
          id: data[i].id,
        });
      }
      if (data[i].category == "Overview & Types") {
        // setOverviewTypes(data[i].category);
        overviewtypesArray.push({
          name: data[i].category,
          summary: data[i].summary,
          title: data[i].title,
          id: data[i].id,
        });
        // console.log(overviewTypes);
      }
    }
    setSymptoms(symptomsData);
    setOverviewTypes(overviewtypesArray);
    setloading(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth/login");
    }

    getdata();
  }, []);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className=" flex justify-center">
        <LoadingComponent color="#000000" type="" />
      </div>
    );
  } else {
    return (
      <>
        <div className=" flex flex-col min-h-[77vh] bg-gray-200">
          <div className="img flex justify-center mt-4">
            <img src="/diabetes-img.webp" className=" rounded-full" alt="" />
          </div>
          <div className=" flex justify-center font-bold pb-3  pt-4  text-black text-3xl">
            {condition} Resource Center
          </div>
          <div className=" text-blue-700 text-center text-xl">
            Trusted, comprehesive information and resources for your diabetes
            journey
          </div>
          <div className="cards mt-5 ">
            <div className="first flex justify-center gap-4">
              <DiabetesComponentCard
                key={1}
                text="Type 1 Diabetes"
                width="[10rem]"
              />
              <DiabetesComponentCard
                key={2}
                text="Type 2 Diabetes"
                width="[5rem]"
              />
              <DiabetesComponentCard
                key={3}
                text="Gestational Diabetes"
                width="[5rem]"
              />
            </div>
            <div className="second flex justify-center gap-3 mt-5">
              <DiabetesComponentCard text="Symptoms" width="[6rem]" />
              <DiabetesComponentCard text="Causes" width="[6rem]" />
              <DiabetesComponentCard text="Diagnosis" width="[6rem]" />
              <DiabetesComponentCard text="Treatment" width="[6rem]" />
            </div>
            <div className="third flex justify-center mt-5">
              <DiabetesComponentCard
                text="Browse more on diabetes"
                width="[15rem]"
              />
            </div>
            <div className="select flex gap-4 pt-5 font-medium justify-center">
              <p
                className="overview underline cursor-pointer"
                onClick={() => setOverview(true)}
              >
                Overview & Types
              </p>
              <p
                className="symptoms underline cursor-pointer"
                onClick={() => {
                  setOverview(false);
                }}
              >
                Symptoms & Diagnostics
              </p>
            </div>

            {overView
              ? overviewTypes.map((overview: any) => (
                  <div
                    onClick={() =>
                      navigate("articles" + "/" + `${overview.id}`)
                    }
                    className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[3rem]"
                  >
                    <DiabetesTitleComponentCard
                      key={overview.id}
                      title={overview.title}
                      content={overview.summary}
                    />
                  </div>
                ))
              : // This is
                symptoms.map((symptom: any) => (
                  <div className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[3rem]">
                    <DiabetesTitleComponentCard
                      key={symptom.id}
                      title={symptom.title}
                      content={symptom.summary}
                    />
                  </div>
                ))}
          </div>
        </div>
      </>
    );
  }
};
