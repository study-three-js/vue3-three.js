<template>
  <h1>{{msg}}</h1>

  <!-- 方法里修改数据 -->
  <h1>{{revseMsg(msg)}}</h1>

  <!-- 动态修改字符串、数字类型数据 -->
  <button @click="setMsg">点击修改</button>

  <!-- 动态修改对象、数组类型数据 -->
  <h1>用户名：{{user.username}}</h1>
  <h1>年龄：{{user.age}}</h1>
  <button @click="setUserAge">点击修改年龄</button>

  <h1>状态：{{userInfo.state}}</h1>
  <button @click="setUserInfoState">点击修改状态</button>

  <!-- 不用reactive，用ref对象直接赋值 -->
  <h1>年龄：{{user2.age}}</h1>
  <!-- <button @click="setUser2Age(88888)">点击修改状态</button> -->
  <!-- 如果还需要事件对象，需要传入$event -->
  <button @click="setUser2Age(88888,$event)">点击修改状态</button>
  <!-- <img
    alt="Vue logo"
    src="./assets/logo.png"
  /> -->
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, reactive } from 'vue'

/**
 * 这样写不是响应式
 */
// let msg = '2022/5/6'
let msg = ref('2022/5/6'); //创建响应式数据

/**
 * 创建响应式对象
 */
let user = ref({
  username: 'L',
  age: 18,
})
let userInfo = reactive({
  username: 'L',
  state: '看电影',
})

function revseMsg(val) {
  /**
   * 转成数组 ---》 数组颠倒的方法 ---》转成字符串
   */
  return val.split('').reverse().join('')
}

function setMsg() {
  /**
   * 
   * 这样写不是响应式
   * 
   * 当前数据已改，但是视图没有进行修改
   */
  // msg = '精灵旅社收官之作不好玩！！！'
  msg.value = '精灵旅社收官之作不好玩！！！' //.value 才可以修改其值
  console.log(msg, '---msg');
}

function setUserAge() {
  // user.age = 22 //user.age = 22,但是视图没变
  user.value.age = 22
  console.log(user, user.age);
}

function setUserInfoState() {
  userInfo.state = '睡觉'
}

/**
 * 不用reactive
 * 用ref对象直接赋值
 */
let user2 = reactive(user.value) // 解包
// function setUser2Age(event) {
// console.log(evernt, '---event');
function setUser2Age(num, event) {
  // user2.age = 24
  user2.age = num
  console.log(event, '---evernt');
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
