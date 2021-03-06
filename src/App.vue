<template>
  <div id="app">
    <page-header :loading="loading" />
    <router-view class="view" v-slot="{ Component }">
      <transition mode="out-in">
        <loading-dots class="expand" v-if="loading" key="loading" />
        <main v-else id="main">
          <transition mode="out-in">
            <component :is="Component" key="router-view" />
          </transition>
          <transition name="cart">
            <cart-sidebar v-show="productStore.isCartVisible" />
          </transition>
        </main>
      </transition>
    </router-view>
    <page-footer />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import { orderStore } from "@/store/orderStore";
import { clientStore } from "@/store/clientStore";
import PageFooter from "./components/PageFooter.vue";
import PageHeader from "./components/PageHeader.vue";
import LoadingDots from "./components/LoadingDots.vue";
import CartSidebar from "./components/CartSidebar.vue";

export default {
  data() {
    return { loading: false };
  },
  components: { PageHeader, PageFooter, LoadingDots, CartSidebar },
  computed: {
    ...mapStores(productStore, userStore, orderStore, clientStore),
  },
  async created() {
    this.loading = true;
    this.userStore.loadUser();
    await this.productStore.loadProducts();
    await this.productStore.loadCategories();
    await this.clientStore.loadClients();
    await this.orderStore.loadOrders();
    this.loading = false;
  },
};
</script>

<style>
:root {
  --primary: #dd7076;
  --primary-dark: #d35e64;
  --primary-darker: #cf464d;
  --primary-light: #db9ea1;
  --primary-lighter: #dab6b8;
  --background-primary: #f5f5f5;
  --background-secondary: #ffffff;
  --background-details: #e5e5e5;
  --accent: #779b00;
  --text: #334455;
  --text-light-1: #61718d;
  --text-light-2: #909090;
  --text-lighter: #c5c5c5;
  --border: #c9c9c9;
  --border-light: #e8e8e8;
  --box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  --box-shadow-hover: 0 4px 8px rgba(30, 60, 90, 0.2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, "Open Sans", sans-serif;
  color: var(--text);
  background: var(--background-primary);
}

ul {
  list-style: none;
}

button,
a {
  color: inherit;
  text-decoration: none;
}

.link {
  color: var(--primary);
  text-decoration: none;
  transition: all 0.3s;
}

.link:hover {
  color: var(--primary-darker);
  text-decoration: underline;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh + 82px);
}

.view {
  flex: 1;
}

#main,
.expand {
  flex: 1;
  display: flex;
}

input,
select,
textarea {
  color: inherit;
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 15px;
  box-shadow: var(--box-shadow);
  transition: all 0.3;
  font-size: 1rem;
  font-family: inherit;
  background: var(--background-secondary);
}

input:focus,
input:hover,
select:focus,
select:hover,
textarea:focus,
textarea:hover {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: var(--primary);
}

input:disabled,
select:disabled,
textarea:disabled,
input:disabled:hover,
select:disabled:hover,
textarea:disabled:hover {
  background: var(--background-details);
  border: transparent;
  box-shadow: var(--box-shadow);
}

.input-errors {
  color: #bd2c36;
  margin-top: 3px;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: var(--primary);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--background-secondary);
  text-align: center;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: var(--box-shadow-hover);
  cursor: pointer;
  transition: all 0.3s;
}

.btn:focus {
  border: 1px solid var(--background-primary);
  outline: 1px solid var(--primary-lighter);
}

.btn:hover {
  background: var(--primary-dark);
  transform: scale(1.05);
}

.btn:disabled {
  background: var(--primary-light);
  box-shadow: none;
  cursor: default;
}

.btn:disabled:hover {
  transform: scale(1);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.cart-enter,
.cart-leave-to {
  opacity: 0;
  transform: translate3d(0, 0, -30px);
}

.cart-enter-active,
.cart-leave-active {
  transition: all 0.3s;
}
</style>
