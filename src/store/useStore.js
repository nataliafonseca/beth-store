import { defineStore } from "pinia";
import { api } from "@/services/api";

export const useStore = defineStore("pinia", {
  state: () => ({
    categories: [],
    products: [],
    cart: [],
    isCartVisible: false,
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

      if (search !== "") {
        products = products.filter(
          (product) =>
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.model.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.size.toLowerCase().includes(search.toLowerCase()) ||
            product.specs.toLowerCase().includes(search.toLowerCase())
        );
      }

      products.map((product) => {
        const productInCart = this.cart.find(
          (item) => item.product_id === product.id
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
    getProductById(id) {
      return this.products.find((product) => product.id === id);
    },
    getCartItemById(id) {
      return this.cart.find((item) => item.product_id === id);
    },
    addToCart(product_id) {
      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      const itemInCart = this.cart.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart && product.remaining > 0) {
        itemInCart.count++;
        product.remaining--;
      } else if (product.remaining > 0) {
        this.cart.push({ product_id: product.id, count: 1 });
        product.remaining--;
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    subtractFromCart(product_id) {
      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      const itemInCart = this.cart.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart && itemInCart.count > 0) {
        itemInCart.count--;
        product.remaining++;
      }

      if (itemInCart.count === 0) {
        this.removeFromCart(product_id);
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(product_id) {
      this.cart = this.cart.filter((item) => item.product_id !== product_id);

      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      product.remaining = product.quantity;

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
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
    openCart() {
      this.isCartVisible = true;
    },
  }, // methods
});
