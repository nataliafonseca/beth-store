<template>
  <section class="sidebar">
    <header>
      <button class="icon-button" @click.prevent="productStore.toggleCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 svg-icon close-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <span>SACOLA</span>
      <button class="icon-button" @click.prevent="expandCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 svg-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </header>
    <cart-body />
  </section>
</template>

<script>
import CartBody from "./CartBody.vue";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";

export default {
  name: "CartSidebar",
  components: { CartBody },
  computed: {
    ...mapStores(productStore, userStore),
  },
  methods: {
    expandCart() {
      this.$router.push({ name: "cart" });
      this.productStore.closeCart();
    },
  },
};
</script>

<style scoped>
.sidebar {
  background: var(--background-secondary);
  width: 350px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 76px * 2);
  box-shadow: var(--box-shadow);
}

header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--primary);
  color: var(--background-secondary);
  padding: 0 10px;
}

header span {
  font-size: 1.2rem;
  font-weight: bold;
}

.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-button:hover {
  color: var(--background-details);
}

.svg-icon {
  width: 24px;
}
</style>
