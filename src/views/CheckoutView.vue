<template>
  <section>
    <div class="content">
      <h1>Confirme sua compra</h1>
      <cart-body />
      <h2>Endereço de Entrega</h2>
      <user-form @submit-form="completeOrder">
        <button class="btn" type="submit">COMPLETAR COMPRA</button>
      </user-form>
    </div>
  </section>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import CartBody from "../components/CartBody.vue";
import { mapStores } from "pinia";
import { orderStore } from "@/store/orderStore";
import { userStore } from "../store/userStore";
import { productStore } from "../store/productStore";

export default {
  name: "OrderConfirmationView",
  components: { CartBody, UserForm },
  computed: {
    ...mapStores(orderStore, userStore, productStore),
  },
  methods: {
    getTotal() {
      return this.productStore.cart.reduce((totalPrice, currentItem) => {
        const product = this.productStore.getProductById(
          currentItem.product_id
        );
        const subtotal = currentItem.count * product.price;
        return totalPrice + subtotal;
      }, 0);
    },
    completeOrder() {
      const order = {
        items: this.productStore.cart,
        status: "EM PROCESSAMENTO",
        total_price: this.getTotal(),
        date: new Date(),
        user: this.userStore.user,
      };

      this.orderStore.createOrder(order);
    },
  },
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
  margin: 20px 0;
}
</style>
