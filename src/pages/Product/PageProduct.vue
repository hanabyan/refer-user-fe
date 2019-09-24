<template>
  <q-page padding>
    <div class="text-h5">Produk</div>
    <q-table
      :data="promos"
      :columns="columns"
      row-key="id"
      grid
      :pagination.sync="pagination"
      :rowsPerPageOptions="[]"
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
              <p class="r-card-title">{{ props.row.product_name }}</p>
              <p class="r-card-est-title">Estimated price:</p>
              <p class="r-card-est-value">
                {{ convertToCurrency(props.row.estimated_price) }}
              </p>
              <p style="margin: 0;">
                <i>Komisi</i>: {{ convertToCurrency(props.row.referral_commission) }}
              </p>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <p style="margin-bottom: 7px;">
                Bagikan dan dapatkan komisi!
                <br />
                Share {{ props.row.shared_count }} of {{ props.row.referral_share_count }}
              </p>
              <social-sharing
                :url="props.row.share_url"
                :title="props.row.promo_name"
                :description="props.row.promo_description"
                hashtags="refer"
                inline-template
                @open="open(props.row.id)"
                @close="onClose(props.row.id)"
              >
                <div class="socmed-inline-container">
                  <network network="facebook">
                    <q-icon name="fab fa-facebook" class="refer-socmed" />
                  </network>
                  <network network="whatsapp">
                    <q-icon name="fab fa-whatsapp" class="refer-socmed" />
                  </network>
                  <network network="twitter">
                    <q-icon name="fab fa-twitter" class="refer-socmed" />
                  </network>
                </div>
              </social-sharing>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
/**
 * TODO: belum pasti row-key
 */
import Vue from 'vue';
import SocialSharing from 'vue-social-sharing';

import { promoService } from '../../_services';
import numberHelper from '../../_helper/number.helper';

Vue.use(SocialSharing);

export default {
  // name: 'PageName',
  components: {
    SocialSharing,
  },
  beforeMount() {
    promoService.getProduct().then((res) => {
      this.promos = res;
    }, (rej) => {
      console.log(rej);
    });
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 12,
      },
      promos: [],
      justSharedCount: '',
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
    open(id) {
      promoService.incrShareCount(id).then((res) => {
        this.justSharedCount = res;
      },
      (rej) => {
        console.log(rej);
      });
    },
    onClose(id) {
      this.promos.some((item, index) => {
        if (parseInt(item.id, 10) === parseInt(id, 10)) {
          this.promos[index].shared_count = this.justSharedCount;
          return true;
        }
        return false;
      });
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
