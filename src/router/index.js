import { createRouter, createWebHistory } from 'vue-router'

//view, components
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue' 
import ForgotPassword from '../views/ForgotPassword.vue'
import EmailSent from '../views/EmailSent.vue'
import CaffeBar from '../views/CaffeBar.vue'
import Account from '../views/Account.vue'

// firebase imports
import { auth } from '../firebase/config'

//checks if a user is logged in, !user -> login
const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
} 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  //{ dont need this rn
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  { 
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/emailsent',
    name: 'EmailSent',
    component: EmailSent
  },
  {
    path: '/caffebar/:idCaffe?',
    name: 'CaffeBar',
    component: CaffeBar,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: requireAuth
  },
  //404 path
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
