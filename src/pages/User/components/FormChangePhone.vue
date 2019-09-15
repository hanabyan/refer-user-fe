<template>
  <q-dialog
    v-model="isOpen"
    square
    full-height
    persistent
    position="right"
  >
    <q-card
      class="column
      fixed-right
      full-height"
      style="width: 350px"
    >
      <q-card-section>
        <div
          class="text-h6"
        >Ubah Nomor HP</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="q-mb-md">
          <q-input
            type="number"
            v-model="$v.mobilePhone.$model"
            label="Masukkan nomor HP anda yang baru"
            :dense="false"
            :error="isSubmitted && $v.mobilePhone.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.mobilePhone.required">Wajib mengisi nomor HP</p>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions
        align="right"
        class="bg-white text-teal"
      >
        <q-btn
          flat
          label="Batal"
          @click="handleCancel"
          :disable="isSubmitting"
        />
        <q-btn
          flat
          label="Ubah"
          @click="handleSubmit"
          :loading="isSubmitting"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// TODO: confirm OTP
import { required } from 'vuelidate/lib/validators';

export default {
  // name: 'ComponentName',
  props: ['isOpen', 'toggle'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      isSent: false,
      mobilePhone: '',
      isVerified: false,
    };
  },
  validations: {
    mobilePhone: {
      required,
    },
  },
  methods: {
    toggleModal() {
      this.$emit('toggle');
    },
    handleCancel() {
      this.toggleModal();
    },
    async handleSubmit() {
      this.isSubmitting = true;
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$error) {
        this.isSubmitting = false;
        return;
      }

      // TODO: set isSent if submit request success
      this.isSent = true;
      // if (this.actionType === 'create') {
      //   try {
      //     const created = await promoService.create(payload);
      //     if (created) {
      //       this.$emit('refetch');
      //       this.toggleModal();
      //     }
      //   } catch (e) {
      //     if (e.response.status >= 400) {
      //       let errMsg = 'Unknown error';
      //       const { data } = e.response;

      //       if (data && typeof data === 'string') {
      //         errMsg = data;
      //       }

      //       if (data && data.message && typeof data.message === 'string') {
      //         errMsg = data.message;
      //       }

      //       this.isSubmitting = false;
      //       this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
      //     }
      //   }
      // } else if (this.actionType === 'edit') {
    },
  },
};
</script>

<style>
</style>
