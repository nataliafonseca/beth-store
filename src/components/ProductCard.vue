<template>
  <div class="product">
    <router-link :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.picture" alt="Product" />
      <div class="product-info">
        <p class="product-price">
          {{ formatPrice(product.price) }} <span>PID: {{ product.id }}</span>
        </p>

        <h2 class="product-title">
          {{ product.description }}
        </h2>
        <p class="product-details">
          Marca {{ product.brand }}, modelo {{ product.model }}, tamanho
          {{ product.size }}
        </p>
        <add-to-cart-button class="add-button" :product="product" />
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import AddToCartButton from "./AddToCartButton.vue";

export default {
  name: "ProductCard",
  components: { AddToCartButton },
  props: ["product"],
  computed: {
    ...mapStores(productStore),
    cartItem() {
      return this.productStore.getCartItemById(this.product.id);
    },
  },
  methods: {
    getCategoryById(id) {
      const category = this.productStore.categories.find(
        (category) => category.id === id
      );
      return category.description;
    },
    formatPrice(value) {
      value = Number(value);
      if (!isNaN(value)) {
        return Number(value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  background: var(--background-secondary);
  border-radius: 4px;
  transition: all 0.2s;
  padding: 2px;
}

.product-info {
  display: grid;
  margin-top: 5px;
  padding: 10px;
}

.product-price {
  display: flex;
  font-weight: bold;
  color: var(--accent);
}

.product-price span {
  display: inline-block;
  font-weight: initial;
  margin-left: auto;
  color: var(--text-lighter);
}

.product-details {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
}

.add-button {
  margin-top: 20px;
}
</style>
