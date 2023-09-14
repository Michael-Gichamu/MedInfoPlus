import { DiabetesTitleComponentCard } from "../../components/DTcard";
import { DiabetesComponentCard } from "../../components/Dcard";
import React, { useEffect, useState } from "react";
import { datafromServer } from "../../actions/med.actions";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../components/Loading";
import { useParams } from "react-router-dom";
import { MedicalArticle } from "../../types/types";
import { CategoryData } from "../../types/types";

export const ResourceCenterComponent: React.FC = () => {
  const [overView, setOverview] = useState<boolean>(true);
  const [keysArray, setKeyArray] = useState<any>([]);
  const [titleArray, settitleArray] = useState<any>([]);
  const [title, newtitle] = useState<string>("Medical Conditions");
  const [newArticles, setNewArticles] = useState<MedicalArticle[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const { slug } = useParams();
  const keySet = new Set();

  const getName = async () => {
    const resp = await datafromServer(`resources/${slug}`);
    newtitle(resp.name);
  };

  const getdata = async () => {
    const data = await datafromServer(
      `resources/${slug}/category/medicalarticles`
    );

    for (let i = 0; i < data.length; i++) {
      for (let key in data[i]) {
        keySet.add(key);
      }
    }
    const keyArray = Array.from(keySet);

    const articlesByCategory: {
      category: string;
      articles: MedicalArticle[];
    }[] = data.map((categoryData: CategoryData) => {
      const category = Object.keys(categoryData)[0];
      const articles = categoryData[category];

      return {
        category,
        articles,
      };
    });
    const allArticles: MedicalArticle[] = articlesByCategory.reduce(
      (acc: MedicalArticle[], categoryData) => [
        ...acc,
        ...categoryData.articles,
      ],
      []
    );

    setNewArticles(allArticles);

    articlesByCategory.forEach(() => {
      const titlesArray: string[] = data.flatMap((category: any) =>
        Object.values(category).flatMap((items: any) =>
          items.map((item: any) => item.title)
        )
      );
      settitleArray(titlesArray);

      console.log(titlesArray);
      setKeyArray(keyArray);
    });
    setloading(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/auth/login");
    }
    getName();
    getdata();
  }, [slug]);
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
            {title} Resource Center
          </div>
          <div className=" text-blue-700 text-center text-xl">
            Trusted, comprehesive information and resources for your diabetes
            journey
          </div>
          <div className="cards mt-5 ">
            <div className="first flex justify-center gap-4 flex-wrap">
              {titleArray.map((title: any, index: any) => (
                <DiabetesComponentCard
                  key={index}
                  text={title}
                  width="[10rem]"
                />
              ))}
            </div>

            <div className="third flex justify-center mt-5">
              <DiabetesComponentCard
                text="Browse more on diabetes"
                width="[15rem]"
              />
            </div>

            {
              <div className="select flex gap-4 pt-5 font-medium justify-center">
                {keysArray.map((value: any) => (
                  <p
                    className="symptoms underline cursor-pointer"
                    onClick={() => {
                      setOverview(!overView);
                    }}
                  >
                    {value}
                  </p>
                ))}
              </div>
            }

            {
              overView
                ? newArticles.map((overview: any) => (
                    <div
                      onClick={() =>
                        navigate("/article" + "/" + `${overview.id}`)
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
                : null
              // : // This is
              //   symptoms.map((symptom: any) => (
              //     <div className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[3rem]">
              //       <DiabetesTitleComponentCard
              //         key={symptom.id}
              //         title={symptom.title}
              //         content={symptom.summary}
              //       />
              //     </div>
              //   ))}
            }
          </div>
        </div>
      </>
    );
  }
};
