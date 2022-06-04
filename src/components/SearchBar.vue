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
        v-for="categoryValue in categories"
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
import { api } from "../services/api";

export default {
  name: "SearchBar",
  data() {
    return {
      categories: null,
      category: this.$route.query.category ?? "-1",
      search: this.$route.query.search ?? "",
    };
  },
  computed: {
    url() {
      return this.$route.query;
    },
  },
  methods: {
    async getCategories() {
      const response = await api.get("/categories");
      this.categories = response.data;
    },
    searchProducts() {
      this.$router.push({
        query: { search: this.search, category: this.category },
      });
    },
  },
  created() {
    this.getCategories();
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
}

form span {
  font-weight: bold;
}

#search {
  width: 90%;
}
</style>
