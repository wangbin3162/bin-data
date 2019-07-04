import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, ColorPicker, Select, Option } from 'element-ui'
import BinUI from 'bin-ui'
import VCharts from 'v-charts'
import 'bin-ui/lib/styles/index.css'
import './styles/index.styl'

// element-ui 局部引用
Vue.use(Button)
Vue.use(ColorPicker)
Vue.use(Select)
Vue.use(Option)

Vue.use(BinUI)
Vue.use(VCharts)

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$base = process.env.NODE_ENV === 'production' ? '/bin-data-site' : ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
