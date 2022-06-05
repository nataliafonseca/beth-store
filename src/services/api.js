import axios from "axios";

const token = localStorage.getItem("bethstore.auth_token") ?? "";

const api = axios.create({
  baseURL: "https://bethstoreweb.herokuapp.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { api };
