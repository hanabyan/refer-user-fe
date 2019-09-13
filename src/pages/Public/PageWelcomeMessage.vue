<template>
  <div class="q-pa-md">
    <q-layout
      ref="layout"
      class="row justify-center"
    >
      <q-header class="bg-white text-center">
        <img
          src="statics/logo.refer.medium.png"
          style="height: 50px;"
        />
      </q-header>

      <q-page-container class="text-center" style="font-size: 16px; padding-bottom: 90px;">
        <img src="~/assets/img/registered.png" style="height: 370px;"/>
        <p>Selamat bergabung bersama
          <a :href="REFER_PORTAL">
            <img
              src="statics/logo.refer.medium.png"
              style="height: 20px; vertical-align: middle;"
            />
          </a>
          <br />Dapatkan komisi pertamamu, share sekarang!
        </p>
        <p class="q-ma-xl">
          <router-link
            to="/sign/in"
          >
            <q-btn
              class="refer-input"
              type="button"
              label="Mulai"
              unrelevated
              no-caps
            />
          </router-link>
        </p>

        <div class="row">
          <div class="col">
            <img src="~/assets/img/cara01.png" />
            <p>Pilih produk</p>
          </div>
          <div class="col">
            <img src="~/assets/img/cara02.png" />
            <p>Share melalui messenger apps</p>
          </div>
          <div class="col">
            <img src="~/assets/img/cara03.png" />
            <p>Dapatkan komisi untuk setiap produk yang terbeli</p>
          </div>
        </div>
      </q-page-container>

      <q-footer class="bg-white text-center" style="color: #444; font-size: 12px;">
        &copy; 2019 Refer. All rights reserved.
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(process.env);
    this.REFER_PORTAL = process.env.REFER_PORTAL;
  },
  name: 'PageWelcomeMessage',
  data() {
    return {
      REFER_PORTAL: '',
    };
  },
};
</script>

<style>
</style>
