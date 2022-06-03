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

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: { PageHeader, PageFooter, LoadingDots },
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif;
  color: #334455;
  background: #f5f5f5;
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
  min-height: 100vh;
}

#main {
  flex: 1;
}

label {
  margin-bottom: 5px;
}

input,
select,
textarea {
  color: inherit;
  border-radius: 4px;
  border: 1px solid #ffffff;
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
  border-color: #dd7076;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #dd7076;
  border: 2px solid transparent;
  border-radius: 4px;
  color: #ffffff;
  text-align: center;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.btn:focus {
  border: 1px solid #f5f5f5;
  outline: 1px solid #db9ea1;
}

.btn:hover {
  background: #d35e64;
  transform: scale(1.05);
}

.btn:disabled {
  background: #db9ea1;
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
</style>
