import Vue from 'vue'
import Vuex from 'vuex'

import device from './device'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    device: device
  }
})

Vue.store = store;

export default store
