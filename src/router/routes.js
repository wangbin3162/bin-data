import Home from '../views/home'

let routes = [
  {
    path: '/',
    redirect: '/home',
    component: Home,
    children: [{
      path: 'home',
      name: 'home',
      component: Home
    }]
  },
  {
    path: '/admin/:id',
    name: 'admin',
    component: () => import('../views/admin')
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('../views/screen')
  }
]

export default routes
