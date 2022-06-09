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
  /**
   * Vue Router4 报错Error: Invalid route component
   * 
   * 解决方法：如果在配置路由当中的path有为空的把斜杠'/'去掉，换成空字符
   */
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