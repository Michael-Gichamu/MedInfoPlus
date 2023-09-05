import { apiDomain } from "../utils/api";
const base_url = apiDomain;
const Auth = localStorage.getItem("user");
const user = localStorage.getItem("user_data");
export const saveService = async (id: string) => {
  const response = await fetch(base_url + `/${user}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth}`,
    },
    body: JSON.stringify(id),
  });
  if (!response.ok) {
    throw new Error("Failed to save article.");
  }

  const savedArticle = await response.json();
  return savedArticle;
};
