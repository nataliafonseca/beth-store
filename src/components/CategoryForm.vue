<template>
  <form @submit.prevent="submitForm">
    <!-- description -->
    <div>
      <label for="description">Descrição</label>
      <input
        type="text"
        id="description"
        name="description"
        v-model="productStore.categoryForm.description"
      />
      <div v-if="v$.productStore.categoryForm.description.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.categoryForm.description.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- sector -->
    <div>
      <label for="sector">Setor</label>
      <input
        type="text"
        id="sector"
        name="sector"
        v-model="productStore.categoryForm.sector"
      />
      <div v-if="v$.productStore.categoryForm.sector.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.categoryForm.sector.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <slot />
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import useVuelidate from "@vuelidate/core";

import { required, helpers } from "@vuelidate/validators";

export default {
  name: "CategoryForm",
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapStores(productStore),
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.$emit("submit-form");
    },
  },
  validations() {
    return {
      productStore: {
        categoryForm: {
          description: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          sector: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
        },
      },
    };
  },
};
</script>

<style scoped>
form {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
}

form > div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 0 10px;
  align-items: center;
}

input {
  width: 100%;
}

.input-errors {
  color: #bd2c36;
  margin-top: 3px;
}

@media screen and (max-width: 500px) {
  form > div {
    grid-template-columns: 1fr;
  }

  input {
    margin: 3px 0;
  }
}
</style>
