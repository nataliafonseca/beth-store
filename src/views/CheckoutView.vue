<template>
  <section>
    <div class="content">
      <h1>Confirme sua compra</h1>
      <cart-body />
      <h2>Endereço de Entrega</h2>
      <address-form />
      <button class="btn">COMPLETAR COMPRA</button>
    </div>
  </section>
</template>

<script>
import AddressForm from "../components/AddressForm.vue";
import CartBody from "../components/CartBody.vue";

export default {
  name: "OrderConfirmationView",
  components: { CartBody, AddressForm },
};
</script>

<style scoped>
section {
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 95vw;
  margin: 0 auto;
}

.content {
  max-width: 600px;
  margin: 0 auto;
  display: grid;
}

h1 {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 40px;
}

h2 {
  text-align: center;
  margin: 40px 0;
}

button {
  margin: 40px 50px;
}
</style>
