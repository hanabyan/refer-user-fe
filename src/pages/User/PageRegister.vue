<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <div class="q-pa-md" style="width: 350px; max-width: 350px;">

      <div class="row">
        <div class="col-6 q-mb-lg">
          <img src="~/assets/img/logo.refer.medium.png" style="height: 35px"/>
        </div>

        <div class="col-6 text-right">
          <p class="text-h5">Daftar</p>
        </div>

        <div class="col-12 q-pb-md">
          <q-item-label>Nama</q-item-label>
          <q-input
            outlined
            square
            class="refer-input"
            v-model="name"
            placeholder="nama *"
            lazy-rules
            dense
          />
        </div>

        <div class="col-12 q-pb-md">
          <q-item-label>Nomor Seluler</q-item-label>
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
          <q-item-label>Tanggal Lahir</q-item-label>
          <div class="row q-gutter-xs">
            <div class="col-3">
              <q-select
                outlined
                square
                class="refer-input"
                v-model="day"
                :options="dayOptions"
                placeholder="DD *"
                lazy-rules
                dense
              />
            </div>
            <div class="col-3">
              <q-select
                outlined
                square
                class="refer-input"
                v-model="month"
                :options="monthOptions"
                placeholder="MM *"
                lazy-rules
                dense
              />
            </div>
            <div class="col-4">
              <q-select
                outlined
                square
                class="refer-input"
                v-model="year"
                :options="yearOptions"
                placeholder="YYYY *"
                lazy-rules
                dense
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-6">
          Sudah memiliki akun? <router-link to="/sign/in">Masuk</router-link>
        </div>
        <div class="col-6 text-right">
          <q-btn
            class="refer-input"
            type="submit"
            label="Daftar"
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
  beforeMount() {
    const now = new Date();

    let day = String(now.getDate());
    if (day.length === 1) {
      day = `0${day}`;
    }

    let month = String(now.getMonth() + 1);
    if (month.length === 1) {
      month = `0${month}`;
    }

    const year = String(now.getYear() + 1900);

    this.day = day;
    this.month = month;
    this.year = year;
  },
  data() {
    return {
      name: '',
      mobile: '',
      day: '',
      month: '',
      year: '',
    };
  },
  computed: {
    dayOptions() {
      const days = [];

      for (let i = 1; i <= 31; i += 1) {
        days.push(String(i).length === 1 ? `0${i}` : String(i));
      }

      return days;
    },
    monthOptions() {
      const days = [];

      for (let i = 1; i <= 12; i += 1) {
        days.push(String(i).length === 1 ? `0${i}` : String(i));
      }

      return days;
    },
    yearOptions() {
      const days = [];
      const currentYear = new Date().getYear() + 1900;

      for (let i = 1900; i <= currentYear; i += 1) {
        days.push(String(i).length === 1 ? `0${i}` : String(i));
      }

      return days;
    },
  },
};
</script>

<style>
</style>
