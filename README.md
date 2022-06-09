# vue 3-three.js
学习b站老陈打码

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 使用Vite创建项目

```sh
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue

$ cd <project-name>
$ npm install
$ npm run dev
```

## Vue 3基本语法

### 不同点

#### template标签

>`<template>`标签里面不需要再定义根节点

#### script标签

- `<script>`标签里面需要加 **setup**
- 直接引用组件 不需要再去注册
- 声明变量 直接定义，不需要进行data导出，但是不是响应式的
- 声明方法 直接定义，不需要methods进行管理
- 方法里面调用变量的值，不需要用this

### 数据绑定（数据成为响应式）

#### 字符串、数字类型用`ref`

```js
import { ref } from 'vue'

/**
 * 这样写不是响应式
 */
// let msg = '2022/5/6'
let msg = ref('2022/5/6'); //创建响应式对象

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
```

>在 方法里面修改需要变量.vlue 
>
>而模版里面 直接引用变量（自动解构）

#### 对象、数组类型用`reactive`

```js
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
function setUser2Age() {
  user2.age = 24
}
```

### 计算属性

```js
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
```
### 监听数据变化
```js
import { watch } from 'vue'


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


```

### Vue 3 父子传参
#### 父向子传参
> 子组件代码，父组件和Vue2一样

```vue
<template>
  <h1>
    <!-- <span>{{ num }}</span>
    <span>------</span>
    <span>{{ title }}</span> -->

    <!-- 可以直接使用，但是规范还是用props -->
    <span>{{ props.num }}</span>
    <span>------</span>
    <span>{{ props.title }}</span>

    <span>{{ props.artice && props.artice.num }}</span>
    <span>------</span>
    <span>{{ props.artice && props.artice.title }}</span>
  </h1>
</template>

<script setup>
import { ref, defineProps } from 'vue'
// let num = ref(1);
// let title = ref('今天是个好日子');
/**
 * 定义Props接受属性
 */
const props = defineProps({
  num: Number,// 设置类型
  title: String,
  artice: Object,
})
</script>
<style lang='less' scoped>
</style>
```

#### 子向父传参
> 子组件代码

```vue
<template>
  <h1 @click="sendRead">
  ...
  ...
  </h1>
</template>

<script setup>
import { defineEmits } from 'vue'
/**
 * 子组件向父组件传参(设置自定义事件)
 */
const emit = defineEmits(['finishRead', 'reading'])
function sendRead() {
  // emit('finishRead');
  emit('finishRead', '[已经阅读]');
}
</script>
```
> 父组件接收代码

```vue
<template>
 <!-- <ListItemVue v-for="(item, index) in articeList" :key="index" :num="item.num" :title="item.title"
    @finish-read="changeTitle(index)"></ListItemVue> -->

  <!-- 子组件如果和父组件的参数一起穿的时候，子组件的参数则写为$event,这个叫事件数据 -->
    <ListItemVue 
      v-for="(item, index) in articeList" 
      :key="index" 
      :num="item.num" 
      :title="item.title"
      @finish-read="changeTitle(index, $event)">
  </ListItemVue>
</template>

<script setup>
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
```
#### 去掉Eslint 警告
![image.png]("C:\Users\L\Downloads\image.png")

```vue
<template>
  ...
  ...
</template>

<script setup>
/**
 * 去掉eslint 警告
 * 
 * defineProps，defineEmits 可以直接使用
 */
// import { ref, defineProps, defineEmits } from 'vue' 
/**
 * 定义Props接受属性
 */
const props = defineProps({
  num: Number,// 设置类型
  title: String,
  artice: Object,
})

/**
 * 子组件向父组件传参(设置自定义事件)
 */
const emit = defineEmits(['finishRead', 'reading'])
function sendRead() {
  emit('finishRead', '[已经阅读]');
}
</script>
<style lang='less' scoped>
</style>
```

## Vue3路由
### 安装路由
```shell
npm install vue-router@4
```
### 创建router文件夹里面新建index.js
```javascript
// 1.导入路由
/**
 * 创建路由方法 createRouter
 * 
 * 创建不同的历史模式 createWebHashHistory，createWebHistory 用其一即可
 * Hash 模式 createWebHashHistory 在内部传递的实际 URL 之前使用了一个哈希字符（#）
 * HTML5 模式 createWebHistory 创建 HTML5 模式
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 2.配置页面
/**
 * 不写后缀需要vite.config.js里面配置
 */
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Buycart from '../views/Buycart.vue'

// 3.定义路由
/**
 * 每个路由都需要映射到一个页面/组件
 * 
 * 嵌套路由稍后补充
 */
const routes = [
  // { path: '/', components: Home, name: 'home', },
  { path: '', component: Home, name: 'home', },
  { path: '/about', component: About, name: 'about', },
  { path: '/buycart', component: Buycart, name: 'buycart', },
]


// 4.创建路由实例并传递 'router' 配置（先简单配置一下）
const router = createRouter({
  // 5.内部默认提供了history 模式的实现。为了简单起见，暂时这里用 hash模式
  history: createWebHashHistory(),
  routes, // router:router 的 es6缩写
})

export default router
```

#### 不同的历史模式

##### Hash 模式
> URL中带有"#"号。
> 例：[http://localhost:8080/#/login](http://localhost:8080/#/login)
> 
> hash模式的特点
> 
> hash模式下，前端路由修改的是#号中的信息，对后端完全没有影响，因此改变hash也不会重新加载整个页面。如果修改不存在的#abc页面，页面也不会跳转，history模式则刚好相反，没有对应的页面就会出现404。

##### history模式
> URL中没有"#"号。
> 例:[http://localhost:8080/login](http://localhost:8080/login)
> 
> history模式的特点
> 
> history模式下，操作中不怕前进和后退，不带#号。它的缺点是害怕刷新页面，如果没有服务器端的支持，刷新之后就会请求服务器，由于找不到相应的支持响应或者资源，就会报错404页面。

#### 浏览器报错 ---Vue Router4特有的
> vue-router.esm-bundler.js:3308 Error: Invalid route component

**如果在配置路由当中的path有为空的把斜杠‘/’去掉，换成空字符**
### 在main.js中去引入router下的文件
```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 6.导入路由
import router from './router'

// createApp(App).mount('#app')
//拆开写
let app = createApp(App)
// app.mount('#app')
// 7. 安装路由
app.use(router)
app.mount('#app')
```
### 在App.vue中去使用路由
> 需要配合 `router-link` 和 `router-view`组件 
> 
> 和Vue2一致

```vue
<template>
  <div>
    <router-link to="/">跳转至首页</router-link>
    <router-link to="/about">跳转至about</router-link>
    <button @click="router.push('/')">跳转至首页</button>
    <button @click="goAbout">跳转到about</button>
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
...
...
</style>

```

### 安装 Vuex
```shell
npm install vuex@next --save
```
### 创建store文件夹里面新建index.js
```javascript
/**
 * Vuex4.0 以前都是Vue2的，以后才是Vue3的
 */

// 1.导入Vuex
import { createStore } from 'vuex'

// 2.创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
    }
  },
  // 计算属性  获取一个新的值
  getters: {
    totalPrice(state) {
      return state.count * 98.8;
    },
  },
  // 同步修改状态的方法
  mutations: {
    increment(state, payload) {
      // payload 是传过来的参数
      state.count += payload;
    },
  },
  // 异步修改状态的方法（调接口的时候）
  actions: {
    asyncAdd(store, payload) {
      // payload 是传过来的参数
      setTimeout(() => {
        // store.commit('increment', 10)
        store.commit('increment', payload)
      }, 1000)
    },
  },
})

// 3.导出store
export default store;
```
### 在main.js中去引入store下的文件
```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 6.导入路由
import router from './router'
// 4.导入Vuex
import store from './store'

// createApp(App).mount('#app')
//拆开写
let app = createApp(App)
// app.mount('#app')
// 7. 安装路由
app.use(router)
// 5. 安装Vuex
app.use(store)
app.mount('#app')
```
### 在App.vue中去使用Vuex
```vue
<template>
  ...
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
```