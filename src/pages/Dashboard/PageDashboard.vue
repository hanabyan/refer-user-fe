<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Ads</div>

    <div class="row q-col-gutter-md">
      <div class="col-md-3">
        <a href="https://www.google.com" target="_blank">
          <q-card
            class="my-card"
            style="width: 240px; height: 150px; background-color: #eee;"
          >
          </q-card>
        </a>
      </div>

      <div class="col-md-3">
        <a href="https://www.google.com" target="_blank">
          <q-card
            class="my-card"
            style="width: 240px; height: 150px; background-color: #eee;"
          >
          </q-card>
        </a>
      </div>

      <div class="col-md-3">
        <a href="https://www.google.com" target="_blank">
          <q-card
            class="my-card"
            style="width: 240px; height: 150px; background-color: #eee;"
          >
          </q-card>
        </a>
      </div>

      <div class="col-md-3">
        <a href="https://www.google.com" target="_blank">
          <q-card
            class="my-card"
            style="width: 240px; height: 150px; background-color: #eee;"
          >
          </q-card>
        </a>
      </div>
    </div>

    <!-- <div class="text-h5 q-mb-md q-mt-xl">Featured</div> -->
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted() {
    if (this.paramCode) {
      this.$router.push(`/reward/claim?code=${this.paramCode}`);
    }
  },
  computed: {
    paramCode() {
      return this.$store.state.navigation.paramCode;
    },
  },
};
</script>

<style>
</style>
