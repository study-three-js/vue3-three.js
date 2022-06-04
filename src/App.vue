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

  <!-- 计算属性 -->
  <h1>{{reMsg}}</h1>
  <h1>{{reMsg}}</h1>
  <h1>{{reMsg}}</h1>
  <button @click="setReMsg">修改计算属性reMsg</button>
  <!-- <img
    alt="Vue logo"
    src="./assets/logo.png"
  /> -->

  <!-- 监听数据 -->
  <h1>{{userInfo.username}}</h1>
  <button @click="userInfo.username = '1'">修改监听数据username</button>
  <HelloWorld msg="Hello Vue 3 + Vite" />

  <!-- 常见指令与样式 -->
  <!-- v-bind 数据绑定 -->
  <!-- <h1 v-bind:class="className"></h1> -->
  <h1
    :class="className"
    :title="desc"
  ></h1>
  <!-- 富文本解析还是v-html -->
  <div
    class="content"
    v-html="html"
  ></div>
  <!-- v-on 事件监听 -->
  <!-- <div v-on:click="count++">{{count}}</div> -->
  <div @click="count++">{{count}}</div>
  <!-- class切换颜色 -->
  <h1
    :class="{box:true,bgRed:toggle}"
    :title="desc"
    @click="toggle = !toggle"
  ></h1>
  <!--     :class="['box','bgRed']" -->
  <h1
    :class="['box']"
    :title="desc"
  ></h1>
  <h1 :style="h1Style"></h1>

</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, reactive, computed, watch } from 'vue'

/**
 * 定义变量用let 或者 var
 */
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

/**
 * 创建动态的class/属性/事件中的属性
 */
let className = ref('box bgRed')
let desc = ref('这是一个box')
let html = ref('<h2>这是html的内容</h2>')
let count = ref(0)
let toggle = ref(true)
let h1Style = reactive({
  // background: 'skyblue',
  backgroundColor: 'skyblue',
  width: '200px',
  height: '200px',
  'border-bottom': '20px solid #ccc'
})

function revseMsg(val) {
  /**
   * 转成数组 ---》 数组颠倒的方法 ---》转成字符串
   * 
   *  方法调用几次触发几次
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


/**
 * 计算属性
 * 
 * 有缓存作用，相同变量，只会执行一次
 * 
 * 提高性能
 */
// const reMsg = computed(function () {
//   console.log(123);
//   return msg.value.split('').reverse().join('')
// })
// const reMsg = computed(() => {
//   console.log(123);
//   return msg.value.split('').reverse().join('')
// })

const reMsg = computed({
  get: () => {
    // 赋值
    console.log(567);
    return msg.value.split('').reverse().join('')
  },
  set: (value) => {
    // 设置值
    msg.value = value.split('').reverse().join('')
  }
})

function setReMsg() {
  reMsg.value = "出差一点也不好玩！！！"
  console.log(reMsg.value, '---reMsg');
}


/**
 * 监听数据变化
 */
watch(msg, (newValue, oldValue) => { //监听状态
  console.log(newValue, '----newValue');
  console.log(oldValue, '----oldValue');
})

watch(() => userInfo.username, (newVal, oldVal) => { //监听对象
  console.log(newVal, '----newVal');
  console.log(oldVal, '----oldVal');
})
// 监听多个数据变化
watch([msg, () => userInfo.state, () => userInfo.username], (newVal, oldVal) => { //监听对象
  console.log(newVal, '----newVal');
  console.log(oldVal, '----oldVal');
})
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

.box {
  width: 200px;
  height: 200px;
  background-color: purple;
}
.bgRed {
  background-color: red;
}
</style>
