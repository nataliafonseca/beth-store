<template>
  <loading-dots v-if="loading" />
  <section v-else>
    <div class="grid">
      <div class="imagem">
        <img :src="product.picture" alt="" />
      </div>
      <div class="info">
        <p class="pid">PID: {{ product.id }}</p>
        <h1>{{ product.description }}</h1>
        <p>
          Veja mais em
          <router-link
            :to="{
              name: 'home',
              query: { search: '', category: this.category.id },
            }"
            class="link"
          >
            {{ category.description }}
          </router-link>
        </p>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <add-to-cart-button class="add-button" :product="product" />
        <h2>Detalhes</h2>
        <p><span>Marca:</span> {{ product.brand }}</p>
        <p><span>Modelo:</span> {{ product.model }}</p>
        <p><span>Tamanho:</span> {{ product.size }}</p>
      </div>
      <div class="specs">
        <h2>Especificações Técnicas</h2>
        <p>{{ product.specs }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import AddToCartButton from "../components/AddToCartButton.vue";
import LoadingDots from "../components/LoadingDots.vue";

export default {
  components: { AddToCartButton, LoadingDots },
  name: "productView",
  props: ["id"],
  data: function () {
    return { loading: false, product: null, category: null };
  },
  computed: {
    ...mapStores(productStore),
    cartItem() {
      return this.productStore.getCartItemById(this.product.id);
    },
  },
  methods: {
    formatPrice(value) {
      value = Number(value);
      if (!isNaN(value)) {
        return Number(value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        return "";
      }
    },
  },
  async created() {
    this.loading = true;
    this.product = await this.productStore.getProductById(this.id);
    this.category = await this.productStore.getCategoryById(
      this.product.category_id
    );
    this.loading = false;
  },
};
</script>

<style scoped>
section {
  padding-top: 40px;
  padding-bottom: 40px;
  width: 1000px;
  max-width: 95vw;
  margin: 0 auto;
}

.grid {
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 0 50px;
}

.specs {
  grid-column: -1 / 1;
}

h1 {
  font-size: 2.5rem;
}

.imagem img {
  height: 360px;
  width: 500px;
  object-fit: cover;
  object-position: center;
}

.price {
  margin-top: 30px;
  font-size: 2rem;
  display: flex;
  font-weight: bold;
  color: var(--accent);
}

.info {
  max-width: 450px;
}

.add-button {
  width: 100%;
  margin-top: 30px;
}

.specs h2,
.info h2 {
  margin-top: 25px;
  margin-bottom: 5px;
}

.info > p > span {
  font-weight: bold;
}

.pid {
  display: inline-block;
  color: var(--text-lighter);
}
</style>
