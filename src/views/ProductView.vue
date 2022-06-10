<template>
  <loading-dots v-if="loading" />
  <section v-else>
    <div class="grid">
      <div class="image">
        <img :src="product.picture" alt="" />
      </div>
      <div class="info">
        <div class="pid-and-buttons">
          <p class="pid">PID: {{ product.id }}</p>
          <div v-if="userStore.isAdmin">
            <button @click="onEdit" class="btn icon-button" aria-label="editar">
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
              @click.prevent="onRemove"
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
        </div>
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
        <p class="price">{{ toPriceString(product.price) }}</p>
        <add-to-cart-button class="add-button" :product="product" />
        <h2>Detalhes</h2>
        <p><span>Marca:</span> {{ product.brand }}</p>
        <p><span>Modelo:</span> {{ product.model }}</p>
        <p><span>Tamanho:</span> {{ product.size }}</p>
      </div>
      <div class="specs" v-if="product.specs">
        <h2>Especificações Técnicas</h2>
        <p>{{ product.specs }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import AddToCartButton from "../components/AddToCartButton.vue";
import LoadingDots from "../components/LoadingDots.vue";
import { toPriceString } from "@/utils/textMasks";

export default {
  components: { AddToCartButton, LoadingDots },
  name: "productView",
  props: ["id"],
  data: function () {
    return { loading: false, product: null, category: null };
  },
  computed: {
    ...mapStores(productStore, userStore),
    cartItem() {
      return this.productStore.getCartItemById(this.product.id);
    },
  },
  methods: {
    onEdit() {
      this.$router.push({
        name: "product-update",
        params: { id: this.product.id },
      });
    },
    async onRemove() {
      await this.productStore.deleteProduct(this.product.id);
    },
    toPriceString,
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
  max-width: 85vw;
  margin: 0 auto;
}

.grid {
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0 50px;
}

.specs {
  grid-column: -1 / 1;
}

h1 {
  font-size: 2rem;
}

.image {
  min-width: 500px;
  display: flex;
  justify-content: center;
  background: var(--background-secondary);
  border-radius: 4px;
}

.image img {
  height: 360px;
  width: auto;
  max-width: 500px;
  object-fit: scale-down;
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

.pid-and-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pid-and-buttons div {
  display: flex;
  gap: 10px;
}

.pid {
  display: inline-block;
  color: var(--text-lighter);
}

.icon-button {
  padding: 5px 5px;
  margin-bottom: 10px;
}

.icon-button svg {
  width: 1.2rem;
}

@media screen and (max-width: 1000px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .image {
    margin-bottom: 20px;
    min-width: initial;
  }

  .image img {
    height: initial;
    width: initial;
    max-height: 300px;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    margin: 0 auto;
  }

  .info {
    max-width: initial;
  }
}
</style>
