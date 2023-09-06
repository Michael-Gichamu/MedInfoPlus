import { useEffect, useState } from "react";
import { fetchSaved } from "../../actions/savedarticle.actions";
export const SavedArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const user = localStorage.getItem("user_data");
  const str_user = JSON.stringify(user);
  const data = async () => {
    const resp = await fetchSaved(str_user);
    if (resp.ok) {
      setArticles(resp.data);
    } else {
      console.log("Error fetching");
    }
  };
  useEffect(() => {
    data();
    console.log(articles);
  });
  return <>Saved Article</>;
};
