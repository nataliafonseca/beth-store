<template>
  <section class="products-container">
    <transition mode="out-in">
      <loading-dots v-if="loading" key="loading" />
      <div
        v-else-if="piniaStore.products.length > 0"
        class="products"
        key="product-list"
      >
        <div
          v-for="product in piniaStore.products"
          class="product"
          :key="product.id"
        >
          <router-link to="/">
            <img :src="product.picture" alt="Product" />
            <div class="product-info">
              <p class="price">{{ formatPrice(product.price) }}</p>
              <h2 class="title">{{ product.description }}</h2>
              <p class="details">
                Marca {{ product.brand }}, modelo {{ product.model }}, tamanho
                {{ product.size }} Marca {{ product.brand }}, modelo
                {{ product.model }}, tamanho {{ product.size }} Marca
                {{ product.brand }}, modelo {{ product.model }}, tamanho
                {{ product.size }} Marca {{ product.brand }}, modelo
                {{ product.model }}, tamanho
                {{ product.size }}
              </p>
              <button
                v-if="product.remaining"
                class="btn add-button"
                @click="piniaStore.addToCart(product)"
              >
                ADICIONAR AO CARRINHO
              </button>
              <button v-else class="btn add-button" disabled>ESGOTADO</button>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else key="no-results">
        <p class="no-results">Busca sem resultados.</p>
      </div>
    </transition>
  </section>
</template>

<script>
import LoadingDots from "./LoadingDots.vue";
import { mapStores } from "pinia";
import { useStore } from "@/store/useStore";

export default {
  components: { LoadingDots },
  name: "ProductList",
  data() {
    return {
      loading: null,
    };
  },
  computed: {
    ...mapStores(useStore),
    url() {
      return this.$route.query;
    },
  },
  methods: {
    getCategoryById(id) {
      const category = this.piniaStore.categories.find(
        (category) => category.id === id
      );
      return category.description;
    },
    formatPrice(value) {
      value = Number(value);
      if (!isNaN(value)) {
        return Number(value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        return "";
      }
    },
  },
  watch: {
    async url() {
      this.loading = true;
      await this.piniaStore.loadProducts(
        this.url.category ?? "-1",
        this.url.search ?? ""
      );
      this.loading = false;
    },
  },
  async created() {
    this.loading = true;
    if (
      (this.url.category && this.url.category !== "-1") ||
      (this.url.search && this.url.search !== "")
    ) {
      await this.piniaStore.loadProducts(
        this.url.category ?? "-1",
        this.url.search ?? ""
      );
      await this.piniaStore.loadCategories();
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
  padding: 2px;
}

.product-info {
  display: grid;
  margin-top: 5px;
  padding: 10px;
}

.price {
  font-weight: bold;
  color: #779b00;
}

.details {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
}

.add-button {
  margin-top: 20px;
}

.no-results {
  margin-top: 100px;
  text-align: center;
}
</style>
