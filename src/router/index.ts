// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_EVENTS_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import(/* webpackChunkName: "results" */ '@/views/SearchResultsView.vue')
    },
    {
      path: '/hint',
      name: 'hint',
      component: () => import(/* webpackChunkName: "hint" */ '@/views/HintPageView.vue')
    },
    {
      path: '/account/login',
      name: 'account-login',
      component: () => import(/* webpackChunkName: "account" */ '@/views/AccountLoginView.vue') // アカウント関連を同じチャンクに
    },
    {
      path: '/account/reset',
      name: 'password-reset',
      component: () => import(/* webpackChunkName: "account" */ '@/views/PasswordResetView.vue') // アカウント関連を同じチャンクに
    },
    {
      path: '/email',
      name: 'email-client',
      component: () => import(/* webpackChunkName: "email" */ '@/views/EmailClientView.vue')
    },
    {
      path: '/instagram/yusuke_tanaka',
      name: 'instagram-yusuke-tanaka',
      component: () => import(/* webpackChunkName: "social" */ '@/views/InstagramView.vue')
    },
    // {
    //   path: '/instagram/:id',
    //   name: 'instagram-detail',
    //   component: () => import(/* webpackChunkName: "social" */ '@/views/InstagramDetailView.vue')
    // },
  ]
});

export default router;