<template>
  <footer>
    <p>{{ year }} © Copyright - <span class="color">beth</span>store</p>
  </footer>
</template>

<script>
export default {
  name: "PageFooter",
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
footer {
  background: var(--primary);
  color: var(--background-secondary);
  display: flex;
  justify-content: center;
  padding: 30px;
}

p {
  display: inline-block;
  font-family: "Montserrat Alternates";
}

.color {
  color: var(--text);
}
</style>
