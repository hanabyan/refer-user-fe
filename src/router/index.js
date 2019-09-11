import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

import tokenHelper from '../_helper/token.helper';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    // TODO: should dispatch logout action from store, will find a way
    // TODO: change to meta next time
    const publicPagesOnly = ['/sign/in', '/sign/up'];
    const publicUnpublic = ['/c'];
    const authRequired = !publicPagesOnly.some(url => to.path.startsWith(url));
    const loggedIn = localStorage.getItem('user');

    if (publicUnpublic.some(url => to.path.startsWith(url))) {
      const { params: { code } } = to;
      if (loggedIn && tokenHelper.validate()) {
        return next(`/reward/claim/${code}`);
      }

      return next();
    }

    if (authRequired && (!loggedIn || !tokenHelper.validate())) {
      return next('/sign/in');
    }

    if ((loggedIn && tokenHelper.validate()) && !authRequired) {
      return next('/');
    }

    return next();
  });

  return Router;
}
