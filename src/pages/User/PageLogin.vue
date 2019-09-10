<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <div class="q-pa-md" style="width: 350px; max-width: 350px;">

      <div class="row">
        <div class="col-12 text-center q-mb-lg">
          <img src="~/assets/img/logo.refer.medium.png" style="height: 35px"/>
        </div>
        <div class="col-12 q-pb-md">
          <q-input
            outlined
            square
            class="refer-input"
            v-model="mobile"
            placeholder="nomor selular *"
            lazy-rules
            dense
          />
        </div>

        <div class="col-12 q-pb-md">
          <q-input
            outlined
            square
            class="refer-input"
            type="password"
            v-model="password"
            placeholder="password *"
            lazy-rules
            dense
          />
        </div>

        <div class="col-6">
          Belum memiliki akun? <router-link to="/sign/up">Daftar</router-link>
        </div>
        <div class="col-6 text-right q-mt-xs">
          <q-btn
            class="refer-input"
            type="submit"
            label="Masuk"
            unrelevated
            no-caps
          />
        </div>
      </div>

    </div>
  </q-layout>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      mobile: '',
      password: '',
    };
  },
};
</script>

<style>
</style>
