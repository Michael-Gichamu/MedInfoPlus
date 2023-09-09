import { useEffect, useState } from "react";
import { fetchSaved } from "../../actions/savedarticle.actions";
import { LoadingComponent } from "../../components/Loading";
import { useNavigate } from "react-router-dom";

export const SavedArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const user = localStorage.getItem("user_data");

  const str_user = JSON.stringify(user);
  const navigate = useNavigate();

  const data = async () => {
    try {
      const resp = await fetchSaved(str_user);
      setLoading(false);
      if (resp) {
        setArticles(resp.data);
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
    const user = localStorage.getItem("user_data");
    if (!user) {
      navigate("/auth/login");
    }

    data();
    console.log(articles);
  }, []);
  return (
    <>
      Saved Article
      {isLoading ? (
        <div className="mx-auto my-auto flex justify-center items-center">
          <LoadingComponent color="#0c0c0c" />
        </div>
      ) : (
        <div>Loading complete</div>
      )}
    </>
  );
};
