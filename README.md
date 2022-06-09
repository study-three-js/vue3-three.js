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
<a name="dHdha"></a>
#### 
<a name="YLyl8"></a>
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
<a name="xKcmG"></a>
#### 去掉Eslint 警告
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1843937/1654775764324-8981ab5a-3fec-4224-af17-dfd9553ae008.png#clientId=ub78965e2-a840-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=166&id=u162dc1bf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=249&originWidth=1509&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31410&status=done&style=none&taskId=u3abd9b65-f059-4c1c-b8bf-8272d5bdac4&title=&width=1006)

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