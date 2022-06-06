<template>
  <div class="cart">
    <h1>Sacola de Compras</h1>
    <cart-body />
  </div>
</template>

<script>
import CartBody from "../components/CartBody.vue";
export default {
  name: "CartView",
  components: { CartBody },
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
