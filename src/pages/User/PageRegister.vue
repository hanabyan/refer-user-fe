<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <div class="q-pa-md" style="width: 350px; max-width: 350px;">
      <q-form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-6 q-mb-lg">
          <img src="~/assets/img/logo.refer.medium.png" style="height: 35px"/>
        </div>

        <div class="col-6 text-right">
          <p class="text-h5">Daftar</p>
        </div>

        <div
          class="col-12"
          v-if="alert.message"
        >
          <p
            :class="{ 'text-negative': alert.type
              === 'negative', 'text-positive': alert.type === 'positive' }"
          >{{ alert.message }}
          </p>
          <p v-if="alert.type === 'positive'">
            <router-link
              :to="`/sign/in${$route.params.code ? `/${$route.params.code}` : ''}`"
            >Masuk sekarang!!!!</router-link>
          </p>
        </div>

        <div class="col-12 q-pb-md">
          <q-item-label>Nama</q-item-label>
          <q-input
            outlined
            square
            class="refer-input"
            v-model="$v.name.$model"
            placeholder="nama *"
            lazy-rules
            dense
            :error="isSubmitted && $v.name.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.name.required">Name is required</p>
            </template>
          </q-input>
        </div>

        <div class="col-12 q-pb-md">
          <q-item-label>Nomor Seluler</q-item-label>
          <q-input
            outlined
            square
            type="tel"
            class="refer-input"
            v-model="$v.mobile.$model"
            placeholder="nomor selular *"
            lazy-rules
            dense
            :error="isSubmitted && $v.mobile.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.mobile.required">Phone is required</p>
            </template>
          </q-input>
        </div>

        <div class="col-12 q-pb-md">
          <q-item-label>Password</q-item-label>
          <q-input
            outlined
            square
            type="password"
            class="refer-input"
            v-model="$v.password.$model"
            placeholder="password *"
            lazy-rules
            dense
            :error="isSubmitted && $v.password.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.password.required">Password is required</p>
            </template>
          </q-input>
        </div>

        <div class="col-12 q-pb-md">
          <q-item-label>Confirm Password</q-item-label>
          <q-input
            outlined
            square
            type="password"
            class="refer-input"
            v-model="$v.password_confirm.$model"
            placeholder="confirm password *"
            lazy-rules
            dense
            :error="isSubmitted && $v.password_confirm.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.password_confirm.required">Confirm Password is required</p>
              <p v-if="!$v.password_confirm.sameAsPassword">The Password do not match</p>
            </template>
          </q-input>
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
          Sudah memiliki akun?
          <router-link
            :to="`/sign/in${$route.params.code ? `/${$route.params.code}` : ''}`"
          >Masuk sekarang</router-link>
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
      </q-form>

    </div>
  </q-layout>
</template>

<script>
import {
  required, sameAs,
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { userService } from '../../_services';

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
  beforeDestroy() {
    this.clear();
  },
  data() {
    return {
      name: '',
      mobile: '',
      password: '',
      password_confirm: '',
      day: '',
      month: '',
      year: '',
      isSubmitted: false,
      code: '',
    };
  },
  validations: {
    name: {
      required,
    },
    mobile: {
      required,
    },
    password: {
      required,
    },
    password_confirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  computed: {
    dayOptions() {
      const days = [];

      for (let i = 1; i <= 31; i += 1) {
        days.push(String(i).length === 1 ? `0${i}` : String(i));
      }

      return days;
    },
    alert() {
      return this.$store.state.alert;
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
  methods: {
    ...mapActions('alert', ['success', 'error', 'clear']),
    async handleSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }

      try {
        const {
          name, mobile, password, day, month, year,
        } = this;
        const payload = {
          name,
          phone: mobile,
          password,
          dob: `${year}-${month}-${day}`,
        };

        const result = await userService.register(payload);

        if (result) {
          this.success('Pendaftaran berhasil');
        }
      } catch (e) {
        let msg = 'Pendaftaran gagal';

        if (e && typeof e === 'string') {
          msg = e;
        }

        if (e.response && typeof e.response === 'string') {
          msg = e.response;
        }

        if (e.response && e.response.data && typeof e.response.data === 'string') {
          msg = e.response.data;
        }

        if (e.response && e.response.data && e.response.data.message && typeof e.response.data.message === 'string') {
          msg = e.response.data.message;
        }

        this.error(msg);
      }
    },
  },
};
</script>

<style>
</style>
