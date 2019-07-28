// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import $ from 'jquery'
import echarts from 'echarts'
import axios from 'axios'
import Element from 'element-ui'
import store from './store'
// ./store/index.js
import 'element-ui/lib/theme-chalk/index.css'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件

import  '../static/IntakePlantStaticSource/lib/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import "font-awesome/css/font-awesome.min.css"
import {
  VTable,
  VPagination
} from 'vue-easytable'
//导入iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

Vue.config.productionTip = false
Vue.use(Element)
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

axios.defaults.headers.common['authorization'] = store.state.token
axios.interceptors.request.use(config => {
    if (store.state.token) {
      config.headers.common['authorization'] = store.state.token
    } 
    return config
  },
  error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token')
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 判断该路由是否需要登录权限
//     if (localStorage.user_id) {
//       // 判断当前的user_id是否存在 ； 登录存入的user_id
//       next()
//     } else {
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//         // 将要跳转路由的path作为参数，传递到登录页面
//       })
//     }
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store,
  axios
})
