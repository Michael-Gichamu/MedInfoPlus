import { useEffect, useState } from "react";
import { fetchSaved } from "../../actions/savedarticle.actions";
import { LoadingComponent } from "../../components/Loading";
import { useNavigate } from "react-router-dom";

export const SavedArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const data = async () => {
    try {
      const resp = await fetchSaved();
      setLoading(false);
      setArticles(resp);

      if (resp) {
        console.log(articles);

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
          <LoadingComponent color="#0c0c0c" type="" />
        </div>
      ) : (
        <div>Loading complete</div>
      )}
    </>
  );
};
