import { defineStore } from "pinia";
import { api } from "@/services/api";
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import { toastError, toastSuccess } from "../utils/toast";

export const orderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  getters: mapStores(productStore, userStore),
  actions: {
    async loadOrders() {
      const response = await api.get("pedidos", {
        headers: {
          Authorization: this.userStore.authToken,
        },
      });
      this.orders = response.data.map((order) => {
        const items = order.itens.map((item) => ({
          product: {
            id: item.produto.id,
            category_id: item.categoria.id,
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
          status: order.estado,
          total_price: order.total,
          date: order.instante,
          user: {
            email: order.usuario.email,
            name: order.usuario.nome,
            phone: order.usuario.telefone[0],
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

        // const { id } = response.data;
        console.log(response.data);

        this.productStore.clearCart();
        await this.loadOrders();

        toastSuccess("Pedido efetuado!");
        this.router.push({ name: "orders" });
      } catch (err) {
        toastError(err.response.data.message);
      }
    },
  },
});
