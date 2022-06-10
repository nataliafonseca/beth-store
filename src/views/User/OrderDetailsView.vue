<template>
  <section>
    <div class="actions" v-if="userStore.isAdmin">
      <button
        @click.prevent="onApprove(order.id)"
        class="btn icon-button"
        aria-label="aprovar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        @click.prevent="onCancel(order.id)"
        class="btn icon-button"
        aria-label="cancelar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
    <div class="header">
      <div class="order-status">
        <p class="id lighter">PEDIDO #{{ order.id }}</p>
        <p class="status" :class="status(order.status)">{{ order.status }}</p>
      </div>
      <span class="lighter">
        {{
          new Date(order.date).toLocaleDateString("pt-br", {
            timeZone: "UTC",
          })
        }}
      </span>
    </div>
    <div class="grid">
      <div class="address">
        <h3>ENDEREÇO DE ENTREGA</h3>
        <p>{{ order.user.name }}</p>
        <p class="lighter">{{ order.user.street }}, {{ order.user.number }}</p>
        <p class="lighter">
          {{ order.user.district }}, {{ order.user.city }},
          {{ order.user.state }}
        </p>
        <p class="lighter">{{ order.user.cep }}</p>
      </div>
      <div class="total">
        <h3>TOTAL</h3>
        <p>{{ toPriceString(order.total_price) }}</p>
      </div>
      <ul>
        <li v-for="item in order.items" :key="item.product.id">
          <img :src="item.product.picture" alt="" />
          <div>
            <p class="description">
              {{ item.product.description }}
            </p>
            <p class="quantity">Quantidade: {{ item.quantity }}</p>
            <p class="product-price">
              {{ toPriceString(item.product.price) }}
            </p>
          </div>
          <p class="item-price">
            {{ toPriceString(item.quantity * item.product.price) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { orderStore } from "@/store/orderStore";
import { userStore } from "@/store/userStore";
import { toPriceString } from "@/utils/textMasks";

export default {
  name: "OrderDetailsView",
  props: ["id"],
  data: function () {
    return {
      order: null,
      loading: false,
    };
  },
  computed: {
    ...mapStores(orderStore, userStore),
  },
  methods: {
    status(status) {
      if (status === "EM PROCESSAMENTO") {
        return "pending";
      } else if (status === "CANCELADO") {
        return "canceled";
      }
      return "complete";
    },
    toPriceString,
  },
  created() {
    this.order = this.orderStore.getOrderById(parseInt(this.id));
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 40px;
}

.grid > div,
.grid > ul {
  background: var(--background-secondary);
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  padding: 20px;
}

.grid ul {
  grid-column: -1 / 1;
}

h3 {
  margin-bottom: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

.order-status {
  display: grid;
  justify-content: space-between;
  gap: 5px;
}

.lighter {
  color: var(--text-light-2);
}

.status {
  display: inline-block;
  width: max-content;
  margin-left: auto;
  padding: 2px 4px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.8rem;
}

.pending {
  background: #cea046;
}

.complete {
  background: #579f6e;
}

.canceled {
  background: #d34c46;
}

.total {
  display: grid;
}

.total p {
  font-weight: bold;
  align-self: end;
  text-align: right;
  font-size: 2.2rem;
  color: var(--accent);
}

li {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
}

li + li {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-light);
}

img {
  height: 70px;
  width: 100px;
  object-fit: scale-down;
  object-position: center;
}

.description {
  font-weight: bold;
  margin-bottom: 5px;
}

.quantity {
  color: var(--text-light-2);
}

.product-price {
  color: var(--text-light-2);
  margin-top: 3px;
}

.item-price {
  align-self: center;
  font-size: 1.1rem;
}

.no-orders {
  margin: 50px 20px;
}

.no-orders p {
  text-align: center;
}

@media screen and (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
}

.icon-button {
  padding: 5px 5px;
  display: flex;
}

.icon-button svg {
  width: 1.2rem;
}
</style>
