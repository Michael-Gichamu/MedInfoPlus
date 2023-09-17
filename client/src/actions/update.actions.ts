import { apiDomain } from "../utils/api";
import { NewUserCredentials } from "../types/types";

const URL = apiDomain;
const token = localStorage.getItem("user");
export const updateUserCredentials = async (user: NewUserCredentials) => {
  try {
    const { new_name, email, password, new_password } = user;

    const res = await fetch(`${URL}account/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ new_name, email, password, new_password }),
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
