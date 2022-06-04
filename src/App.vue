<template>
  <div id="app">
    <page-header />
    <main id="main">
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <loading-dots v-if="loading" key="loading" />
          <component :is="Component" v-else key="router-view" />
        </transition>
      </router-view>
      <transition name="cart">
        <cart-sidebar v-show="piniaStore.isCartVisible" />
      </transition>
    </main>
    <page-footer />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStore } from "@/store/useStore";
import PageFooter from "./components/PageFooter.vue";
import PageHeader from "./components/PageHeader.vue";
import LoadingDots from "./components/LoadingDots.vue";
import CartSidebar from "./components/CartSidebar.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: { PageHeader, PageFooter, LoadingDots, CartSidebar },
  computed: {
    ...mapStores(useStore),
    url() {
      return this.$route.query;
    },
  },
  async mounted() {
    this.loading = true;
    await this.piniaStore.loadProducts(
      this.url.category ?? "-1",
      this.url.search ?? ""
    );
    await this.piniaStore.loadCategories();
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
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif;
  color: var(--text);
  background: var(--background-primary);
}

ul {
  list-style: none;
}

a,
button {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh + 82px);
}

#main {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto;
}

label {
  margin-bottom: 5px;
}

input,
select,
textarea {
  color: inherit;
  border-radius: 4px;
  border: 1px solid var(--background-secondary);
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3;
  font-size: 1rem;
  font-family: inherit;
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

.btn {
  display: block;
  padding: 10px 30px;
  background: var(--primary);
  border: 2px solid transparent;
  border-radius: 4px;
  color: var(--background-secondary);
  text-align: center;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.btn:focus {
  border: 1px solid var(--background-primary);
  outline: 1px solid var(--primary-light);
}

.btn:hover {
  background: var(--primary-dark);
  transform: scale(1.05);
}

.btn:disabled {
  background: var(--primary-light);
  box-shadow: none;
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
