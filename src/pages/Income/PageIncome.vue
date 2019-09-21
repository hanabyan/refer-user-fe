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
                {{ convertToCurrency(props.row.amount) }}
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
              <q-item-label class="text-h5">
                <b>{{ convertToCurrency(getBalance) }}</b>
              </q-item-label>
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
import { mapActions } from 'vuex';
import FormModal from './FormModal';

import { userService } from '../../_services';
import numberHelper from '../../_helper/number.helper';

export default {
  // name: 'PageName',
  components: {
    FormModal,
  },
  beforeMount() {
    this.fetchSummaryBalance();
    userService.getIncomeList().then((res) => {
      this.incomes = res;
    }, (rej) => {
      console.log(rej);
    });
  },
  data() {
    return {
      isOpenModal: false,
      incomes: [],
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
    ...mapActions('authentication', ['fetchSummaryBalance']),
    toggleModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    convertToCurrency(value) {
      return numberHelper.getCurrency({ value });
    },
  },
  computed: {
    getBalance() {
      const { IN, OUT } = this.$store.state.authentication.summaryBalance;
      return parseFloat(IN) - parseFloat(OUT);
    },
  },
};
</script>

<style>
</style>
