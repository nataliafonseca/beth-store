<template>
  <section class="products-container">
    <transition mode="out-in">
      <loading-dots v-if="loading" key="loading" />
      <div
        class="products"
        v-else-if="pageProducts.length > 0"
        key="product-list"
      >
        <product-card
          v-for="product in pageProducts"
          :key="product.id"
          :product="product"
        />
        <products-pagination
          :productsTotal="productStore.products.length"
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
import { productStore } from "@/store/productStore";
import ProductsPagination from "./ProductsPagination.vue";

export default {
  components: { LoadingDots, ProductsPagination, ProductCard },
  name: "ProductList",
  data() {
    return {
      loading: null,
      productsPerPage: 6,
    };
  },
  computed: {
    ...mapStores(productStore),
    url() {
      return this.$route.query;
    },
    pageProducts() {
      if (!this.url._page)
        return this.productStore.visibleProducts.slice(0, this.productsPerPage);
      return this.productStore.visibleProducts.slice(
        (this.url._page - 1) * this.productsPerPage,
        (this.url._page - 1) * this.productsPerPage + this.productsPerPage
      );
    },
  },

  watch: {
    async url() {
      this.loading = true;

      this.productStore.filterProducts(
        this.url.category ?? "-1",
        this.url.search ?? ""
      );
      setTimeout(() => {
        this.loading = false;
      }, 10);
    },
  },
  created() {
    this.loading = true;
    this.productStore.filterProducts(
      this.url.category ?? "-1",
      this.url.search ?? ""
    );
    this.loading = false;
  },
};
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  width: auto;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin: 30px;
}

.no-results {
  margin-top: 100px;
  text-align: center;
}
</style>
