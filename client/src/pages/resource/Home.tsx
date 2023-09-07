import React, { useEffect, useState } from "react";
import { Article } from "../../types/types";
import { TitleCardComponent } from "../../components/Tcard";
import { SmallCardComponent } from "../../components/Scard";
import { datafromServer } from "../../actions/med.actions";

import { findMostRecentArticle } from "../../actions/recentarticle.actions";
import { useNavigate } from "react-router-dom";

export const HomeComponentPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [topArticle, setTopArticle] = useState<Article[]>([]);
  const [recentArticle, setrecentArticle] = useState<Article[]>([]);
  const articleArray: any = [];
  const topArticleArray: any = [];
  const recentArticleArray: any = [];

  const getdata = async () => {
    const response = await datafromServer("medicalarticles/toparticles");
    for (let i = 0; i < response.length; i++) {
      articleArray.push({
        name: response[i].category,
        summary: response[i].summary,
        title: response[i].title,
        id: response[i].id,
        image: response[i].image,
      });
    }
    setArticles(articleArray);
    topArticleArray.push(response[0]);
    setTopArticle(topArticleArray);
    const mostRecentArticle = findMostRecentArticle(response);
    recentArticleArray.push(mostRecentArticle);
    setrecentArticle(recentArticleArray);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth/login");
    }

    getdata();
  }, []);

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
              />
            </div>
          ))}
        </div>
        <div className=" px-[4rem] flex flex-col justify-center ">
          <div className=" mt-5 bg-white w-[18rem] h-[2rem] flex items-center font-bold justify-center ">
            More Recent Articles
          </div>
          {recentArticle.map((article) => (
            <div className=" cursor-pointer">
              <SmallCardComponent
                image={article.image}
                title={article.title}
                content={article.summary}
                key={article.id}
                id={article.id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
