<template>
  <div class="products-pagination">
    <div>
      <strong>{{ (currentPage - 1) * productsPerPage + 1 }}</strong> -
      <strong>
        {{
          currentPage === lastPage
            ? productsTotal
            : (currentPage - 1) * productsPerPage + productsPerPage
        }}
      </strong>
      de <strong>{{ productsTotal }}</strong>
    </div>

    <div class="page-buttons">
      <template v-if="currentPage > 1 + offset">
        <router-link :to="{ query: query(1) }">{{ 1 }}</router-link>
        <span v-if="currentPage > 2 + offset">...</span>
      </template>

      <template v-if="previousPages.length > 0">
        <router-link
          v-for="page in previousPages"
          :key="page"
          :to="{ query: query(page) }"
          >{{ page }}</router-link
        >
      </template>
      <router-link
        class="currentPage"
        :to="{ query: query(this.currentPage) }"
        >{{ this.currentPage }}</router-link
      >
      <template v-if="nextPages.length > 0">
        <router-link
          v-for="page in nextPages"
          :key="page"
          :to="{ query: query(page) }"
          >{{ page }}</router-link
        >
      </template>

      <template v-if="currentPage < this.lastPage - offset">
        <span v-if="currentPage < this.lastPage - offset - 1">...</span>
        <router-link :to="{ query: query(lastPage) }">{{
          lastPage
        }}</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsPagination",
  props: {
    productsTotal: {
      type: Number,
      default: 1,
    },
    productsPerPage: {
      type: Number,
      default: 9,
    },
  },
  data() {
    return {
      offset: 2,
    };
  },
  methods: {
    query(page) {
      return {
        ...this.$route.query,
        _page: page,
      };
    },
    generatePagesArray(from, to) {
      const pagesArray = [];
      for (let i = from; i <= to; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
  },
  computed: {
    lastPage() {
      const total = this.productsTotal / this.productsPerPage;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
    currentPage() {
      return Number(this.$route.query._page) || 1;
    },
    previousPages() {
      return this.currentPage > 1
        ? this.generatePagesArray(
            this.currentPage - this.offset,
            this.currentPage - 1
          ).filter((page) => page > 0)
        : [];
    },
    nextPages() {
      return this.currentPage < this.lastPage
        ? this.generatePagesArray(
            this.currentPage + 1,
            this.currentPage + this.offset
          ).filter((page) => page <= this.lastPage)
        : [];
    },
  },
};
</script>

<style scoped>
.products-pagination {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-buttons {
  display: flex;
  align-items: center;
}
.page-buttons span {
  color: #61718d;
}
.page-buttons a {
  padding: 2px 8px;
  border-radius: 4px;
  margin: 4px;
  background: #e5e5e5;
}

.page-buttons a.currentPage,
.page-buttons a:hover {
  background: #dd7076;
  color: #fff;
}
</style>
