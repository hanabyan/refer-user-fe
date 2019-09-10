
const routes = [
  {
    path: '/',
    component: () => import('layouts/Default.Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard/PageDashboard.vue') },
      { path: 'product', component: () => import('pages/Product/PageProduct.vue') },
      { path: 'income', component: () => import('pages/Income/PageIncome.vue') },
      { path: 'reward', component: () => import('pages/Reward/PageReward.vue') },
      { path: 'voucher', component: () => import('pages/Voucher/PageVoucher.vue') },
    ],
  },
  {
    path: '/sign',
    component: () => import('layouts/User.Layout.vue'),
    children: [
      { path: 'in', component: () => import('pages/User/PageLogin.vue') },
      { path: 'up', component: () => import('pages/User/PageRegister.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
