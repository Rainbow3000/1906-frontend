import axios from "axios";

const baseURL = "https://real-rose-pangolin-sari.cyclic.app/api/";

let token;

const user = JSON.parse(localStorage.getItem("user")) || null;

if (user) {
  token = user.token;
}

export const userRequest = axios.create({
  baseURL: baseURL,
  headers: {
    token: `Bearer ${token}`,
  },
});

export const publicRequest = axios.create({
  baseURL: baseURL,
});
