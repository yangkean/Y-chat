import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Button,
  Input,
  Menu,
  Submenu,
  MenuItem,
  Row,
  Col,
  Dialog,
  Form,
  FormItem,
} from 'element-ui'
import App from './App'
import routes from './router/router'
import io from 'socket.io-client'
import config from '../config/'

Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)

const socket = io(`http://localhost:${config.server.port}/`)

// global mixin，会被用到所有 Vue 实例中
Vue.mixin({
  data () {
    return {
      socket,
    }
  }
})

Vue.use(VueRouter)
// 创建 router 实例
const router = new VueRouter({
  //mode: 'history',
  routes
})

// 创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
