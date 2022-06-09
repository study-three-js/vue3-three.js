<template>
  <h1>购物车</h1>
  <h1>商品数量</h1>
  <h1>商品总结</h1>

  <button @click="addProduct">添加商品数量 + 2</button>
  <button @click="asyncAddProduct">异步添加商品数量 + 10</button>
</template>

<script setup>
function addProduct() {
  alert('添加商品数量 + 2')
}

function asyncAddProduct() {
  alert('异步添加商品数量 + 10')
}
</script>
<style lang='less' scoped>
</style>