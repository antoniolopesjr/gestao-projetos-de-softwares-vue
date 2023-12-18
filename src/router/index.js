import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { isPublic: true }
    },
    // Rotas Protegidas
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: { isPublic: false }
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/Clients.vue'),
      meta: { isPublic: false }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token');
  const isPublicRoute = to.matched.some(record => record.meta.isPublic);

  if (!isLoggedIn && !isPublicRoute) {
    next('/login');
  } else if (isLoggedIn && to.path === '/login') {
    next('/home');
  } else {
    next();
  }
});



export default router
