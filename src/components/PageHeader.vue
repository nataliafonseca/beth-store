<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }" class="logo">
        beth<span>store</span>
      </router-link>
      <div class="user">
        <router-link :to="{ name: 'login' }" class="btn">Login</router-link>
        <button @click.prevent="piniaStore.toggleCart" class="cartButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>
          <div v-if="cartCount !== 0" class="cart-count">
            <span>{{ cartCount }}</span>
          </div>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import { useStore } from "@/store/useStore";

export default {
  name: "PageHeader",
  computed: {
    ...mapStores(useStore),
    cartCount() {
      return this.piniaStore.cart.length;
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  font-family: "Montserrat Alternates";
  font-size: 2rem;
  font-weight: bold;
}

.logo span {
  color: #dd7076;
}

.user {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  align-items: center;
}

.cartButton {
  position: relative;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
}

svg {
  height: 42px;
  fill: #dd7076;
  transition: all 0.3s;
}

svg:hover {
  height: 42px;
  fill: #d35e64;
  transform: scale(1.05);
}

.cart-count {
  position: absolute;
  width: 18px;
  height: 18px;
  font-size: 0.8rem;
  border: 1px solid #d35e64;
  border-radius: 50%;
  display: block;
  background: #d35e64;
  color: #ffffff;
  text-align: center;
  top: 0px;
  right: 0px;
}
</style>
