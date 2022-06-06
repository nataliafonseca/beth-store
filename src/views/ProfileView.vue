<template>
  <div class="">
    {{ userStore.user }}
    <button class="btn" @click.prevent="userStore.logout">SAIR</button>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";

export default {
  name: "ProfileView",
  computed: {
    ...mapStores(userStore),
  },
};
</script>
