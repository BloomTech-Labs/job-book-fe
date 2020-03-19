import axios from "axios";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const api = () => {
  axios.create({
    baseURL: "",
    headers: {
      Authorization: getToken()
    }
  });
};
