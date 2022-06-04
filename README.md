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
