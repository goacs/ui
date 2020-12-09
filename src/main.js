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
import VueSocketIO from 'vue-socket.io'
// import 'buefy/dist/buefy.css'
import './assets/styles/main.scss'

Vue.use(Buefy)


Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers['Authorization'] = 'Bearer {auth_token}'

Vue.use(VueAxios, axios)

moment.defaultFormat = "YYYY-MM-DD hh:mm:ss"
Vue.use(require('vue-moment'), { moment })

const authPluginOptions = { ...DEFAULT_OPTIONS,
  ...{
    authRedirect: '/auth/login',
    loginData: {
        url: '/auth/login',
        method: 'POST',
        redirect: '/',
        customToken: (response) => response.data.data['token'],
        fetchUser: false,
        fetchData: (response) => response.data.data['user'],
    },
  },
  logoutData: {
    url: '/auth/logout',
    method: 'POST',
    redirect: '/auth/login',
    makeRequest: false,
  },
}

Vue.use(VueAuth, authPluginOptions)

Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://localhost:8085",
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
  options: { path: "/socket.io/" }
}))

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
