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
        <button v-if="!product.quantity" class="btn add-button" disabled>
          ESGOTADO
        </button>
        <div class="counter" v-else-if="cartItem">
          <button @click.prevent="piniaStore.subtractFromCart(product.id)">
            -
          </button>
          <span>
            {{ cartItem.count }}
          </span>
          <button
            v-if="product.remaining"
            @click.prevent="piniaStore.addToCart(product.id)"
          >
            +
          </button>
          <button v-else disabled>+</button>
        </div>
        <button
          v-else
          class="btn add-button"
          @click.prevent="piniaStore.addToCart(product.id)"
        >
          ADICIONAR À SACOLA
        </button>
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
    cartItem() {
      return this.piniaStore.getCartItemById(this.product.id);
    },
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

.counter {
  border: 2px solid var(--primary);
  height: 46px;
  margin-top: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
  cursor: text;
}

.counter button {
  background: transparent;
  border: none;
  padding: 0 15px;
  color: var(--primary);
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.counter button:hover {
  color: var(--primary-darker);
}

.counter button:disabled {
  color: var(--primary-lighter);
}
</style>
