<template>
  <transition mode="out-in">
    <div v-if="productStore.cart.length > 0" key="has-items">
      <ul>
        <cart-item
          v-for="item in productStore.cart"
          :key="item.product_id"
          :item="item"
        />
      </ul>
      <p class="total">
        <span>Total:</span>
        <span class="total-price">{{ toPriceString(getTotal()) }}</span>
      </p>
      <slot></slot>
    </div>
    <div class="empty-cart" v-else key="no-items">
      <p>
        Poxa, parece que você ainda não adicionou nenhum item à sua sacola :(
      </p>
    </div>
  </transition>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import CartItem from "./CartItem.vue";
import { toPriceString } from "@/utils/textMasks";

export default {
  name: "CartSidebar",
  components: { CartItem },
  computed: {
    ...mapStores(productStore),
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
    toPriceString,
  },
};
</script>

<style scoped>
ul {
  padding: 15px;
}

.total {
  border-top: 2px solid;
  margin: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-weight: bold;
}

.total-price {
  color: var(--accent);
  font-size: 1.2rem;
}

.empty-cart {
  margin: 50px 20px;
}

.empty-cart p {
  text-align: center;
}
</style>
