<template>
  <section>
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
        <p>{{ order.street }}, {{ order.number }}</p>
        <p>{{ order.district }}, {{ order.city }}, {{ order.state }}</p>
        <p>CEP {{ order.cep }}</p>
      </div>
      <div class="total">
        <h3>TOTAL</h3>
        <p>{{ formatPrice(order.total_price) }}</p>
      </div>
      <ul>
        <li v-for="item in order.items" :key="item.product.id">
          <img :src="item.product.picture" alt="" />
          <div>
            <p class="description">
              {{ item.product.description }}
            </p>
            <p class="quantity">Quantidade: {{ item.quantity }}</p>
          </div>
          <p class="item-price">
            {{ formatPrice(item.quantity * item.product.price) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { orderStore } from "@/store/orderStore";

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
    ...mapStores(orderStore),
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
  align-items: start;
}

.grid > div,
.grid > ul {
  background: var(--background-secondary);
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  padding: 20px;
  min-height: 130px;
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
  align-items: end;
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
  object-fit: cover;
  object-position: center;
}

.description {
  font-weight: bold;
  margin-bottom: 5px;
}

.quantity {
  color: var(--text-light-2);
}

.item-price {
  align-self: center;
  font-size: 1.1rem;
}
</style>
