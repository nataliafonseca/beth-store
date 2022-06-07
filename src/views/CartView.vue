<template>
  <div class="cart">
    <h1>Sacola de Compras</h1>
    <cart-body>
      <button class="btn clear-btn" @click.prevent="productStore.clearCart">
        LIMPAR SACOLA
      </button>
      <button @click.prevent="goToCheckout" class="btn cart-btn">
        FINALIZAR PEDIDO
      </button>
    </cart-body>
  </div>
</template>

<script>
import CartBody from "../components/CartBody.vue";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "CartView",
  components: { CartBody },

  computed: {
    ...mapStores(productStore),
  },
  methods: {
    goToCheckout() {
      this.$router.push({ name: "checkout" });
      this.productStore.closeCart();
    },
  },
};
</script>

<style scoped>
.cart {
  margin: 40px auto;
  max-width: 500px;
}

h1 {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 40px;
}

.cart-btn,
.clear-btn {
  margin: 10px auto;
  width: calc(100% - 40px);
}

.clear-btn {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.clear-btn:hover {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}
</style>
