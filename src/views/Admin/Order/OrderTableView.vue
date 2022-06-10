<template>
  <section>
    <header>
      <h2>Lista de Pedidos</h2>
    </header>
    <div class="main-wrapper">
      <div class="responsive-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DESTINO</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orderStore.orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>
                <p>{{ order.user.name }}</p>
                <p>{{ order.user.street }}, {{ order.user.number }}</p>
                <p>
                  {{ order.user.district }}, {{ order.user.city }},
                  {{ order.user.state }}
                </p>
                <p>{{ order.user.cep }}</p>
              </td>
              <td>
                {{ toPriceString(order.total_price) }}
              </td>
              <td>
                <p class="status" :class="status(order.status)">
                  {{ order.status }}
                </p>
              </td>
              <td>
                <div class="actions">
                  <router-link
                    :to="{ name: 'order-details', params: { id: order.id } }"
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
                  </router-link>
                  <button
                    @click.prevent="onApprove(order.id)"
                    class="btn icon-button"
                    aria-label="aprovar"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    @click.prevent="onCancel(order.id)"
                    class="btn icon-button"
                    aria-label="cancelar"
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
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
import { orderStore } from "@/store/orderStore";
import { toPriceString } from "@/utils/textMasks";

export default {
  name: "CategoryTableView",
  computed: {
    ...mapStores(orderStore),
  },
  methods: {
    status(status) {
      if (status === "QUITADO") {
        return "complete";
      } else if (status === "CANCELADO") {
        return "canceled";
      }
      return "pending";
    },
    async onApprove(id) {
      this.orderStore.approveOrder(id);
    },
    async onCancel(id) {
      this.orderStore.rejectOrder(id);
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

.status {
  display: inline-block;
  width: max-content;
  margin-left: auto;
  padding: 2px 4px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.8rem;
}

.pending {
  background: #cea046;
}

.complete {
  background: #579f6e;
}

.canceled {
  background: #d34c46;
}
</style>
