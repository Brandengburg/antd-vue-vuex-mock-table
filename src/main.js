import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import store from './store'
import router from '../src/router/index'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Antd)
require('./mock/index')
Vue.use(Vuex)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")