<template>
  <div class="product">
    <router-link to="/">
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
        <button
          v-if="product.remaining"
          class="btn add-button"
          @click.prevent="piniaStore.addToCart(product.id)"
        >
          ADICIONAR À SACOLA
        </button>
        <button v-else class="btn add-button" disabled>ESGOTADO</button>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStore } from "@/store/useStore";

export default {
  name: "ProductCard",
  props: ["product"],
  computed: {
    ...mapStores(useStore),
  },
  methods: {
    getCategoryById(id) {
      const category = this.piniaStore.categories.find(
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
  background: #fff;
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
  color: #779b00;
}

.product-price span {
  display: inline-block;
  font-weight: initial;
  margin-left: auto;
  color: #c5c5c5;
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
