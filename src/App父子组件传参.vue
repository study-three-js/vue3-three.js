<template>
  <h1>{{ msg }}</h1>
  <!-- 父子传参 props = property -->
  <!-- <ListItemVue :num="artice.num" :title="artice.title"></ListItemVue> -->

  <h1>列表循环</h1>
  <!-- <ListItemVue v-for="(item, index) in articeList" :key="index" :num="item.num" :title="item.title"
    @finish-read="changeTitle(index)"></ListItemVue> -->

  <!-- 子组件如果和父组件的参数一起穿的时候，子组件的参数则写为$event,这个叫事件数据 -->
  <ListItemVue v-for="(item, index) in articeList" :key="index" :num="item.num" :title="item.title"
    @finish-read="changeTitle(index, $event)"></ListItemVue>

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

// function changeTitle(index) {
function changeTitle(index, $event) {
  // articeList[index].title += "[已阅]"

  //$event为事件数据
  // articeList[index].title += $event

  //判断一下 只是第一次的时候添加
  if (articeList[index].title.indexOf($event) == -1) {
    articeList[index].title += $event
  }
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
