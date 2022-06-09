import { defineStore } from "pinia";
// import { fakeApi } from "@/services/api";
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";
// import router from "../router";
// import { toastError, toastSuccess } from "../utils/toast";

export const orderStore = defineStore("order", {
  state: () => ({
    clients: [],
  }),
  getters: mapStores(userStore),
  actions: {
    loadClients() {
      if (this.userStore.isAdmin) {
        console.log("");
      }
    },
  },
});
