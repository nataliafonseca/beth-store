<template>
  <div class="loading-dots">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "LoadingDots",
};
</script>

<style scoped>
.loading-dots {
  text-align: center;
  margin-top: 80px;
}

.loading-dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  margin: 4px;
  animation: dots 0.6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0.1s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

.loading-dots span:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes dots {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
</style>
