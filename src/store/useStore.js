import { defineStore } from "pinia";
import { api } from "@/services/api";

export const useStore = defineStore("pinia", {
  state: () => ({
    categories: [],
    products: [],
    cart: [],
  }), // data
  getters: {}, // computed
  actions: {
    loadCart() {
      const existingCart = localStorage.getItem("cart");

      if (existingCart) this.cart = JSON.parse(existingCart);
    },
    async loadProducts(category, search) {
      this.loadCart();

      const response = await api.get("/products");

      let products = response.data;

      if (category !== "-1") {
        products = products.filter(
          (product) => product.category_id === parseInt(category)
        );
      }

      if (search.trim() !== "") {
        products = products.filter(
          (product) =>
            product.description
              .toLowerCase()
              .includes(search.trim().toLowerCase()) ||
            product.model.toLowerCase().includes(search.trim().toLowerCase()) ||
            product.brand.toLowerCase().includes(search.trim().toLowerCase()) ||
            product.size.toLowerCase().includes(search.trim().toLowerCase()) ||
            product.specs.toLowerCase().includes(search.trim().toLowerCase())
        );
      }

      products.map((product) => {
        const productInCart = this.cart.find(
          (item) => item.product.id === product.id
        );

        if (productInCart)
          product.remaining = product.quantity - productInCart.count;
        else product.remaining = product.quantity;

        return product;
      });

      this.products = products;
    },
    async loadCategories() {
      const response = await api.get("/categories");
      this.categories = response.data;
    },
    addToCart(product) {
      const existingProduct = this.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct && product.remaining > 0) {
        existingProduct.count++;
      } else if (product.remaining > 0) {
        this.cart.push({ product, count: 1 });
      }

      this.products.forEach((p) => {
        if (p.id === product.id) product.remaining--;
      });

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    clearCart() {
      localStorage.removeItem("cart");
      this.cart = [];
      this.products.map((product) => {
        product.remaining = product.quantity;
        return product;
      });
    },
  }, // methods
});
