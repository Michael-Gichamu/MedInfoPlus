import { apiDomain } from "../utils/api";

export const sendNotification = async (email: string) => {
  const response = await fetch(apiDomain + "account/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const resp = await response.json();
  return resp;
};
