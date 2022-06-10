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
</style>
