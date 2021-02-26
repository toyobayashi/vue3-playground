import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    COUNT (state) {
      state.count++
    }
  },
  actions: {
  },
  modules: {
  }
})
