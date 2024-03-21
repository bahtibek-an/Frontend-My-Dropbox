import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useMainStore } from "@/stores/MainStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/Home.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/:folderId',
      alias: '/:folderId*',
      name: 'folder',
      component: import('../views/Folder.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: import('../views/Auth/Login.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: import('../views/Auth/Register.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: import('../views/Profile.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      useMainStore().setError('User not authorized')
      next('/login')
    }
  } else {
    next();
  }
});

export default router
