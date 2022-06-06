import axios from "axios";

const token = localStorage.getItem("bethstore.auth_token") ?? "";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: token,
  },
});

const fakeApi = axios.create({
  baseURL: process.env.VUE_APP_JDB_URL,
});

export { api, fakeApi };
