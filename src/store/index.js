import Vue from 'vue'
import Vuex from 'vuex'

import config from './config'
import device from './device'
import dashboard from './dashboard'
import template from './template'
import tasks from './tasks'
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
    config,
    device,
    dashboard,
    template,
    tasks,
    file,
  }
})

Vue.store = store;

export default store
