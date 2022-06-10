<template>
  <form @submit.prevent="submitForm">
    <!-- category_id -->
    <div>
      <label for="category_id">Categoria</label>
      <select
        name="category_id"
        id="category_id"
        v-model="productStore.productForm.category_id"
        placeholder="Categoria"
      >
        <option value="" disabled selected></option>
        <option
          v-for="categoryValue in productStore.categories"
          :key="categoryValue.id"
          :value="categoryValue.id"
        >
          {{ categoryValue.description }}
        </option>
      </select>

      <div v-if="v$.productStore.productForm.category_id.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.category_id.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- description -->
    <div>
      <label for="description">Descrição</label>
      <input
        type="text"
        id="description"
        name="description"
        v-model="productStore.productForm.description"
      />
      <div v-if="v$.productStore.productForm.description.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.description.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- brand -->
    <div>
      <label for="brand">Marca</label>
      <input
        type="text"
        id="brand"
        name="brand"
        v-model="productStore.productForm.brand"
      />
      <div v-if="v$.productStore.productForm.brand.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.brand.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- model -->
    <div>
      <label for="model">Modelo</label>
      <input
        type="text"
        id="model"
        name="model"
        v-model="productStore.productForm.model"
      />
      <div v-if="v$.productStore.productForm.model.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.model.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- price -->
    <div>
      <label for="price">Preço</label>
      <input
        type="text"
        id="price"
        name="price"
        v-mask="[
          'R$ #,##',
          'R$ ##,##',
          'R$ ###,##',
          'R$ ####,##',
          'R$ #####,##',
          'R$ ######,##',
        ]"
        v-model="productStore.productForm.price"
      />
      <div v-if="v$.productStore.productForm.price.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.price.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- quantity -->
    <div>
      <label for="quantity">Quantidade</label>
      <input
        type="text"
        id="quantity"
        name="quantity"
        v-model="productStore.productForm.quantity"
      />
      <div v-if="v$.productStore.productForm.quantity.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.quantity.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- size -->
    <div>
      <label for="size">Tamanho</label>
      <input
        type="text"
        id="size"
        name="size"
        v-model="productStore.productForm.size"
      />
      <div v-if="v$.productStore.productForm.size.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.productStore.productForm.size.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- specs -->
    <div>
      <label for="specs">Especificações Técnicas</label>
      <textarea
        type="text"
        id="specs"
        name="specs"
        rows="5"
        v-model="productStore.productForm.specs"
      />
    </div>

    <!-- picture -->
    <div v-if="isUpdate">
      <label for="picture">Imagem</label>
      <input
        type="file"
        id="picture"
        name="picture"
        @change="onFileChange"
        accept="image/png, image/jpeg"
      />
    </div>

    <slot />
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { productStore } from "@/store/productStore";
import useVuelidate from "@vuelidate/core";

import { required, numeric, helpers } from "@vuelidate/validators";

export default {
  name: "ProductForm",
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapStores(productStore),
    isUpdate() {
      return this.$route.name === "product-update";
    },
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.$emit("submit-form");
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.productStore.productForm.picture = files;
    },
  },
  validations() {
    return {
      productStore: {
        productForm: {
          category_id: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          description: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          brand: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          model: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          price: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          quantity: {
            required: helpers.withMessage("Campo obrigatório", required),
            numeric: helpers.withMessage("Apenas números", numeric),
          },
          size: {
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
