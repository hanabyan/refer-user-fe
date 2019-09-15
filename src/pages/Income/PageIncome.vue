<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Penghasilan</div>

    <div class="row q-col-gutter-md">
      <div class="col-8">
        <q-table
          :data="incomes"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
            <div class="text-h6">Histori Penghasilan</div>
          </template>

          <template v-slot:body-cell-amount="props">
            <q-td
              :key="props.col.name"
              :props="props"
            >
              <span
                v-if="props.row.type=== 'db'"
                class="text-negative"
              >- </span>
              <span
                :class="props.row.type === 'db' ? 'text-negative' : ''"
              >
                {{props.row.amount}}
              </span>
            </q-td>
          </template>
        </q-table>
      </div>

      <div class="col-4">
        <q-card class="q-pa-md">
          <q-item class="q-mb-lg">
            <q-item-section avatar>
              <q-icon name="fa fa-money-bill" style="color: #0100CA;" />
            </q-item-section>

            <q-item-section>
              <q-item-label caption style="font-size: 14px;">Saldo Komisi</q-item-label>
              <q-item-label class="text-h5"><b>Rp 559,000</b></q-item-label>
            </q-item-section>
          </q-item>

          <div class="text-right">
            <q-btn
              class="refer-input"
              label="Tarik Dana"
              style="background-color: #0100CA;"
              @click="toggleModal"
            />
          </div>
        </q-card>
      </div>
    </div>

    <FormModal
      v-if="isOpenModal"
      :isOpen="isOpenModal"
      @toggle="toggleModal"
    />

  </q-page>
</template>

<script>
import FormModal from './FormModal';

export default {
  // name: 'PageName',
  components: {
    FormModal,
  },
  data() {
    return {
      isOpenModal: false,
      incomes: [
        {
          date: '07 Sep 2019',
          description: 'Komisi penjualan: XAOFLK',
          amount: '669,000',
          type: 'cr',
        },
        {
          date: '10 Sep 2019',
          description: 'Tarik dana',
          amount: '100,000',
          type: 'db',
        },
      ],
      columns: [
        {
          name: 'date',
          label: 'Tanggal',
          field: 'date',
          sortable: true,
          align: 'left',
        },
        {
          name: 'description',
          label: 'Deskripsi',
          field: 'description',
          sortable: true,
          align: 'left',
        },
        {
          name: 'amount',
          label: 'Jumlah',
          field: 'amount',
          sortable: true,
          align: 'right',
        },
      ],
    };
  },
  methods: {
    toggleModal() {
      this.isOpenModal = !this.isOpenModal;
    },
  },
};
</script>

<style>
</style>
