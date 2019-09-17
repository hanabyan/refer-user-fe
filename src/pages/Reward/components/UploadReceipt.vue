<template>
  <q-dialog
    v-model="isOpen"
    persistent
    square
  >
    <q-card style="150px'" >
      <q-card-section>
        <div class="text-h5 q-mb-md">Upload Resi Belanja</div>

        <div
          v-if="alert.message"
          class="q-pb-md"
        >
          <!-- <p
            :class="{ 'text-negative': alert.type
              === 'negative', 'text-positive': alert.type === 'positive' }"
          >{{ alert.message }}
          </p> -->

          <q-banner
            :class="`text-white ${alert.type === 'negative' ? 'bg-red' : 'bg-green'}`"
          >
            {{ alert.message }}
          </q-banner>
        </div>

        <div class="q-mb-md">
          <q-uploader
            :factory="factoryFn"
            label="Pilih file"
            color="white"
            text-color="black"
            square
            flat
            bordered
            style="max-width: 300px"
            @uploaded="eventUploaded"
            @failed="eventFailed"
            auto-upload
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions
        align="right"
        class="bg-white text-teal"
      >
        <q-btn
          flat
          :label="alert.type === 'positive' ? 'Ok' : 'Batal'"
          @click="handleCancel"
          :disable="isSubmitting"
        />
        <q-btn
          v-if="alert.type !== 'positive'"
          flat
          label="Simpan"
          @click="handleSubmit"
          :loading="isSubmitting"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import tokenHelper from '../../../_helper/token.helper';
import { rewardService } from '../../../_services';

const BASE_URL = process.env.API_BASE;

export default {
  props: ['isOpen', 'formDataObj', 'refetch'],
  beforeDestroy() {
    this.clear();
  },
  data() {
    return {
      isSubmitting: false,
      imageUrl: '',
    };
  },
  methods: {
    ...mapActions('alert', ['success', 'error', 'clear']),
    toggleModal() {
      this.$emit('toggle');
    },
    handleCancel() {
      this.toggleModal();
    },
    async handleSubmit() {
      try {
        const { imageUrl } = this;
        const { promoUserId } = this.formDataObj;
        const payload = {
          image_url: imageUrl,
        };

        const result = await rewardService.updateClaim(payload, promoUserId);
        if (result) {
          this.success('Upload struk berhasil');
          this.$emit('refetch');
        }
      } catch (e) {
        let msg = 'Terjadi kesalahan ketika menyimpan data';

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
    factoryFn() {
      return new Promise((resolve) => {
        // Retrieve JWT token from your store.
        const token = tokenHelper.get();
        resolve({
          url: `${BASE_URL}/upload/receipt`,
          method: 'POST',
          headers: [
            { name: 'Authorization', value: `${token}` },
          ],
          fieldName: 'image',
        });
      });
    },
    eventUploaded(result) {
      const resp = JSON.parse(result.xhr.responseText);
      this.imageUrl = resp.image_path;
      this.clear();
    },
    eventFailed() {
      this.error('Gagal mengupload struk');
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
</style>
