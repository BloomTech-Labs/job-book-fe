import axios from "axios";

export function getToken(): String {
  return localStorage.getItem("token");
}

export function api(): void {
  axios.create({
    baseURL: "",
    headers: {
      Authorization: getToken()
    }
  });
}
