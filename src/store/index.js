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