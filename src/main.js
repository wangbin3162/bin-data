import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, ColorPicker } from 'element-ui'
import BinUI from 'bin-ui'
import 'bin-ui/lib/styles/index.css'
import './styles/index.styl'
import db from './utils/db'

// element-ui 局部引用
Vue.component(Button.name, Button)
Vue.component(ColorPicker.name, ColorPicker)

Vue.use(BinUI)

// 注册全局通信
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$db = db

console.log(db.get('app').value())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
