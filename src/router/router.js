import signIn from '../components/signIn'
import App from '../App'
import mainPane from '../components/mainPane'

// 定义路由
const routes = [
  { path: '/', component: signIn },
  { path: '/playground', component: App },
  { path: '/home', component: App },
  { path: '/member/:name', component: App },
]

export default routes