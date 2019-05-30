import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, ColorPicker } from 'element-ui'
import BinUI from 'bin-ui'
import VCharts from 'v-charts'
import 'bin-ui/lib/styles/index.css'
import './styles/index.styl'

// element-ui 局部引用
Vue.component(Button.name, Button)
Vue.component(ColorPicker.name, ColorPicker)

Vue.use(BinUI)
Vue.use(VCharts)

Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
