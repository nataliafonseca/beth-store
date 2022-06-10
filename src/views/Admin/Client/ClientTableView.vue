<template>
  <section>
    <header>
      <h2>Lista de Clientes</h2>
    </header>
    <div class="main-wrapper">
      <div class="responsive-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CPF</th>
              <th>EMAIL</th>
              <th>ENDEREÇO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clientStore.clients" :key="client.id">
              <td>{{ client.id }}</td>
              <td>{{ client.name }}</td>
              <td>{{ client.cpf }}</td>
              <td>{{ client.email }}</td>
              <td>
                <p>{{ client.street }}, {{ client.number }}</p>
                <p>
                  {{ client.district }}, {{ client.city }},
                  {{ client.state }}
                </p>
                <p>{{ client.cep }}</p>
              </td>
              <td>
                <div class="actions">
                  <button
                    @click.prevent="onRemove(client.id)"
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { clientStore } from "@/store/clientStore";
import { toPriceString } from "@/utils/textMasks";

export default {
  name: "ClientTableView",
  computed: {
    ...mapStores(clientStore),
  },
  methods: {
    onEdit(id) {
      this.$router.push({ name: "client-update", params: { id } });
    },
    async onRemove(id) {
      await this.clientStore.deleteProduct(id);
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
  align-items: center;
}

.main-wrapper {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  margin-bottom: 40px;
  box-sizing: border-box;
}

.responsive-table {
  display: inline-block;
  min-width: 100%;
  box-sizing: border-box;
}

.responsive-table > table {
  width: 100%;
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
tr {
  vertical-align: middle;
}

.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}

.icon-button {
  padding: 5px 5px;
  display: flex;
}

.icon-button svg {
  width: 1.2rem;
}
</style>
