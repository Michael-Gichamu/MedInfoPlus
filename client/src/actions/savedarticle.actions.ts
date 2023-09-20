import { apiDomain } from "../utils/api";
const base_url = apiDomain;
const user = localStorage.getItem("user_id");

export const saveService = async (id: any) => {
  const sanitizedUser = user?.replace(/"/g, "");
  const sanitizedId = id.replace(/"/g, "");

  const response = await fetch(
    `${base_url}saved_medicalarticles/${sanitizedUser}/${sanitizedId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save article.");
  }

  const savedArticle = await response.json();
  return savedArticle;
};
export const fetchSaved = async () => {
  const sanitizedUser = user?.replace(/"/g, "");

  const response = await fetch(
    base_url + `saved_medicalarticles` + `/${sanitizedUser}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to save article.");
    return;
  }

  const savedArticles = await response.json();

  return savedArticles;
};
export const deleteArticle = async (id: any) => {
  const sanitizedUser = user?.replace(/"/g, "");
  const sanitizedId = id.replace(/"/g, "");

  const response = await fetch(
    `${base_url}saved_medicalarticles/${sanitizedUser}/${sanitizedId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete article.");
  }

  const deletionResp = await response.json();
  return deletionResp;
};
