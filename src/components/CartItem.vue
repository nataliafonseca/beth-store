<template>
  <li>
    <img :src="item.product.picture" alt="" />
    <div class="info">
      <div class="l1">
        <p>
          <span class="item-title">
            {{ item.product.description }}
          </span>
          <span class="pid">PID: {{ item.product.id }}</span>
        </p>
        <button
          @click.prevent="piniaStore.removeFromCart(item.product.id)"
          class="icon-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 trash-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <div class="l2">
        <span class="product-price">
          {{ formatPrice(item.product.price) }}
        </span>
        <div class="counter">
          <button @click.prevent="piniaStore.subtractFromCart(item.product.id)">
            -
          </button>
          <span>
            {{ item.count }}
          </span>
          <button
            v-if="item.product.remaining"
            @click.prevent="piniaStore.addToCart(item.product.id)"
          >
            +
          </button>
          <button v-else disabled>+</button>
        </div>
        <span class="product-subtotal">
          {{ formatPrice(item.product.price * item.count) }}
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { mapStores } from "pinia";
import { useStore } from "@/store/useStore";

export default {
  name: "CartItem",
  props: ["item"],
  computed: {
    ...mapStores(useStore),
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
  },
};
</script>

<style scoped>
li {
  display: grid;
  grid-template-columns: 50px auto;
  padding: 10px;
  align-items: center;
  gap: 10px;
}

li + li {
  border-top: 1px solid #e8e8e8;
}

.info {
  display: grid;
  gap: 5px;
}

.l1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.l1 p {
  display: flex;
  flex-grow: 1;
}

.l1 .item-title {
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.l1 .pid {
  margin-left: auto;
  margin-right: 10px;
  color: #c5c5c5;
}

.icon-button {
  background: transparent;
  border: none;
  color: #dd7076;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-button:hover {
  color: #d35e64;
}

.trash-icon {
  width: 18px;
}

.l2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.product-price {
  color: #909090;
}

.product-subtotal {
  font-weight: bold;
  color: #779b00;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  margin: 0 15px 0 0;
}

.counter button {
  background: transparent;
  border: none;
  padding: 0 8px;
  color: #dd7076;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.counter button:hover {
  color: #d35e64;
}

.counter button:disabled {
  color: #dab6b8;
}
</style>
