import Vue from 'vue'
import {
  Button,
  Input,
  Menu,
  Submenu,
  MenuItem,
  Row,
  Col,
} from 'element-ui'
import App from './App.vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)

new Vue({
  el: '#app',
  render: h => h(App)
})
