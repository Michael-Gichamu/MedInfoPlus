import { useEffect, useState } from "react";
import { fetchSaved } from "../../actions/savedarticle.actions";
import { LoadingComponent } from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { TitleCardComponent } from "../../components/Tcard";
import Popover from "../../components/PopOver";

export const SavedArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>("User");

  const navigate = useNavigate();
  const currentTime = new Date();

  const currentHour = currentTime.getHours();
  const [greetingMessage, setGreetingMessage] = useState<string>("");

  const getTime = () => {
    if (currentHour < 12) {
      setGreetingMessage("Good morning!");
    } else if (currentHour < 18) {
      setGreetingMessage("Good afternoon!");
    } else {
      setGreetingMessage("Good evening!");
    }
  };

  const data = async () => {
    try {
      const resp = await fetchSaved();
      setLoading(false);

      setArticles(resp);

      if (resp) {
        setLoading(false);
      } else {
        console.log("Error fetching");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userName = localStorage.getItem("user_name");
    setUserName(userName);
    if (!user) {
      navigate("/auth/login");
    }
    getTime();

    data();
  }, []);
  return (
    <>
      <div className=" p-5 text-xl"> {greetingMessage + " " + userName}</div>
      <div className=" w-full flex justify-end">
        <Popover
          trigger={
            <button className="bg-white border mr-4 border-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded">
              <img
                src="/settings.svg"
                alt="settings-svg"
                className="w-[40px] h-[25px]"
              />
            </button>
          }
        />
      </div>
      <div className="w-full text-center text-lg font-medium">
        Your saved articles
      </div>

      {isLoading ? (
        <div className="mx-auto my-auto flex justify-center items-center">
          <LoadingComponent color="#0c0c0c" type="" />
        </div>
      ) : (
        <div>
          {articles.map((article: any) => (
            <div key={article.id} className="">
              <TitleCardComponent
                image={article.image}
                title={article.title}
                content={article.summary}
                id={article.id}
                saved={true}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
