<template>
  <div>
    <router-link to="/">跳转至首页</router-link>
    <router-link to="/about">跳转至about</router-link>
    <button @click="router.push('/')">跳转至首页</button>
    <button @click="goAbout">跳转到about</button>
    <router-link to="/buycart">跳转至购物车</router-link>
    <router-link to="/product/123">跳转至产品</router-link>
  </div>
  <!-- 跟 Vue2 一样根据不同路径显示的不同的界面 -->
  <router-view></router-view>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

// 8.获取路由信息
let route = useRoute();
// 9.执行路由跳转
let router = useRouter();
function goAbout() {
  console.log(route, '====router');
  router.push("/about")
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
