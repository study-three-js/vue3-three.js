<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lp
 * @Date: 2022-06-04 10:26:48
 * @LastEditors: Lp
 * @LastEditTime: 2022-06-05 10:13:14
-->
<template>
  <h1>{{ msg }}</h1>
  <!-- 父子传参 props = property -->
  <!-- <ListItemVue :num="artice.num" :title="artice.title"></ListItemVue> -->

  <h1>列表循环</h1>
  <ListItemVue v-for="(item, index) in articeList" :key="index" :num="item.num" :title="item.title"></ListItemVue>

  <h1>对象传参</h1>
  <ListItemVue :artice="artice"></ListItemVue>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ListItemVue from './components/ListItem.vue';
import { ref, reactive, computed, watch } from 'vue'

let msg = ref('2022/5/6'); //创建响应式数据
let artice = reactive({
  num: 10,
  title: '定义props!'
})

let articeList = reactive([
  {
    num: 10,
    title: '定义props!'
  },
  {
    num: 20,
    title: '定义props!!'
  },
  {
    num: 30,
    title: '定义props!!!'
  },
])


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
