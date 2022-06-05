<template>
  <form>
    <input
      name="search"
      id="search"
      v-model.trim="search"
      type="text"
      placeholder="Busque aqui seu produto"
    />
    <select
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

    <button class="btn" type="submit" @click.prevent="searchProducts">
      Buscar
    </button>
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "SearchBar",
  data() {
    return {
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
  created() {
    this.productStore.loadCategories();
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
}

form span {
  font-weight: bold;
}

#search {
  width: 90%;
}
</style>
