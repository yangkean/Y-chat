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
