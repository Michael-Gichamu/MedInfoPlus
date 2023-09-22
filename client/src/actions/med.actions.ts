import { apiDomain } from "../utils/api";
const URL = apiDomain;

// CUSTOM FUNCTION TO SEND GET REQUESTS

export const datafromServer = async (path: any) => {
  const response = await fetch(`${URL + path}`, {
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
