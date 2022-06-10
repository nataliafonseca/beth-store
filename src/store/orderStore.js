import { api } from "@/services/api";
import { userStore } from "@/store/userStore";
import { defineStore, mapStores } from "pinia";
import { toastError, toastSuccess } from "../utils/toast";
import { productStore } from "./productStore";

export const orderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  getters: mapStores(userStore, productStore),
  actions: {
    async loadOrders() {
      let response;
      if (this.userStore.isAuthenticated) {
        response = await api.get("pedidos", {
          headers: {
            Authorization: this.userStore.authToken,
          },
        });
      }

      this.orders = response.data.map((order) => {
        const items = order.itens.map((item) => ({
          product: {
            id: item.produto.id,
            category_id: item.produto.categoria.id,
            description: item.produto.nome,
            brand: item.produto.marca,
            model: item.produto.modelo,
            price: item.produto.preco,
            quantity: item.produto.estoque.quantidade,
            size: item.produto.estoque.tamanho,
            specs: item.produto.informacoesTecnicas,
            picture: item.produto.imageUrl,
          },
          quantity: item.quantidade,
        }));

        const newOrder = {
          id: order.id,
          items,
          status: order.pagamento.estado,
          total_price: order.valorTotal,
          date: order.instante,
          user: {
            email: order.usuario.email,
            name: order.usuario.nome,
            phone: order.usuario.telefones[0],
            cpf: order.usuario.cpf,
            cep: order.usuario.cep,
            district: order.usuario.bairro,
            city: order.usuario.cidade,
            state: order.usuario.estado,
            street: order.usuario.logradouro,
            number: order.usuario.numero,
            complement: order.usuario.complemento,
            roles: order.usuario.perfis,
            id: order.usuario.id,
          },
        };

        return newOrder;
      });

      if (!this.userStore.isAdmin) {
        this.orders = [...this.orders].filter(
          (o) => o.user.id === this.userStore.user.id
        );
      }
    },

    getOrderById(id) {
      return this.orders.find((order) => order.id === id);
    },

    async createOrder() {
      const cartItems = this.productStore.cart.map((item) => ({
        quantidade: item.count,
        produto: {
          id: item.product_id,
        },
      }));

      const newOrder = {
        pagamento: {
          numeroDeParcelas: 1,
          "@type": "pagamentoComCartao",
        },
        itens: cartItems,
      };

      try {
        const response = await api.post("pedidos", newOrder, {
          headers: {
            Authorization: this.userStore.authToken,
          },
        });

        const { id } = response.data;

        this.productStore.clearCart();
        await this.loadOrders();

        toastSuccess("Pedido efetuado!");
        this.router.push({ name: "order-details", params: { id } });
      } catch (err) {
        toastError(err.response.data.message);
      }
    },

    async approveOrder(id) {
      try {
        await api.post("pedidos/status", {
          estado: 2,
          idPedido: id,
        });

        toastSuccess("Pedido aprovado com sucesso.");
        await this.loadOrders();
        this.router.push({ name: "order-table" });
      } catch (err) {
        toastError(err);
      }
    },

    async rejectOrder(id) {
      try {
        await api.post("pedidos/status", {
          estado: 3,
          idPedido: id,
        });

        toastSuccess("Pedido cancelado com sucesso.");
        await this.loadOrders();
        this.router.push({ name: "order-table" });
      } catch (err) {
        toastError(err);
      }
    },
  },
});
