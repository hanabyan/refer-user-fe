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
      <p>
        <q-btn
          class="refer-input"
          label="Verifikasi"
          unrelevated
          no-caps
        />
      </p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </q-page-container>
  </q-layout>
</template>

<script>
// import OTPInput from 'vue-otp-input';
import OTPInput from '../../components/OTPInput';

export default {
  name: 'PageRegisterVerification',
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
    onChangeOTP(otp) {
      console.log(otp);
      this.otp = otp;
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
