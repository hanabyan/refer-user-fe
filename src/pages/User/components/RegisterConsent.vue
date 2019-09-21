<template>
  <!-- eslint-disable -->
  <q-dialog
    v-model="isOpen"
    square
    full-height
    persistent
  >
    <q-card
      class="column"
    >
      <q-btn
        icon="close"
        flat
        class="absolute-top-right q-mt-xs q-mr-xs"
        round
        @click="onCloseDialog"
      />
      <q-card-section class="q-mt-xl col scroll">
        <h4 class="text-center q-mt-xs">Terms & Conditions</h4>

        <h5 class="q-mb-md">Referral Incentive Rewards</h5>
        <p>Sebagai user yang sudah register dan mereferralkan/share iklan promo Refer.co.id ke Facebook/WhatsApp/Twitter dan user yang di share mengklik iklan sejumlah 10x klik atau membeli produk tersebut, maka anda sebagai user yang mereferralkan/share akan mendapatkan reward secara otomatis di akun Refer.co.id anda. Anda akan menerima  Incentive Rewards 1x24 jam.</p>

        <h5 class="q-mb-md">Promo Produk & Dapat Pulsa Rewards</h5>
        <p>Pilih iklan promo di Refer.co.id dan bila ketentuan tertera dengan membeli di Alfamart/Indomaret. Beli promo tersebut di gerai Afamart/Indomaret, foto struk pembelian, kirimkan struk foto ke Refer.co.id di akunmu, Refer.co.id akan memverifikasi struk anda 1x24 jam dan Pulsa Rewards akan dikirimkan ke handphone anda. Perhatikan setiap ketentuan promo yang berlaku dan tertera.</p>

        <h5 class="q-mb-md">Pengiriman Produk</h5>
        <p>Pengiriman produk akan dikirimkan estimasi jangka terpanjang 7 s/d 14 hari kerja. Bila anda melakukan pembelian sebelum jam 12 siang, maka order pembelian anda akan dapat dikirimkan pada hari itu. Bila anda melakukan pembelian diatas jam 3 sore, maka produk akan dikirimkan di hari berikutnya. <br /><br />
        Pengiriman produk melalui kurir JNE. Anda tidak dapat memilih servis kurir JNE, kami yang akan menentukan servis kurir JNE nya. <br/><br/>
        Refer.co.id saat ini beroperasi hanya mencakup daerah Jabodetabek saja yaitu Jakarta, Bogor, Depok, Tangerang, Bekasi, Puncak, Cianjur.</p>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          label="Tutup"
          @click="onCloseDialog"
          class="refer-input q-mr-lg"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {};
  },
  props: ['isOpen', 'toggle'],
  methods: {
    toggleModal() {
      this.$emit('toggle');
    },
    onCloseDialog() {
      this.toggleModal();
    },
  },
};
</script>

<style scoped>
p {
  font-size: 16px;
}
</style>
