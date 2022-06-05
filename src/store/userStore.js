import { userStore } from "pinia";
import { api } from "@/services/api";

export const productStore = userStore("user", {
  state: () => ({}), // data
  getters: {}, // computed
  actions: {
    async login(email, password) {
      const response = await api.post("login", { email, password });
      console.log(response);
    },
  }, // methods
});
