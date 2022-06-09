<template>
  <section>
    <h2>Editar Produto</h2>
    <product-form @submit-form="updateProduct">
      <button class="btn" type="submit">ATUALIZAR PRODUTO</button>
    </product-form>
  </section>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "ProductUpdateView",
  components: { ProductForm },
  props: ["id"],
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    async updateProduct() {
      await this.productStore.updateProduct(this.id);
    },
  },
  created() {
    this.productStore.fillProductForm(this.id);
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: var(--primary);
  margin: 20px 0;
}

button {
  margin: 20px 0 40px;
}
</style>
