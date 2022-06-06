<template>
  <form class="user-form" @submit.prevent="submitForm">
    <div>
      <label for="name">Nome</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="userStore.userForm.name"
        required
      />
    </div>
    <div>
      <label for="name">CPF</label>
      <input
        type="text"
        id="cpf"
        name="cpf"
        v-model="userStore.userForm.cpf"
        required
      />
    </div>
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="userStore.userForm.email"
        required
      />
    </div>
    <div>
      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="userStore.userForm.password"
        required
      />
    </div>
    <div>
      <label for="cep">CEP</label>
      <input
        type="text"
        id="cep"
        name="cep"
        v-model="userStore.userForm.cep"
        @blur="fillAddress"
        required
      />
    </div>
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
    <div>
      <label for="number">Número</label>
      <input
        type="text"
        id="number"
        name="number"
        v-model="userStore.userForm.number"
        required
      />
    </div>
    <div>
      <label for="complement">Complemento</label>
      <input
        type="text"
        id="complement"
        name="complement"
        v-model="userStore.userForm.complement"
      />
    </div>
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
    <div>
      <label for="phone">Telefone</label>
      <input
        type="text"
        id="phone"
        name="phone"
        v-model="userStore.userForm.phone"
        required
      />
    </div>
    <slot />
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";
import { getAddress } from "@/services/viaCep";

export default {
  name: "UserForm",
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
    submitForm() {
      this.$emit("submit-form");
    },
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

  grid-template-columns: 100px 1fr;
  gap: 20px;
  align-items: center;
}

input {
  width: 100%;
}
</style>
