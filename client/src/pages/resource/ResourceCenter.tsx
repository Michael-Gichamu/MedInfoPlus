import React, { useEffect, useState } from "react";
import { datafromServer } from "../../actions/med.actions";
import { useNavigate, useParams } from "react-router-dom";
import { PulsatingLoader } from "../../components/Loading";
import { MedicalArticle, CategoryData } from "../../types/types";
import { DiabetesComponentCard } from "../../components/Dcard";
import { DiabetesTitleComponentCard } from "../../components/DTcard";

const ResourceCenterComponent: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("Medical Conditions");
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<CategoryData[]>([]);
  const [image, setImage] = useState<any>();

  const getName = async () => {
    const resp = await datafromServer(`resources/${slug}`);
    setTitle(resp.name);
    setImage(resp.image);
  };

  const fetchData = async () => {
    const data = await datafromServer(
      `resources/${slug}/category/medicalarticles`
    );
    const categoryNames = data.map(
      (categoryData: CategoryData) => Object.keys(categoryData)[0]
    );

    setCategoryNames(categoryNames);
    setArticles(data);

    setLoading(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth/login");
    }
    getName();
    fetchData();
  }, [slug]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-7">
        <PulsatingLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[77vh] bg-gray-200">
      <div className="img flex justify-center mt-4">
        <img
          src={`/${image}`}
          className="rounded-full w-[200px] h-[200px]"
          alt=""
        />
      </div>
      <div className="flex justify-center font-bold pb-3 pt-4 text-black text-3xl">
        {title} Resource Center
      </div>
      <div className="text-blue-700 text-center text-xl">
        Trusted, comprehensive information and resources for your {title}
        {"  "} journey
      </div>
      <div className="cards mt-5">
        <div className="first flex justify-center gap-4 flex-wrap">
          {selectedCategory &&
            articles
              .filter((categoryData) => categoryData[selectedCategory])
              .flatMap((categoryData) =>
                categoryData[selectedCategory!].map(
                  (article: MedicalArticle, index: number) => (
                    <DiabetesComponentCard
                      key={index}
                      text={article.title}
                      width="[10rem]"
                    />
                  )
                )
              )}
        </div>

        <div className="third flex justify-center mt-5">
          <DiabetesComponentCard
            text="Browse more on diabetes"
            width="[15rem]"
          />
        </div>

        <div className="select flex gap-4 pt-5 font-medium justify-center">
          {categoryNames.map((categoryName: string, index: number) => (
            <p
              key={index}
              className={`underline cursor-pointer${
                categoryName === selectedCategory ? " selected" : ""
              }`}
              onClick={() => handleCategoryClick(categoryName)}
            >
              {categoryName}
            </p>
          ))}
        </div>

        {selectedCategory &&
          articles
            .filter((categoryData) => categoryData[selectedCategory])
            .flatMap((categoryData) =>
              categoryData[selectedCategory!].map(
                (overview: MedicalArticle, index: number) => (
                  <div
                    key={index}
                    className="last flex flex-col gap-4 mb-4 justify-center items-center mt-[3rem]"
                  >
                    <DiabetesTitleComponentCard
                      title={overview.title}
                      content={overview.summary}
                      id={overview.id}
                    />
                  </div>
                )
              )
            )}
      </div>
    </div>
  );
};

export default ResourceCenterComponent;
