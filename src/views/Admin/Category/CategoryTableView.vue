<template>
  <section>
    <header>
      <h2>Lista de Categorias</h2>
      <router-link :to="{ name: 'category-create' }" class="btn">
        ADICIONAR
      </router-link>
    </header>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>DESCRIÇÃO</th>
          <th>SETOR</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in productStore.categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.description }}</td>
          <td>
            {{ category.sector }}
          </td>
          <td class="actions">
            <button
              @click.prevent="onEdit(category.id)"
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
              @click.prevent="onRemove(category.id)"
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

export default {
  name: "CategoryTableView",
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    onEdit(id) {
      this.$router.push({ name: "category-update", params: { id } });
    },
    async onRemove(id) {
      await this.productStore.deleteCategory(id);
    },
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
