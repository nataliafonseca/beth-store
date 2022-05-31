<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }" class="logo">
        beth<span>store</span>
      </router-link>
      <router-link :to="{ name: 'login' }" class="btn">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  font-family: "Montserrat Alternates";
  font-size: 2rem;
  font-weight: bold;
}

.logo span {
  color: #dd7076;
}
</style>
