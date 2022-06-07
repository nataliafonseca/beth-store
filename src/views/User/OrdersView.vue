<template>
  <div class="orders-view">
    <router-link
      :to="{ name: 'order-details', params: { id: order.id } }"
      class="order"
      v-for="order in this.orders"
      :key="order.id"
    >
      <div>
        <h3>DATA</h3>
        <p>
          {{
            new Date(order.date).toLocaleDateString("pt-br", {
              timeZone: "UTC",
            })
          }}
        </p>
      </div>
      <div>
        <h3>TOTAL</h3>
        <p>{{ formatPrice(order.total_price) }}</p>
      </div>

      <div class="order-status">
        <p class="id lighter">PEDIDO #{{ order.id }}</p>
        <p class="status" :class="status(order.status)">{{ order.status }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { orderStore } from "@/store/orderStore";

export default {
  name: "OrdersView",
  data() {
    return { loading: false };
  },
  computed: {
    ...mapStores(orderStore),
    orders() {
      return [...this.orderStore.orders].sort((a, b) =>
        b.date > a.date ? 1 : -1
      );
    },
  },
  methods: {
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
    status(status) {
      if (status === "EM PROCESSAMENTO") {
        return "pending";
      } else if (status === "CANCELADO") {
        return "canceled";
      }
      return "complete";
    },
  },
};
</script>

<style scoped>
.orders-view {
  margin-bottom: 40px;
}
.order {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 20px;
  background: var(--background-secondary);
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  padding: 20px;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.order:hover {
  box-shadow: var(--box-shadow-hover);
  transform: scale(1.02);
}

.order + .order {
  margin-top: 15px;
}

.order > div {
  display: grid;
  gap: 5px;
  align-items: start;
}

.order-status {
  text-align: right;
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
</style>
