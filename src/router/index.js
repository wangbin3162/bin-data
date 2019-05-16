import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由数据
import routes from './routes'

import BinUI from 'bin-ui'

Vue.use(BinUI)

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  BinUI.LoadingBar.start()
  next()
})
router.afterEach(() => {
  BinUI.LoadingBar.done()
})

export default router
