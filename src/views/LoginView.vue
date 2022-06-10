<template>
  <section>
    <h1>Login</h1>
    <form @submit.prevent="logUser">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="user.email" />
        <ul class="input-errors">
          <li
            v-for="error of v$.user.email.$errors"
            :key="error.$uid"
            class="error-msg"
          >
            {{ error.$message }}
          </li>
        </ul>
      </div>
      <div>
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="user.password"
        />
        <ul class="input-errors">
          <li
            v-for="error of v$.user.password.$errors"
            :key="error.$uid"
            class="error-msg"
          >
            {{ error.$message }}
          </li>
        </ul>
      </div>
      <button class="btn" type="submit">ENTRAR</button>
      <p class="register-link">
        Ainda não possui uma conta?
        <router-link class="link" :to="{ name: 'register' }"
          >Registre-se</router-link
        >
      </p>
    </form>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "LoginView",
  data: function () {
    return {
      v$: useVuelidate(),
      user: { email: "", password: "" },
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async logUser() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      await this.userStore.login(this.user);
    },
  },

  validations() {
    return {
      user: {
        email: {
          required: helpers.withMessage("Campo obrigatório", required),
          email: helpers.withMessage("Informe um e-mail válido", email),
        },
        password: {
          required: helpers.withMessage("Campo obrigatório", required),
        },
      },
    };
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

form {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

h1 {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 40px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

form > div {
  display: grid;
  gap: 5px;
}

input {
  width: 100%;
}

button {
  margin-top: 20px;
}
</style>
