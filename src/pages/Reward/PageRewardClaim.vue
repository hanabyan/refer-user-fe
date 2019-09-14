<template>
  <q-page padding>
    <q-layout class="bg-white q-pa-lg">
      <q-page-container>
        <div class="row">
          <div class="col-md-4">

            <q-card class="my-card" square style="max-width: 250px;">
              <div style="padding-top: 6px; padding-bottom: 1px; background-color: #9b9b9b;">
                <img :src="payload.image" style="max-width: 100%;">
              </div>

              <q-card-section>
                <p class="r-card-title">{{ payload.name }}</p>
                <p class="r-card-desc">{{ payload.description }}</p>
              </q-card-section>
            </q-card>

          </div>
          <div class="col-md-3 text-right">
            <div class="q-mb-md float-right">
              <q-uploader
                :factory="factoryFn"
                label="Upload Struk"
                color="white"
                text-color="black"
                square
                flat
                bordered
                style="max-width: 300px"
                @uploaded="eventUploaded"
                @failed="eventFailed"
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
              <q-btn
                style="background-color: #444; color: #fff;"
                label="Simpan"
                no-caps
                @click="uploadReceipt"
              />
            </div>
          </div>
        </div>

      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import { promoService } from '../../_services';
import tokenHelper from '../../_helper/token.helper';

const BASE_URL = '/user';

export default {
  // name: 'PageName',
  beforeMount() {
    const decoded = window.atob(unescape(this.$route.query.code));
    this.promoCode = decoded;

    promoService.getLanding(decoded).then((res) => {
      const {
        name, description, promo_value: promoValue,
      } = res.promo;

      const { image } = res.product;

      this.payload = {
        name, description, promoValue, image,
      };
    }, (rej) => {
      console.log(rej);
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
      intendToClaim: false,
      BASE_URL,
      promoCode: '',
      imageUrl: '',
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
      this.error('Gagal menguplad struk');
    },
    async uploadReceipt() {
      try {
        const { promoCode: code, imageUrl } = this;
        const payload = {
          image_url: imageUrl,
          code,
        };
        console.log(payload);
        const result = await promoService.uploadStruk(payload);

        if (result) {
          this.success('Berhasil mengupload struk');
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
  },
};
</script>

<style scoped>
  .q-layout {
    background-color: #fff;
  }

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
