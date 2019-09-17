<template>
  <q-page padding>
    <q-layout class="bg-white q-pa-lg row justify-center">
      <div v-if="isValid" class="q-mr-md">
        <div class="text-h5 q-mb-md">Promo</div>

        <q-card class="my-card self-end" square style="max-width: 250px;">
          <div style="padding-top: 6px; padding-bottom: 1px; background-color: #9b9b9b;">
            <img :src="payload.image" style="max-width: 100%;">
          </div>

          <q-card-section>
            <p class="r-card-title">{{ payload.name }}</p>
            <p class="r-card-desc">{{ payload.description }}</p>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-mb-md q-ml-md">
        <!-- TODO: switch to notification if not available -->
        <div v-if="isAvailable">
          <div class="text-h5 q-mb-md">Upload Resi Belanja</div>

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

          <div
            v-if="alert.message"
          >
            <p
              :class="{ 'text-negative': alert.type
                === 'negative', 'text-positive': alert.type === 'positive' }"
            >{{ alert.message }}
            </p>
          </div>

          <div>
            <div>
              <q-btn
                style="background-color: #444; color: #fff;"
                label="Simpan"
                no-caps
                @click="uploadReceipt"
              />
            </div>
          </div>
        </div>
        <!-- end upload struk -->

        <!-- notification -->
        <div v-if="message">
          <q-banner :class="`text-white ${messageType === 'negative' ? 'bg-red' : 'bg-green'}`">
            {{ message }}
          </q-banner>
        </div>
        <!-- end notification -->

        <div class="text-right q-mt-xl">
          <q-btn
            class="refer-input"
            label="Lihat Reward Saya"
            no-caps
            to="/reward"
          />
        </div>
      </div>
    </q-layout>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import { rewardService } from '../../_services';
import tokenHelper from '../../_helper/token.helper';

const BASE_URL = process.env.API_BASE;

export default {
  // name: 'PageName',
  beforeMount() {
    const decoded = window.atob(unescape(this.$route.query.code));
    this.promoCode = decoded;

    // TODO: delete aja
    // promoService.getLanding(decoded).then((res) => {
    //   const {
    //     name, description, promo_value: promoValue,
    //   } = res.promo;

    //   const { image } = res.product;

    //   this.payload = {
    //     name, description, promoValue, image,
    //   };
    // }, (rej) => {
    //   console.log(rej);
    // });
    this.$q.loading.show();

    rewardService.claim({ code: decoded }).then((res) => {
      const {
        name, description, promo_value: promoValue,
      } = res.promo;

      const { image } = res.product;

      this.payload = {
        name, description, promoValue, image,
      };

      this.promoUserId = res.reward;
      this.isAvailable = true;
      this.isValid = true;
      this.$q.loading.hide();
    }, (rej) => {
      let msg = 'Terjadi kesalahan';

      if (typeof rej.response.data === 'string') {
        msg = rej.response.data;

        if (rej.response.data.toLowerCase() === 'kode salah') {
          msg = 'Kode promo tidak ditemukan';
        }
      }

      this.isValid = false;
      this.message = msg;
      this.messageType = 'negative';
      this.isAvailable = false;

      this.$q.loading.hide();
    });
  },
  beforeDestroy() {
    this.clear();
  },
  data() {
    return {
      payload: {
        name: '',
        description: '',
        promoValue: 0,
        image: '',
      },
      promoUserId: '',
      BASE_URL,
      promoCode: '',
      imageUrl: '',
      isAvailable: false,
      isValid: false,
      message: '',
      messageType: '',
    };
  },
  computed: {
    alert() {
      return this.$store.state.alert;
    },
  },
  methods: {
    ...mapActions('alert', ['success', 'error', 'clear']),
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
    async uploadReceipt() {
      try {
        const { promoUserId, imageUrl } = this;
        const payload = {
          image_url: imageUrl,
        };

        const result = await rewardService.updateClaim(payload, promoUserId);
        if (result) {
          this.message = 'Upload struk berhasil';
          this.isAvailable = false;
          this.messageType = 'positive';
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

        this.message = msg;
        this.messageTYpe = 'negative';
        // this.error(msg);
      }
    },
  },
};
</script>

<style scoped>
  /* .q-layout {
    background-color: #fff;
  } */

  .r-card-title {
    font-size: 17px;
    font-weight: bold;
    color: #333;
    margin-bottom: 7px;
    max-width: 400px;
  }

  .r-card-desc {
    max-width: 400px;
  }
</style>
