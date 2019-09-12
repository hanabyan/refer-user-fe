<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <q-card class="my-card" square style="max-width: 250px;">
      <div style="padding-top: 6px; padding-bottom: 1px; background-color: #9b9b9b;">
        <img :src="payload.image" style="max-width: 100%;">
      </div>

      <q-card-section>
        <p class="r-card-title">{{ payload.name }}</p>
        <p class="r-card-desc">{{ payload.description }}</p>
      </q-card-section>

      <q-card-section>
        <q-btn
          v-if="!intendToClaim"
          class="full-width bg-grey-10"
          color="white"
          no-caps
          unrelevated
          @click="intendToClaim = !intendToClaim"
        >Beli</q-btn>

        <q-btn
          v-if="intendToClaim"
          class="full-width bg-grey-10 q-mb-sm"
          color="white"
          no-caps
          unrelevated
          :to="`/sign/up?code=${$route.params.code}`"
        >Daftar</q-btn>
        <p v-if="intendToClaim">Sudah mempunyai akun?
          <router-link :to="`/sign/in?code=${$route.params.code}`">Masuk</router-link></p>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script>
import { promoService } from '../../_services';

export default {
  name: 'PageC',
  beforeMount() {
    const decoded = window.atob(unescape(this.$route.params.code));

    promoService.getLanding(decoded).then((res) => {
      const {
        name, description, promo_value: promoValue, image,
      } = res.promo;

      this.payload = {
        name, description, promoValue, image,
      };
    }, (rej) => {
      console.log(rej);
    });
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
    };
  },
};
</script>

<style>
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
