<template>
  <div class="tittle">这里是vue组件</div>
</template>

<script setup>
const res = 123;
console.log(123);

setInterval(() => {
  console.log('老了');
}, 1000);
</script>

<style scoped>
.tittle {
  font-size: 2rem;
}
</style>
