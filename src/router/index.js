
import Vue from 'vue'
import Router from 'vue-router'
import table from '../view/table'
Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      // 2、修改组件名
      name: 'table',
      component: table
    }
  ]
})