<template>
  <section>
    <search-bar />
    <product-list />
  </section>
</template>

<script>
import ProductList from "../components/ProductList.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "HomeView",
  components: { SearchBar, ProductList },
};
</script>

<style scoped>
section {
  padding-top: 40px;
  padding-bottom: 40px;
  width: 1000px;
  max-width: 95vw;
  margin: 0 auto;
}
</style>
