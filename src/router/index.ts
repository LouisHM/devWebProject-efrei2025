import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Historique from '@/pages/Historique.vue'
import { supabase } from '@/lib/supabase'



const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  { path: '/historique', component: Historique },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🔐 Auth guard
router.beforeEach(async (to, _from, next) => {
  const { data } = await supabase.auth.getSession()
  const isAuth = !!data.session

  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'home' })
  } else if ((to.name === 'home') && isAuth) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})
