<template>
  <form class="user-form" @submit.prevent="submitForm">
    <!-- name -->
    <div>
      <label for="name">Nome</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="userStore.userForm.name"
      />
      <div v-if="v$.userStore.userForm.name.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.name.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- cpf -->
    <div>
      <label for="name">CPF</label>
      <input
        v-mask="'###.###.###-##'"
        type="text"
        id="cpf"
        name="cpf"
        v-model="userStore.userForm.cpf"
      />
      <div v-if="v$.userStore.userForm.cpf.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.cpf.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- email -->
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="userStore.userForm.email"
      />
      <div v-if="v$.userStore.userForm.email.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.email.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- password -->
    <div v-if="!($route.name === 'checkout')">
      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="userStore.userForm.password"
      />
      <div v-if="v$.userStore.userForm.password.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.password.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- password_confirmation -->
    <div v-if="!($route.name === 'checkout')">
      <label for="password">Confirme sua senha</label>
      <input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        v-model="userStore.userForm.passwordConfirmation"
      />
      <div v-if="v$.userStore.userForm.passwordConfirmation.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.passwordConfirmation.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- cep -->
    <div>
      <label for="cep">CEP</label>
      <input
        v-mask="'##.###-###'"
        type="text"
        id="cep"
        name="cep"
        v-model="userStore.userForm.cep"
        @blur="fillAddress"
      />
      <div v-if="v$.userStore.userForm.cep.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.cep.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- street -->
    <div>
      <label for="street">Logradouro</label>
      <input
        type="text"
        id="street"
        name="street"
        v-model="userStore.userForm.street"
        disabled
      />
    </div>

    <!-- number -->
    <div>
      <label for="number">Número</label>
      <input
        type="text"
        id="number"
        name="number"
        v-model="userStore.userForm.number"
      />
      <div v-if="v$.userStore.userForm.number.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.number.$errors"
          :key="error.$uid"
          class="error-msg"
        >
          {{ error.$message }}
        </li>
      </ul>
    </div>

    <!-- complement -->
    <div>
      <label for="complement">Complemento</label>
      <input
        type="text"
        id="complement"
        name="complement"
        v-model="userStore.userForm.complement"
      />
    </div>

    <!-- district -->
    <div>
      <label for="district">Bairro</label>
      <input
        type="text"
        id="district"
        name="district"
        v-model="userStore.userForm.district"
        disabled
      />
    </div>

    <!-- city -->
    <div>
      <label for="city">Cidade</label>
      <input
        type="text"
        id="city"
        name="city"
        v-model="userStore.userForm.city"
        disabled
      />
    </div>

    <!-- state -->
    <div>
      <label for="state">Estado</label>
      <input
        type="text"
        id="state"
        name="state"
        v-model="userStore.userForm.state"
        disabled
      />
    </div>

    <!-- phone -->
    <div>
      <label for="phone">Telefone</label>
      <input
        v-mask="['(##) ####-####', '(##) #####-####']"
        type="text"
        id="phone"
        name="phone"
        v-model="userStore.userForm.phone"
      />
      <div v-if="v$.userStore.userForm.phone.$errors.length" />
      <ul class="input-errors">
        <li
          v-for="error of v$.userStore.userForm.phone.$errors"
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
import { userStore } from "@/store/userStore";
import { getAddress } from "@/services/viaCep";
import useVuelidate from "@vuelidate/core";

import {
  required,
  email,
  maxLength,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";

export default {
  name: "UserForm",
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async fillAddress() {
      const cep = this.userStore.userForm.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        const address = await getAddress(cep);
        this.userStore.userForm.street = address.logradouro;
        this.userStore.userForm.district = address.bairro;
        this.userStore.userForm.city = address.localidade;
        this.userStore.userForm.state = address.uf;
      }
    },
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.$emit("submit-form");
    },
  },
  validations() {
    return {
      userStore: {
        userForm: {
          name: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          cpf: {
            required: helpers.withMessage("Campo obrigatório", required),
            maxLength: helpers.withMessage(
              "O CPF deve possuir 11 dígitos.",
              maxLength(14)
            ),
            minLength: helpers.withMessage(
              "O CPF deve possuir 11 dígitos.",
              minLength(14)
            ),
          },
          email: {
            required: helpers.withMessage("Campo obrigatório", required),
            email: helpers.withMessage("Informe um e-mail válido", email),
          },
          password: {
            required:
              this.$route.name === "register"
                ? helpers.withMessage("Campo obrigatório", required)
                : false,
          },
          passwordConfirmation: {
            required:
              this.$route.path === "register"
                ? helpers.withMessage("Campo obrigatório", required)
                : false,
            sameAsPassword: helpers.withMessage(
              "As senhas informadas não conferem",
              sameAs(this.userStore.userForm.password)
            ),
          },
          cep: {
            required: helpers.withMessage("Campo obrigatório", required),
            maxLength: helpers.withMessage(
              "O CEP deve possuir 8 dígitos.",
              maxLength(10)
            ),
            minLength: helpers.withMessage(
              "O CEP deve possuir 8 dígitos.",
              minLength(10)
            ),
          },
          number: {
            required: helpers.withMessage("Campo obrigatório", required),
          },
          phone: {
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

@media screen and (max-width: 500px) {
  form > div {
    grid-template-columns: 1fr;
  }

  input {
    margin: 3px 0;
  }
}
</style>
