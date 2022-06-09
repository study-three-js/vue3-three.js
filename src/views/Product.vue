<template>
  <h1>这是产品页</h1>
  <h1>产品的id：{{ route.params.id }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
console.log(route, '====route');
</script>
<style lang='less' scoped>
</style>