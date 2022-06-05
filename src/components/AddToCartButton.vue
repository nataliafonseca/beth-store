<template>
  <button v-if="!product.quantity" class="btn add-button" disabled>
    ESGOTADO
  </button>
  <div class="counter" v-else-if="cartItem">
    <button @click.prevent="productStore.subtractFromCart(product.id)">
      -
    </button>
    <span>
      {{ cartItem.count }}
    </span>
    <button
      v-if="product.remaining"
      @click.prevent="productStore.addToCart(product.id)"
    >
      +
    </button>
    <button v-else disabled>+</button>
  </div>
  <button
    v-else
    class="btn add-button"
    @click.prevent="productStore.addToCart(product.id)"
  >
    ADICIONAR À SACOLA
  </button>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "AddToCartButton",
  props: ["product"],
  computed: {
    ...mapStores(productStore),
    cartItem() {
      return this.productStore.getCartItemById(this.product.id);
    },
  },
};
</script>

<style scoped>
button {
  white-space: nowrap;
}

.counter {
  border: 2px solid var(--primary);
  height: 46px;
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
