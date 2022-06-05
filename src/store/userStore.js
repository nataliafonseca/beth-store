import { defineStore } from "pinia";
import { api } from "@/services/api";
import { decodeJwt } from "jose";

export const userStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    async login({ email, password }) {
      try {
        const response = await api.post("login", { email, password });
        const token = response.headers.authorization.split(" ")[1];
        const decoded = decodeJwt(token);
        console.log(decoded);
        localStorage.setItem("bethstore.auth_token", token);
        this.router.push("/profile");
      } catch (error) {
        console.log("ERRO!");
        console.log(error.response.data.message);
      }
    },
  },
});
