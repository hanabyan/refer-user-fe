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
        >Tarik Dana</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="q-mb-md">
          <q-input
            type="number"
            v-model="jumlahTarikDana"
            label="Jumlah Penarikan"
            :dense="false"
            hint="Hanya gunakan angka"
            :error="isSubmitted && $v.jumlahTarikDana.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.jumlahTarikDana.required">Masukkan jumlah dana yang akan ditarik</p>
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
          label="Cancel"
          @click="handleCancel"
          :disable="isSubmitting"
        />
        <q-btn
          flat
          label="Submit"
          @click="handleSubmit"
          :loading="isSubmitting"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// TODO: perlu ditambahkan konfirmasi rekening bank?
// TODO: perlu ditambahkan force untuk update profile
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  // name: 'ComponentName',
  props: ['isOpen', 'toggle'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      jumlahTarikDana: '',
    };
  },
  validations: {
    jumlahTarikDana: {
      required,
    },
  },
  methods: {
    ...mapActions('navigation', ['toggleProfile']),
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

      /* break if validation error */
      if (this.$v.$error) {
        this.isSubmitting = false;
        return;
      }

      /* break if profile not completed */
      if (parseInt(this.isProfileCompleted, 10) < 1) {
        this.isSubmitting = false;

        this.$q.dialog({
          title: 'Konfirmasi',
          message: 'Untuk melakukan penarikan dana, anda harus melengkapi data diri terlebih dahulu. Tekan ya untuk melanjutkan !',
          cancel: {
            label: 'Batal',
            flat: true,
          },
          ok: {
            label: 'Ya',
            flat: true,
          },
          persistent: true,
        }).onOk(() => {
          this.toggleProfile();
        });

        return;
      }

      console.log('ok lah');

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
  computed: {
    isProfileCompleted() {
      return this.$store.state.authentication.user.is_profile_completed;
    },
  },
};
</script>

<style>
</style>
