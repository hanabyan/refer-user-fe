<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-red">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <!-- TODO: title content ??? -->
        </q-toolbar-title>

        <q-btn-dropdown
          color="red"
          label="Dropdown Button"
          stretch
          unelevated
          no-caps
        >
          <!-- TODO: change to avatar -->
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-2"
      :width="230"
    >
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <q-banner inline-actions class="text-white bg-red text-center banner__header">
            <template v-slot:action>
              <img
                class="absolute-center banner-img"
                alt="Refer logo"
                src="~assets/img/logo.white.lg.png"
              >
            </template>
          </q-banner>
        </q-header>

        <q-list class="drawer-menu-container">
          <!-- TODO: set summary penghasilan disini -->
          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.pathTo"
            exact
            :clickable="!!nav.pathTo"
          >
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ nav.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-layout>
    </q-drawer>

    <q-footer style="background-color: #fff; color: #a4a4a4; border-top: 1px solid #eee;">
      <q-toolbar>
        &copy; 2019 Refer. All rights reserved.

        <div class="pull-right hidden-xs"><b>Version</b> 1.0.0</div>
      </q-toolbar>
    </q-footer>

    <q-page-container class="main-page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'DefaultLayout',
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Beranda',
          icon: 'dashboard',
          pathTo: '/',
        },
        {
          label: 'Produk',
          icon: 'business',
          pathTo: '/product',
        },
        {
          label: 'Penghasilan',
          icon: 'list_alt',
          pathTo: '/income',
        },
        {
          label: 'My Reward',
          icon: 'category',
          pathTo: '/reward',
        },
        {
          label: 'Voucher',
          icon: 'category',
          pathTo: '/voucher',
        },
      ],
    };
  },
  methods: {
    openURL,
  },
};
</script>

<style scoped>
  .banner__header {
    min-height: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .banner-img {
    max-height: 40px;
  }
  .drawer-menu-container {
    padding-top: 50px;
  }
  .main-page-container {
    background-color: #ecf0f5;
  }
</style>
