<template>
  <section>
    <header>
      <h2>Lista de Produtos</h2>
      <router-link :to="{ name: 'product-create' }" class="btn">
        ADICIONAR
      </router-link>
    </header>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>DESCRIÇÃO</th>
          <th>MARCA</th>
          <th>MODELO</th>
          <th>PREÇO</th>
          <th>CATEGORIA</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productStore.products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.model }}</td>
          <td>{{ toPriceString(product.price) }}</td>
          <td>
            {{ productStore.getCategoryById(product.category_id).description }}
          </td>
          <td class="actions">
            <button
              @click.prevent="onView(product.id)"
              class="btn icon-button"
              aria-label="visualizar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                />
              </svg>
            </button>
            <button
              @click.prevent="onEdit(product.id)"
              class="btn icon-button"
              aria-label="editar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              @click.prevent="onRemove(product.id)"
              class="btn icon-button"
              aria-label="remover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { toPriceString } from "@/utils/textMasks";

export default {
  name: "ProductTableView",
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    onView(id) {
      this.$router.push({ name: "product", params: { id } });
    },
    onEdit(id) {
      this.$router.push({ name: "product-update", params: { id } });
    },
    async onRemove(id) {
      if (
        window.confirm(
          "Tem certeza que deseja remover o produto? Essa ação é irreversível!"
        )
      )
        await this.productStore.deleteProduct(id);
    },
    toPriceString,
  },
};
</script>

<style scoped>
header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

table {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 4px;
  border-collapse: collapse;
}

th {
  padding: 10px 10px;
  text-align: left;
}

td {
  padding: 15px 10px;
}

tbody tr {
  border-radius: 4px;
  margin-top: 10px;
  border-top: 1px solid var(--border);
}

.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}

.icon-button {
  padding: 5px 5px;
}

.icon-button svg {
  width: 1.2rem;
}
</style>
