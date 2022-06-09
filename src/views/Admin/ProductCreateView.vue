<template>
  <product-form @submit-form="createProduct">
    <button class="btn" type="submit">CADASTRAR PRODUTO</button>
  </product-form>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";

export default {
  name: "ProductCreateView",
  components: { ProductForm },
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    async createProduct() {
      await this.productStore.createProduct();
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px 40px;
}
</style>
