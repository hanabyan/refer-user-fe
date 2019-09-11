<template>
  <q-page padding>
    <q-table
      :data="myRewards"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
          <div class="text-h6">My Reward</div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      myRewards: [],
      columns: [],
    };
  },
};
</script>

<style>
</style>
