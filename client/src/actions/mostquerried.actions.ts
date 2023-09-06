import { apiDomain } from "../utils/api";
export const mostQueried = async () => {
  const response = await fetch(apiDomain + "/medicalarticles/toparticles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }
  const data = response.json();

  return data;
};
