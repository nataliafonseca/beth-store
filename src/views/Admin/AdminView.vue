<template>
  <section class="admin">
    <nav class="nav">
      <ul>
        <li>
          <router-link
            :to="{ name: 'product-table' }"
            :class="{ active: productsIsActive }"
            >PRODUTOS</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'category-table' }"
            :class="{ active: categoriesIsActive }"
            >CATEGORIAS</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'profile-update' }"
            :class="{ active: clientsIsActive }"
            >CLIENTES</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'profile-update' }"
            :class="{ active: ordersIsActive }"
            >PEDIDOS</router-link
          >
        </li>
      </ul>
    </nav>
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";

export default {
  name: "AdminView",
  computed: {
    ...mapStores(userStore),
    productsIsActive() {
      return this.$route.path.includes("/admin/products");
    },
    categoriesIsActive() {
      return this.$route.path.includes("/admin/categories");
    },
    ordersIsActive() {
      return this.$route.path.includes("/admin/orders");
    },
    clientsIsActive() {
      return this.$route.path.includes("/admin/clients");
    },
  },
};
</script>

<style scoped>
.admin {
  max-width: 1000px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  gap: 30px;
}

.btn {
  width: 100%;
}

.nav ul {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 20px;
}

@media screen and (max-width: 700px) {
  .nav ul {
    grid-template-columns: 1fr;
    margin-top: 20px;
    gap: 0px;
  }
}

.nav a,
button {
  padding: 15px;
  display: block;
  background: var(--background-details);
  margin-bottom: 10px;
  border-radius: 4px;
  text-align: center;
  transition: all 0.3s;
  border: none;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
}

.nav a.router-link-active,
.nav a.active {
  background: var(--primary);
  color: var(--background-secondary);
}

.nav a:hover,
.nav a.router-link-active:hover,
.nav a.active:hover,
button:hover {
  transform: scale(1.05);
  background: var(--primary-dark);
  color: var(--background-secondary);
}
</style>
