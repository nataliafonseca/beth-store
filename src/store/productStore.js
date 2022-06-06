import { defineStore } from "pinia";
import { api, fakeApi } from "@/services/api";

export const productStore = defineStore("product", {
  state: () => ({
    categories: [],
    products: [],
    visibleProducts: [],
    cart: [],
    isCartVisible: false,
  }),

  actions: {
    loadCart() {
      const existingCart = localStorage.getItem("bethstore.cart");
      if (existingCart) this.cart = JSON.parse(existingCart);
    },
    async loadProducts() {
      this.loadCart();

      const response = await fakeApi.get("/products");
      const products = response.data;

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
      const response = await api.get("/categorias");
      this.categories = response.data.map((category) => ({
        id: category.id,
        description: category.nome,
        sector: category.setor,
      }));
    },
    filterProducts(category, search) {
      let products = this.products;

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

      this.visibleProducts = products;
    },
    getProductById(id) {
      return this.products.find((product) => product.id === parseInt(id));
    },
    async getCategoryById(id) {
      if (this.categories.length === 0) {
        await this.loadCategories();
      }

      return this.categories.find((category) => category.id === parseInt(id));
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

      localStorage.setItem("bethstore.cart", JSON.stringify(this.cart));
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

      localStorage.setItem("bethstore.cart", JSON.stringify(this.cart));
    },
    removeFromCart(product_id) {
      this.cart = this.cart.filter((item) => item.product_id !== product_id);

      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      product.remaining = product.quantity;

      localStorage.setItem("bethstore.cart", JSON.stringify(this.cart));
    },
    clearCart() {
      localStorage.removeItem("bethstore.cart");
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
  },
});
