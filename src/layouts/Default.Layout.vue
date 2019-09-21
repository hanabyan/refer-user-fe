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
          :label="profile && profile.name"
          stretch
          unelevated
          no-caps
        >
          <!-- TODO: change to avatar -->
          <q-list separator dense>
            <!-- <q-item clickable v-close-popup to="/profile"> -->
            <q-item clickable v-close-popup @click="toggleProfile">
              <q-item-section avatar>
                <q-avatar icon="account_circle" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Profile
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-avatar icon="power_settings_new" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Logout
                </q-item-label>
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
          <div
            class="row justify-center widget-summary"
          >
            <div class="col-12">
              <q-item-label>Saldo Anda</q-item-label>
            </div>
            <q-item-section avatar>
              <q-icon name="fas fa-credit-card" />
            </q-item-section>
            <q-item-section>
              <span class="text-h6">{{ convertToCurrency(getBalance) }}</span>
            </q-item-section>
          </div>

          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.pathTo"
            exact
            :clickable="!!nav.pathTo"
          >
            <q-item-section avatar>
              <q-icon :name="nav.icon" size="14px" color="blue-grey-9"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ nav.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-layout>
    </q-drawer>

    <ProfilePopup
      v-if="isShowProfile"
      :isOpen="isShowProfile"
    />

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
import { mapActions } from 'vuex';

import ProfilePopup from '../components/ProfilePopup';
import numberHelper from '../_helper/number.helper';

export default {
  name: 'DefaultLayout',
  components: {
    ProfilePopup,
  },
  beforeMount() {
    this.fetchSummaryBalance();
  },
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Beranda',
          icon: 'fa fa-tachometer-alt',
          pathTo: '/',
        },
        {
          label: 'Produk',
          icon: 'fa fa-th-list',
          pathTo: '/product',
        },
        {
          label: 'Penghasilan',
          icon: 'fa fa-money-bill',
          pathTo: '/income',
        },
        {
          label: 'My Reward',
          icon: 'fa fa-tags',
          pathTo: '/reward',
        },
        // {
        //   label: 'Voucher',
        //   icon: 'category',
        //   pathTo: '/voucher',
        // },
      ],
    };
  },
  methods: {
    openURL,
    ...mapActions('authentication', ['logout', 'fetchSummaryBalance']),
    ...mapActions('navigation', ['toggleProfile']),
    convertToCurrency(value) {
      return numberHelper.getCurrency({ value });
    },
  },
  computed: {
    profile() {
      return this.$store.state.authentication.user;
    },
    isShowProfile() {
      return this.$store.state.navigation.isShowProfile;
    },
    getBalance() {
      const { IN, OUT } = this.$store.state.authentication.summaryBalance;
      return parseFloat(IN) - parseFloat(OUT);
    },
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
  .widget-summary {
    background-color: #0100CA;
    color: #fff;
    height: 77px;
    padding: 8px 16px;
    border-top: 1px solid #fff;
    margin-bottom: 20px;
  }
</style>
