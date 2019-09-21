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
        <!-- notification -->
        <div v-if="alert.message">
          <q-banner :class="`text-white ${alert.type === 'negative' ? 'bg-red' : 'bg-green'}`">
            {{ alert.message }}
          </q-banner>
        </div>
        <!-- end notification -->

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
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import { userService } from '../../_services';

export default {
  // name: 'ComponentName',
  props: ['isOpen', 'toggle'],
  beforeDestroy() {
    this.clear();
  },
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
    ...mapActions('alert', ['success', 'error', 'clear']),
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

      try {
        const { jumlahTarikDana } = this;

        const withdrawal = await userService.withdraw({ user_req_nominal: jumlahTarikDana });

        if (withdrawal) {
          // TODO: should do refetch
          this.toggleModal();
          this.$q.notify({ color: 'positive', message: 'Berhasil melakukan permintaan withdrawal', position: 'top-right' });
        }
      } catch (e) {
        this.isSubmitting = false;
        let errMsg = 'Gagal melakukan permintaan penarikan';

        if (typeof e === 'string') {
          errMsg = e;
        }

        this.error(errMsg);
      }
    },
  },
  computed: {
    isProfileCompleted() {
      return this.$store.state.authentication.user.is_profile_completed;
    },
    alert() {
      return this.$store.state.alert;
    },
  },
};
</script>

<style>
</style>
