<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <div class="q-pa-md" style="width: 350px; max-width: 350px;">
      <q-form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-12 text-center q-mb-lg">
            <img src="~/assets/img/logo.refer.medium.png" style="height: 35px"/>
          </div>
          <div class="col-12 q-pb-md">
            <q-input
              outlined
              square
              class="refer-input"
              v-model="$v.phone.$model"
              placeholder="nomor selular *"
              lazy-rules
              dense
              :error="isSubmitted && $v.phone.$error"
            >
              <template v-slot:error>
                <p v-if="!$v.phone.required">Phone is required</p>
              </template>
            </q-input>
          </div>

          <div class="col-12 q-pb-md">
            <q-input
              outlined
              square
              class="refer-input"
              type="password"
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
            <p
              v-if="alert.message && alert.type == 'negative'"
              class="text-negative"
            >{{ alert.message }}
            </p>
          </div>

          <div class="col-6">
            Belum memiliki akun?
            <router-link
              :to="`/sign/up${$route.query.code ? `?code=${$route.query.code}` : ''}`"
            >Daftar sekarang</router-link>
          </div>
          <div class="col-6 text-right q-mt-xs">
            <q-btn
              class="refer-input"
              type="submit"
              label="Masuk"
              unrelevated
              no-caps
              :loading="loggingIn"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  // name: 'PageName',
  data() {
    return {
      phone: '',
      password: '',
      isSubmitted: false,
    };
  },
  validations: {
    phone: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions('authentication', ['login']),
    ...mapActions('navigation', ['setParamCode']),
    async handleSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }

      const { phone, password } = this;
      if (phone && password) {
        if (this.$route.query.code) {
          this.setParamCode(this.$route.query.code);
        }

        try {
          const res = await this.login({ phone, password });
          if (res) {
            console.log(res);
          }
        } catch (e) {
          console.log(e.response);
        }
      }
    },
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
    alert() {
      return this.$store.state.alert;
    },
  },
};
</script>

<style>
</style>
