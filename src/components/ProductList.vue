<template>
  <section class="products-container">
    <transition mode="out-in">
      <div
        v-if="products && products.length > 0"
        class="products"
        key="product-list"
      >
        <div v-for="product in products" class="product" :key="product.id">
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
              <button class="btn add-button">ADICIONAR AO CARRINHO</button>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else-if="products" key="no-results">
        <p class="no-results">Busca sem resultados.</p>
      </div>
      <loading-dots v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import { api } from "../services/api";
import LoadingDots from "./LoadingDots.vue";

export default {
  components: { LoadingDots },
  name: "ProductList",
  data() {
    return {
      loading: null,
      products: null,
      categories: null,
    };
  },
  computed: {
    url() {
      return this.$route.query;
    },
  },
  methods: {
    async getProducts() {
      this.loading = true;
      const response = await api.get("/products");

      let products = response.data;

      if (this.url.category && this.url.category !== "-1") {
        products = products.filter(
          (product) => product.category_id === parseInt(this.url.category)
        );
      }

      if (this.url.search && this.url.search.trim() !== "") {
        products = products.filter(
          (product) =>
            product.description
              .toLowerCase()
              .includes(this.url.search.toLowerCase()) ||
            product.model
              .toLowerCase()
              .includes(this.url.search.toLowerCase()) ||
            product.brand
              .toLowerCase()
              .includes(this.url.search.toLowerCase()) ||
            product.size
              .toLowerCase()
              .includes(this.url.search.toLowerCase()) ||
            product.specs.toLowerCase().includes(this.url.search.toLowerCase())
        );
      }

      this.products = products;
      this.loading = false;
    },
    async getCategories() {
      this.loading = true;
      const response = await api.get("/categories");
      this.categories = response.data;
      this.loading = false;
    },
    getCategoryById(id) {
      const category = this.categories.find((category) => category.id === id);
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
  created() {
    this.loading = true;
    this.getProducts();
    this.getCategories();
    this.loading = false;
  },
  watch: {
    url() {
      this.getProducts();
    },
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
  text-align: center;
}
</style>
