<template>
  <product-form @submit-form="updateProduct">
    <button class="btn" type="submit">ATUALIZAR PRODUTO</button>
  </product-form>
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
button {
  margin: 20px 40px;
}
</style>
