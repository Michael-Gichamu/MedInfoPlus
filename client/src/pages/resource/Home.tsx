import React, { useEffect, useState } from "react";
import { Article } from "../../types/types";
import { TitleCardComponent } from "../../components/Tcard";
import { SmallCardComponent } from "../../components/Scard";
import { datafromServer } from "../../actions/med.actions";
import { findMostRecentArticle } from "../../actions/recentarticle.actions";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../components/Loading";
export const HomeComponentPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [topArticle, setTopArticle] = useState<Article[]>([]);
  const [recentArticle, setrecentArticle] = useState<Article[]>([]);
  const articleArray: any = [];
  const topArticleArray: any = [];
  const recentArticleArray: any = [];
  const [loading, setLoading] = useState<boolean>(true);

  const getdata = async () => {
    const response = await datafromServer("medicalarticles/toparticles");
    // for (let i = 0; i < response.length; i++) {
    articleArray.push({
      name: response[0].category,
      summary: response[0].summary,
      title: response[0].title,
      id: response[0].id,
      image: response[0].image,
    });
    articleArray.push({
      name: response[1].category,
      summary: response[1].summary,
      title: response[1].title,
      id: response[1].id,
      image: response[1].image,
    });
    articleArray.push({
      name: response[2].category,
      summary: response[2].summary,
      title: response[2].title,
      id: response[2].id,
      image: response[2].image,
    });
    setArticles(articleArray);

    topArticleArray.push(response[0]);
    setTopArticle(topArticleArray);
    const mostRecentArticle = findMostRecentArticle(response);
    recentArticleArray.push(mostRecentArticle);
    setrecentArticle(recentArticleArray);
    setLoading(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth/login");
    }

    getdata();
  }, []);
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
          {articles.map((article: any) => (
            <div className=" flex justify-center cursor-pointer    pt-4  text-black text-3xl">
              <TitleCardComponent
                image={article.image}
                key={article.id}
                id={article.id}
                content={article.summary}
                title={article.title}
                saved={false}
              />
            </div>
          ))}
          <div className=" px-[4rem] flex flex-col justify-center  ">
            <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
              Todays Top stories
            </div>
            {topArticle.map((article): any => (
              <div className=" cursor-pointer">
                <SmallCardComponent
                  image={article.image}
                  content={article.summary}
                  title={article.title}
                  key={article.id}
                  id={article.id}
                  saved={false}
                />
              </div>
            ))}
          </div>
          <div className=" px-[4rem] flex flex-col justify-center ">
            <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
              More Recent Articles
            </div>
            {recentArticle.map((article) => (
              <div className=" ">
                <SmallCardComponent
                  image={article.image}
                  title={article.title}
                  content={article.summary}
                  key={article.id}
                  id={article.id}
                  saved={false}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};
