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
              :to="`/sign/in${$route.query.code ? `?code=${$route.query.code}` : ''}`"
            >Masuk sekarang!!!!</router-link>
          </p>
        </div>

        <div class="col-12">
          <q-item-label class="q-mb-xs">Nama</q-item-label>
          <q-input
            outlined
            square
            class="refer-input q-pb-lg"
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

        <div class="col-12">
          <q-item-label class="q-mb-xs">Nomor Seluler</q-item-label>
          <q-input
            outlined
            square
            type="tel"
            class="refer-input q-pb-lg"
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

        <div class="col-12">
          <q-item-label class="q-mb-xs">Password</q-item-label>
          <q-input
            outlined
            square
            type="password"
            class="refer-input q-pb-lg"
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

        <div class="col-12">
          <q-item-label class="q-mb-xs">Confirm Password</q-item-label>
          <q-input
            outlined
            square
            type="password"
            class="refer-input q-pb-lg"
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

        <div class="col-12">
          <q-item-label class="q-mb-xs">Tanggal Lahir</q-item-label>
          <div class="row q-gutter-xs">
            <div class="col-3">
              <q-select
                outlined
                square
                class="refer-input q-pb-md"
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
                class="refer-input q-pb-md"
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
                class="refer-input q-pb-md"
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

      <div class="row">
        <div class="col">
          <q-checkbox
            v-model="$v.consent.$model"
            class="refer-input"
            color="grey-9"
          >
            <template v-slot="props">
              <q-item-label>
                Saya setuju untuk mengikuti
                {{' '}}
                <a
                  href="javascript:void(0)"
                  @click.prevent.stop="onConsentClick"
                >syarat dan ketentuan</a> yang berlaku
              </q-item-label>
            </template>
          </q-checkbox>
          <p v-if="isSubmitted && !$v.consent.sameAs" class="text-negative">
            Centang jika setuju pada syarat dan ketentuan yang berlaku
          </p>
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-6">
          Sudah memiliki akun?
          <router-link
            :to="`/sign/in${$route.query.code ? `?code=${$route.query.code}` : ''}`"
          >Masuk sekarang</router-link>
        </div>
        <div class="col-6 text-right">
          <q-btn
            class="refer-input"
            type="submit"
            label="Daftar"
            unrelevated
            no-caps
            :disable="isSubmitting"
          />
        </div>
      </div>
      </q-form>

    </div>
    <RegisterConsent
      v-if="isShowModal"
      :isOpen="isShowModal"
      @toggle="toggleModal"
    />
  </q-layout>
</template>

<script>
import {
  required, sameAs,
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { userService } from '../../_services';
import RegisterConsent from './components/RegisterConsent';

export default {
  // name: 'PageName',
  components: {
    RegisterConsent,
  },
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
      isShowModal: false,
      name: '',
      mobile: '',
      password: '',
      password_confirm: '',
      day: '',
      month: '',
      year: '',
      isSubmitting: false,
      isSubmitted: false,
      code: '',
      consent: false,
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
    consent: {
      sameAs: sameAs(() => true),
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
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    onConsentClick() {
      this.toggleModal();
    },
    async handleSubmit() {
      this.isSubmitted = true;
      this.isSubmitting = true;
      this.$v.$touch();
      if (this.$v.$error) {
        this.isSubmitting = false;
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
          // this.success('Pendaftaran berhasil');
          let query = '';

          if (this.$route.query.code) {
            if (query.length === 0) {
              query = `?code=${this.$route.query.code}`;
            } else {
              query = `${query}&code=${this.$route.query.code}`;
            }
          }

          if (query.length === 0) {
            query = `?id=${result}`;
          } else {
            query = `${query}&id=${result}`;
          }

          this.$router.push(`/sign/up/verify${query}`);
        }
      } catch (e) {
        this.isSubmitting = false;
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
/* .refer-input .q-checkbox__inner--active svg {
  color: #4a4a4a;
} */
</style>
