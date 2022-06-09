import { defineStore } from "pinia";
import { fakeApi } from "@/services/api";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import router from "../router";
import { toastError, toastSuccess } from "../utils/toast";

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
    async createOrder(order) {
      try {
        const response = await fakeApi.post("orders", order);
        const { id } = response.data;
        this.productStore.clearCart();
        await this.loadOrders();
        toastSuccess("Pedido efetuado!");
        router.push({ name: "order-details", params: { id } });
      } catch (err) {
        toastError(err.response.data.message);
      }
    },
  },
});
