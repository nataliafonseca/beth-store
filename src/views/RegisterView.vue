<template>
  <section>
    <h1>Registro</h1>
    <user-form @submit-form="registerUser">
      <button class="btn" type="submit">CRIAR CONTA</button>
      <p class="login-link">
        Já possui uma conta?
        <router-link class="link" :to="{ name: 'login' }">Entre</router-link>
      </p>
    </user-form>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";
import UserForm from "@/components/UserForm.vue";

export default {
  name: "RegisterView",
  components: { UserForm },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async registerUser() {
      await this.userStore.register();
    },
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

h1 {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 40px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

button {
  margin-top: 20px;
}
</style>
