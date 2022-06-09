<template>
  <section>
    <h2>Editar Categoria</h2>
    <category-form @submit-form="updateCategory">
      <button class="btn" type="submit">ATUALIZAR CATEGORIA</button>
    </category-form>
  </section>
</template>

<script>
import CategoryForm from "@/components/CategoryForm.vue";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "CategoryUpdateView",
  components: { CategoryForm },
  props: ["id"],
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    async updateCategory() {
      await this.productStore.updateCategory(this.id);
    },
  },
  created() {
    this.productStore.fillCategoryForm(this.id);
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
