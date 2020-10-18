import Vue from 'vue'
import Vuex from 'vuex'

import device from './device'
import dashboard from './dashboard'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    device,
    dashboard
  }
})

Vue.store = store;

export default store
