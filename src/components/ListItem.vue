<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lp
 * @Date: 2022-06-04 10:48:33
 * @LastEditors: Lp
 * @LastEditTime: 2022-06-09 19:58:55
-->
<template>
  <h1 @click="sendRead">
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
/**
 * 去掉eslint 警告
 * 
 * defineProps，defineEmits 可以直接使用
 */
// import { ref, defineProps, defineEmits } from 'vue' 
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

/**
 * 子组件向父组件传参(设置自定义事件)
 */
const emit = defineEmits(['finishRead', 'reading'])
function sendRead() {
  // emit('finishRead');
  emit('finishRead', '[已经阅读]');
}
</script>
<style lang='less' scoped>
</style>