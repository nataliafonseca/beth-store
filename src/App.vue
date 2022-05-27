<template>
  <div id="app">
    <page-header />
    <main id="main">
      <router-view />
    </main>
    <page-footer />
  </div>
</template>

<script>
import PageFooter from "./components/PageFooter.vue";
import PageHeader from "./components/PageHeader.vue";

export default {
  components: { PageHeader, PageFooter },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif;
  color: #334455;
  background: #f5f5f5;
}

ul {
  list-style: none;
}

a,
button {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main {
  flex: 1;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid #ffffff;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3;
  font-size: 1rem;
  font-family: inherit;
  margin-bottom: 15px;
}

input:focus,
input:hover,
textarea:focus,
textarea:hover {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #8877ff;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #8877ff;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  text-align: center;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background: #6655dd;
  transform: scale(1.1);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
