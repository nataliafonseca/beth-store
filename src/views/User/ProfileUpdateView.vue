<template>
  <section class="profile-update-view">
    <user-form @submit-form="updateUser">
      <button class="btn" type="submit">SALVAR</button>
    </user-form>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";
import UserForm from "@/components/UserForm.vue";

export default {
  components: { UserForm },
  name: "ProfileUpdateView",
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    async updateUser() {
      await this.userStore.update(this.userStore.user.id);
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px 0 40px;
}
</style>
