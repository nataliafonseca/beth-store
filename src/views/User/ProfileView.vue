<template>
  <section class="profile">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link
            :class="{ active: ordersIsActive }"
            :to="{ name: 'orders' }"
            >PEDIDOS</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'profile-update' }"
            >ATUALIZAR CADASTRO</router-link
          >
        </li>
        <li>
          <button @click.prevent="userStore.logout">SAIR</button>
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
  name: "ProfileView",
  computed: {
    ...mapStores(userStore),
    ordersIsActive() {
      return this.$route.path.includes("/profile/orders");
    },
  },
};
</script>

<style scoped>
.profile {
  display: grid;
  grid-template-columns: 230px 1fr;
  max-width: 1040px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  gap: 30px;
}

.btn {
  width: 100%;
}

@media screen and (max-width: 700px) {
  section {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }
}

.sidenav a,
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

.sidenav a.router-link-active,
.sidenav a.active {
  background: var(--primary);
  color: var(--background-secondary);
}

.sidenav a:hover,
.sidenav a.router-link-active:hover,
.sidenav a.active:hover button:hover {
  transform: scale(1.05);
  background: var(--primary-dark);
  color: var(--background-secondary);
}
</style>
