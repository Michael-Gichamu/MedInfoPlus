import { ILoginData, IsignupData } from "../types/auth.types";
import { apiDomain } from "../utils/api";

const URL = apiDomain + "/account/";

export const getLoggedInUser = (): string => {
  const user: string = JSON.parse(localStorage.getItem("user") as string);
  return user;
};

export const signup = async (user: IsignupData) => {
  try {
    const { name, email, password, provider } = user;

    const res = await fetch(`${URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, provider }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok!");
    }
    const data = res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const login = async (user: ILoginData) => {
  const res = await fetch(`${URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.status == 401) {
    return res.status;
  }
  if (!res.ok) {
    throw new Error("Network response was not ok!");
  }
  const data = res.json();

  return data;
};
