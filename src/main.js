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