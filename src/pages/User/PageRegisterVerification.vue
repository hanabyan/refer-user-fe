<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <q-page-container class="text-center">
      <img
        src="statics/logo.refer.medium.png"
        style="height: 50px;"
        class="q-mb-xl"
      />
      <div class="text-h4">Verifikasi Nomor HP</div>
      <p>Isi 6-digit kode verifikasi yang kami kirimkan ke nomor hp Anda:</p>
      <p class="q-mb-lg">
        <OTPInput
          :onChangeOTP="onChangeOTP"
          :isDisabled="isDisabled"
          :isError="isError"
          :shouldResetOTP="shouldResetOTP"
          :numberOfInput="6"
        />
      </p>
      <p
        v-if="alert.message && alert.type == 'negative'"
        class="text-negative"
      >{{ alert.message }}
      </p>
      <p>
        <q-btn
          class="refer-input"
          label="Verifikasi"
          unrelevated
          no-caps
          @click="doVerify"
        />
      </p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </q-page-container>
  </q-layout>
</template>

<script>
// import OTPInput from 'vue-otp-input';
import { mapActions } from 'vuex';
import { userService } from '../../_services';

import OTPInput from '../../components/OTPInput';

export default {
  name: 'PageRegisterVerification',
  beforeDestroy() {
    this.clear();
  },
  components: {
    OTPInput,
  },
  data() {
    return {
      otp: null,
      isDisabled: false,
      isError: false,
      shouldResetOTP: false,
    };
  },
  methods: {
    ...mapActions('alert', ['error', 'clear']),
    onChangeOTP(otp) {
      this.clear();
      console.log(otp);
      this.otp = otp;
    },
    async doVerify() {
      try {
        const res = await userService.verifyAccount(this.$route.query.id, { code: this.otp });
        console.log(res);
        let query = '';
        if (this.$route.query.code) {
          query = `?code=${this.$route.query.code}`;
        }
        this.$router.push(`/sign/up/success${query}`);
      } catch (e) {
        this.error(e);
      }
    },
  },
  computed: {
    alert() {
      return this.$store.state.alert;
    },
  },
};
</script>

<style>
.otp-number-input {
  width: 100px;
  height: 40px;
}
</style>
