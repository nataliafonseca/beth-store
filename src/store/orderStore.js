import { defineStore } from "pinia";
import { fakeApi } from "@/services/api";
// import { toastError } from "@/utils/toast";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";

export const orderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  getters: mapStores(productStore, userStore),
  actions: {
    async loadOrders() {
      const response = await fakeApi.get("orders");
      this.orders = response.data.map((order) => {
        const items = order.items.map((item) => ({
          product: this.productStore.getProductById(item.product_id),
          quantity: item.quantity,
        }));

        return {
          ...order,
          items,
        };
      });
    },
    getOrderById(id) {
      return this.orders.find((order) => order.id === id);
    },
  },
});
