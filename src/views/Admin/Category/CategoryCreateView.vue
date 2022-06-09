<template>
  <section>
    <h2>Cadastro de Categoria</h2>
    <category-form @submit-form="createCategory">
      <button class="btn" type="submit">CADASTRAR CATEGORIA</button>
    </category-form>
  </section>
</template>

<script>
import CategoryForm from "@/components/CategoryForm.vue";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "CategoryCreateView",
  components: { CategoryForm },
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    async createCategory() {
      await this.productStore.createCategory();
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: var(--primary);
  margin-bottom: 40px;
}

button {
  margin: 20px 0 40px;
}
</style>
