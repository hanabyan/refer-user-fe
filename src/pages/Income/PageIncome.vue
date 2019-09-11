<template>
  <q-page padding>
    <q-table
      :data="incomes"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
          <div class="text-h6">Penghasilan</div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      incomes: [],
      columns: [],
    };
  },
};
</script>

<style>
</style>
