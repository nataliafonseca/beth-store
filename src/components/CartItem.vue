<template>
  <loading-dots v-if="loading" />
  <li v-else>
    <div class="image">
      <img :src="product.picture" alt="" />
    </div>
    <div class="info">
      <div class="l1">
        <p>
          <span class="item-title">
            {{ product.description }}
          </span>
          <span class="pid">PID: {{ product.id }}</span>
        </p>
        <button
          @click.prevent="productStore.removeFromCart(product.id)"
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
          {{ toPriceString(product.price) }}
        </span>
        <div class="counter">
          <button @click.prevent="productStore.subtractFromCart(product.id)">
            -
          </button>
          <span>
            {{ item.count }}
          </span>
          <button
            v-if="product.remaining"
            @click.prevent="productStore.addToCart(product.id)"
          >
            +
          </button>
          <button v-else disabled>+</button>
        </div>
        <span class="product-subtotal">
          {{ toPriceString(product.price * item.count) }}
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import LoadingDots from "./LoadingDots.vue";
import { toPriceString } from "@/utils/textMasks";

export default {
  name: "CartItem",
  components: { LoadingDots },
  props: ["item"],
  data() {
    return { product: null, loading: false };
  },
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    async getProductById() {
      const product = await this.productStore.getProductById(
        this.item.product_id
      );
      this.product = product;
    },
    toPriceString,
  },
  async created() {
    this.loading = true;
    await this.getProductById();
    this.loading = false;
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
  border-top: 1px solid var(--border-light);
}

.image img {
  width: 50px;
  height: 50px;
  object-fit: scale-down;
  object-position: center;
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
  font-weight: bold;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.l1 .pid {
  margin-left: auto;
  margin-right: 10px;
  color: var(--text-lighter);
}

.icon-button {
  background: transparent;
  border: none;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.3s;
}

.icon-button:hover {
  color: var(--primary-darker);
}

.trash-icon {
  width: 18px;
}

.l2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.product-price {
  color: var(--text-light-2);
}

.product-subtotal {
  font-weight: bold;
  text-align: end;
  color: var(--accent);
}

.counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  margin: 0 15px 0 0;
}

.counter button {
  background: transparent;
  border: none;
  padding: 0 8px;
  color: var(--primary);
  font-size: 1.2rem;
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
