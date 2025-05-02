// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

// 各Viewコンポーネントの直接インポートは不要になります
// import HomeView from '@/views/HomeView.vue';
// import SearchResultsView from '@/views/SearchResultsView.vue';
// ... 他のインポートも削除 ...

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // 遅延ローディング (ダイナミックインポート) に変更
      // /* webpackChunkName: "home" */ は、ビルド時に生成されるチャンクファイル名にヒントを与えるマジックコメントです。Viteでも利用されます。
      component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
    },
    {
      path: '/results',
      name: 'results',
      // 遅延ローディングに変更
      component: () => import(/* webpackChunkName: "results" */ '@/views/SearchResultsView.vue')
    },
     {
      path: '/hint',
      name: 'hint',
      // 遅延ローディングに変更
      component: () => import(/* webpackChunkName: "hint" */ '@/views/HintPageView.vue')
    },
    // {
    //   path: '/account/login',
    //   name: 'account-login',
    //   // 遅延ローディングに変更
    //    // アカウント関連のビューを同じチャンクにまとめる場合は "account" のような同じチャンク名を指定します
    //   component: () => import(/* webpackChunkName: "account-login" */ '@/views/AccountLoginView.vue')
    // },
    //  {
    //   path: '/account/reset',
    //   name: 'password-reset',
    //   // 遅延ローディングに変更
    //    // アカウント関連のビューを同じチャンクにまとめる場合は "account" のような同じチャンク名を指定します
    //   component: () => import(/* webpackChunkName: "password-reset" */ '@/views/PasswordResetView.vue')
    // },
    //  {
    //   path: '/email',
    //   name: 'email-client',
    //   // 遅延ローディングに変更
    //   component: () => import(/* webpackChunkName: "email" */ '@/views/EmailClientView.vue')
    // },
    // TODO: 他のルートも遅延ローディングで追加
    // {
    //   path: '/ending',
    //   name: 'ending',
    //   component: () => import(/* webpackChunkName: "ending" */ '@/views/EndingView.vue')
    // },
    // {
    //   path: '/chapter0', // ゲームクリア後に表示
    //   name: 'chapter0',
    //   component: () => import(/* webpackChunkName: "chapter0" */ '@/views/Chapter0View.vue')
    // }
  ]
});

export default router;