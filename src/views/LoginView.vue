<template>
  <section>
    <form>
      <h1>Login</h1>
      <div>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="user.email"
          required
        />
      </div>
      <div>
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="user.password"
          required
        />
      </div>
      <button class="btn" type="submit" @click.prevent="doLogin">ENTRAR</button>
    </form>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";

export default {
  name: "LoginView",
  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async doLogin() {
      await this.userStore.login(this.user);
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

form {
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

form h1 {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
}

form > div {
  display: grid;
  gap: 2px;
}

input {
  width: 100%;
}

button {
  margin-top: 20px;
}
</style>
