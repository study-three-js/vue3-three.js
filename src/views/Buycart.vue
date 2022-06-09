<template>
  <h1>购物车</h1>
  <h1>商品数量 {{ store.state.count }}</h1>
  <h1>商品总价 {{ store.getters.totalPrice }}</h1>

  <button @click="addProduct">添加商品数量 + 2</button>
  <button @click="asyncAddProduct">异步添加商品数量 + 10</button>
</template>

<script setup>
import { useStore } from "vuex"

let store = useStore()

function addProduct() {
  // 同步是commit
  store.commit('increment', 2)
}

function asyncAddProduct() {
  // 异步是dispatch
  // store.dispatch('asyncAdd') //默认 + 10
  store.dispatch('asyncAdd', 5)
}
</script>
<style lang='less' scoped>
</style>