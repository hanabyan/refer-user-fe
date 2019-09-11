<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted() {
    if (this.paramCode) {
      this.$router.push(`/reward/claim/${this.paramCode}`);
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
