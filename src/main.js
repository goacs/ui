import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth, { DEFAULT_OPTIONS } from '@d0whc3r/vue-auth-plugin';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://api.mms.test:8085/api'

Vue.use(VueAxios, axios)

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
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
