import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth, { DEFAULT_OPTIONS } from '@d0whc3r/vue-auth-plugin';
import App from './App.vue'
import store from './store'
import router from './router'
import moment from 'moment'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/styles/main.css'

Vue.use(Buefy)


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8085/api'
axios.defaults.headers['Authorization'] = 'Bearer {auth_token}'

Vue.use(VueAxios, axios)

moment.defaultFormat = "YYYY-MM-DD hh:mm:ss"
Vue.use(require('vue-moment'), { moment })

const atuhPluginOptions = { ...DEFAULT_OPTIONS,
  ...{
    authRedirect: '/auth/login',
    loginData: {
        url: '/auth/login',
        method: 'POST',
        redirect: '/',
        customToken: (response) => response.data['token'],
        fetchUser: false,
        fetchData: (response) => response.data['user'],
    },
  },
  logoutData: {
    url: '/auth/logout',
    method: 'POST',
    redirect: '/auth/login',
    makeRequest: false,
  },
}

Vue.use(VueAuth, atuhPluginOptions)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
