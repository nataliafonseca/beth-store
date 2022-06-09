<template>
  <section>
    <h2>Cadastro de Produto</h2>
    <product-form @submit-form="createProduct">
      <button class="btn" type="submit">CADASTRAR PRODUTO</button>
    </product-form>
  </section>
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
h2 {
  text-align: center;
  color: var(--primary);
  margin-bottom: 40px;
}

button {
  margin: 20px 0 40px;
}
</style>
