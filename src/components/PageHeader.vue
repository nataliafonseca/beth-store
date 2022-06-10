<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }" class="logo">
        beth<span>store</span>
      </router-link>
      <div class="user" v-if="!loading">
        <router-link
          v-if="userStore.isAdmin"
          :to="{ name: 'product-table' }"
          class="btn"
        >
          <span class="small-screen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="big-screen"> ADMIN </span></router-link
        >
        <router-link
          v-if="userStore.isAuthenticated"
          :to="{ name: 'orders' }"
          class="btn"
        >
          <span class="small-screen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="big-screen">
            {{ userStore.user.name.split(" ")[0].toUpperCase() }}
          </span>
        </router-link>
        <router-link v-else :to="{ name: 'login' }" class="btn">
          <span class="small-screen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="big-screen"> LOGIN </span></router-link
        >

        <button @click.prevent="openCart" class="cartButton">
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
          <div v-if="getCartTotalCount() !== 0" class="cart-count">
            <span>{{ getCartTotalCount() }}</span>
          </div>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";

export default {
  name: "PageHeader",
  props: ["loading"],
  computed: {
    ...mapStores(productStore, userStore),
    cartCount() {
      return this.productStore.cart.length;
    },
    smallScreen() {
      return window.matchMedia("(max-width: 500px)").matches;
    },
  },
  methods: {
    getCartTotalCount() {
      return this.productStore.cart.reduce(
        (totalCount, currentItem) => totalCount + currentItem.count,
        0
      );
    },
    openCart() {
      if (window.matchMedia("(min-width: 1020px)").matches) {
        this.productStore.toggleCart();
      } else {
        this.$router.push({ name: "cart" });
      }
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
  flex-wrap: wrap;
}

.logo {
  font-family: "Montserrat Alternates";
  font-size: 2rem;
  font-weight: bold;
}

.logo span {
  color: var(--primary);
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
  fill: var(--primary);
  transition: all 0.3s;
}

svg:hover {
  height: 42px;
  fill: var(--primary-dark);
  transform: scale(1.05);
}

.cart-count {
  position: absolute;
  width: 18px;
  height: 18px;
  font-size: 0.8rem;
  border: 1px solid var(--primary-dark);
  border-radius: 50%;
  display: block;
  background: var(--primary-dark);
  color: var(--background-secondary);
  text-align: center;
  top: 0px;
  right: 0px;
}

.small-screen {
  display: none;
}

@media screen and (max-width: 530px) {
  nav {
    padding: 15px 10px;
  }

  .user .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1rem;
    padding: 5px 20px;
  }

  .svg-icon {
    height: 1.5rem;
    fill: var(--background-secondary);
  }

  .svg-icon:hover {
    height: 1.5rem;
    fill: var(--background-details);
    transform: scale(1.05);
  }

  .small-screen {
    display: flex;
    align-items: center;
  }

  .big-screen {
    display: none;
  }
}
</style>
