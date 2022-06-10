<template>
  <form @submit.prevent="searchProducts">
    <input
      name="search"
      id="search"
      v-model.trim="search"
      type="text"
      placeholder="Busque aqui seu produto"
    />
    <select
      v-if="!loading"
      name="category"
      id="category"
      v-model="category"
      placeholder="Categoria"
    >
      <option value="-1" selected>Todas as categorias</option>
      <option
        v-for="categoryValue in productStore.categories"
        :key="categoryValue.id"
        :value="categoryValue.id"
      >
        {{ categoryValue.description }}
      </option>
    </select>
    <select
      v-else
      name="category"
      id="category"
      v-model="category"
      placeholder="Categoria"
      disabled
    >
      <option value="-1" selected>Todas as categorias</option>
    </select>

    <button class="btn" type="submit">BUSCAR</button>
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "SearchBar",
  data() {
    return {
      loading: false,
      category: this.$route.query.category ?? "-1",
      search: this.$route.query.search ?? "",
    };
  },
  computed: {
    ...mapStores(productStore),
    url() {
      return this.$route.query;
    },
  },
  methods: {
    searchProducts() {
      this.$router.push({
        query: { search: this.search, category: this.category },
      });
    },
  },
  watch: {
    url() {
      this.category = this.url.category ?? "-1";
      this.search = this.url.search ?? "";
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: 1fr auto auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
}

@media screen and (max-width: 700px) {
  form {
    grid-template-columns: 1fr;
  }
}
</style>
