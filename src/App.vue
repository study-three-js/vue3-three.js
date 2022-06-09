<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lp
 * @Date: 2022-06-04 10:26:48
 * @LastEditors: Lp
 * @LastEditTime: 2022-06-09 20:16:16
-->
<template>
  <h1>{{ msg }}</h1>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ListItemVue from './components/ListItem.vue';
import { ref, reactive, computed, watch } from 'vue'

let msg = ref('2022/5/6'); //创建响应式数据
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
