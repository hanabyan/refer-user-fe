<template>
  <q-page padding>
    <div class="text-h5">My Reward</div>
    <q-table
      :data="promos"
      :columns="columns"
      row-key="id"
      grid
      class="table-product-card"
    >
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-3 grid-style-transition product-card-gutter"
        >
          <q-card class="my-card" square>
            <div style="padding-top: 6px; padding-bottom: 1px; background-color: #9b9b9b;">
              <img :src="props.row.image" style="max-width: 100%;">
            </div>

            <q-card-section>
              <p class="r-card-title">{{ props.row.promo_name }}</p>
              <p class="r-card-est-title">Estimated price:</p>
              <p class="r-card-est-value">
                {{ convertToCurrency(props.row.estimated_price) }}
              </p>
            </q-card-section>

            <q-separator />
            <q-card-section class="text-center">
              <q-btn
                v-if="props.row.status == 0"
                class="refer-input q-px-md"
                label="Upload struk"
                no-caps
                style="width: 110px;"
                @click="openModal(props.row.id)"
              />

              <q-btn
                v-if="props.row.status == 1"
                label="Approved"
                no-caps
                style="width: 110px;"
                class="bg-positive"
                color="#fff"
                disable
              />

              <q-btn
                v-if="props.row.status == 2"
                class="refer-input q-px-md"
                label="Upload struk"
                no-caps
                style="width: 130px;"
                @click="openModal(props.row.id)"
              >
                <q-icon name="message" class="q-ml-sm" />
              </q-btn>

              <q-btn
                v-if="props.row.status == 4"
                label="On progress"
                no-caps
                style="width: 110px;"
                class="bg-yellow"
                disable
              >
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>

    <UploadReceipt
      v-if="isUploadStrukOpen"
      :isOpen="isUploadStrukOpen"
      :formDataObj="{...form}"
      @toggle="toggleModal"
      @refetch="fetch"
    />
  </q-page>
</template>

<script>
import { rewardService } from '../../_services';
import numberHelper from '../../_helper/number.helper';
import UploadReceipt from './components/UploadReceipt';

export default {
  components: {
    UploadReceipt,
  },
  beforeMount() {
    this.fetch();
  },
  data() {
    return {
      isUploadStrukOpen: false,
      promos: [],
      form: {
        promoUserId: '',
      },
      columns: [
        {
          name: 'name',
          label: 'Product Name',
          field: 'name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'estimated_price',
          label: 'Estimated Price',
          field: 'estimated_price',
          sortable: true,
          align: 'left',
        },
        {
          name: 'image',
          label: 'Image',
          field: 'image',
          sortable: true,
          align: 'left',
        },
      ],
    };
  },
  methods: {
    convertToCurrency(value) {
      return numberHelper.getCurrency({ value, thousandSeparator: '.' });
    },
    fetch() {
      rewardService.get().then((res) => {
        this.promos = res;
      }, (rej) => {
        console.log(rej);
      });
    },
    toggleModal() {
      this.isUploadStrukOpen = !this.isUploadStrukOpen;
    },
    openModal(promoUserId) {
      this.form = { promoUserId };
      this.toggleModal();
    },
  },
};
</script>
<style>
  .refer-socmed {
    color: #8a8a8a;
    font-size: 30px;
    cursor: pointer;
    transition: all ease-out 0.5s;
  }

  .refer-socmed:hover {
    color: #4a4a4a;
  }

  .product-card-gutter {
    padding: 15px;
  }

  .table-product-card .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  .r-card-title {
    font-size: 17px;
    font-weight: bold;
    color: #333;
    margin-bottom: 7px;
  }

  .r-card-est-title {
    font-weight: 400;
    color: #333;
    margin-bottom: 0px;
    line-height: 20px;
  }

  .r-card-est-value {
    color: #333;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
    font-weight: 400;
  }

  .socmed-inline-container {
    text-align: center;
  }

  .socmed-inline-container span {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
