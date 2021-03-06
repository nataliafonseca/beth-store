import { defineStore } from "pinia";
import { api } from "@/services/api";
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";
import { toastError, toastSuccess } from "../utils/toast";

export const clientStore = defineStore("client", {
  state: () => ({
    clients: [],
  }),

  getters: mapStores(userStore),

  actions: {
    async loadClients() {
      if (this.userStore.isAdmin) {
        try {
          const response = await api.get("usuarios", {
            headers: {
              Authorization: this.userStore.authToken,
            },
          });

          this.clients = response.data.map((client) => ({
            id: client.id,
            email: client.email,
            name: client.nome,
            phone: client.telefones[0],
            cpf: client.cpfOuCnpj,
            cep: client.cep,
            district: client.bairro,
            city: client.cidade,
            state: client.estado,
            street: client.logradouro,
            number: client.numero,
            complement: client.complemento,
          }));
        } catch (err) {
          this.userStore.logout();
        }
      }
    },

    async removeCliente(id) {
      try {
        if (
          window.confirm(
            "Tem certeza que deseja remover esse usuário? Essa ação é irreversível!"
          )
        ) {
          await api.delete(`usuarios/delete/${id}`);
          toastSuccess("Cliente removido com sucesso!");
        }
      } catch (err) {
        toastError(err);
      }
    },
  },
});
