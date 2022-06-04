<template>
  <section class="products-container">
    <transition mode="out-in">
      <loading-dots v-if="loading" key="loading" />
      <div
        v-else-if="pageProducts.length > 0"
        class="products"
        key="product-list"
      >
        <product-card
          v-for="product in pageProducts"
          :key="product.id"
          :product="product"
        />
        <products-pagination
          :productsTotal="piniaStore.products.length"
          :productsPerPage="productsPerPage"
        />
      </div>
      <div v-else key="no-results">
        <p class="no-results">Busca sem resultados.</p>
      </div>
    </transition>
  </section>
</template>

<script>
import LoadingDots from "./LoadingDots.vue";
import ProductCard from "./ProductCard.vue";
import { mapStores } from "pinia";
import { useStore } from "@/store/useStore";
import ProductsPagination from "./ProductsPagination.vue";

export default {
  components: { LoadingDots, ProductsPagination, ProductCard },
  name: "ProductList",
  data() {
    return {
      loading: null,
      productsPerPage: 3,
    };
  },
  computed: {
    ...mapStores(useStore),
    url() {
      return this.$route.query;
    },
    pageProducts() {
      if (!this.url._page)
        return this.piniaStore.products.slice(0, this.productsPerPage);
      return this.piniaStore.products.slice(
        (this.url._page - 1) * this.productsPerPage,
        (this.url._page - 1) * this.productsPerPage + this.productsPerPage
      );
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
  width: 1000px;
  max-width: 98vw;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.no-results {
  margin-top: 100px;
  text-align: center;
}
</style>
