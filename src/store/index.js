import Vue from 'vue'
import Vuex from 'vuex'

import device from './device'
import dashboard from './dashboard'
import template from './template'
import file from './file'

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
    dashboard,
    template,
    file,
  }
})

Vue.store = store;

export default store
