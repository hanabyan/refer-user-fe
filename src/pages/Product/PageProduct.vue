<template>
  <q-page padding>
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
                  <img src="~/assets/img/djarum.super.png" style="max-width: 100%;">
                </div>

                <q-card-section>
                  <p class="r-card-title">{{ props.row.product_name }}</p>
                  <p class="r-card-est-title">Estimated price:</p>
                  <p class="r-card-est-value">Rp. {{ props.row.estimated_price }}</p>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <p style="margin-bottom: 7px;">Bagikan dan dapatkan komisi!</p>
                  <social-sharing
                    url="https://www.google.com"
                    title="Ini Judul"
                    description="Ini deskripsi"
                    hashtags="refer,rokok,jarum"
                    twitter-user="budaiOnlyOne"
                    inline-template
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

Vue.use(SocialSharing);

export default {
  // name: 'PageName',
  components: {
    SocialSharing,
  },
  data() {
    return {
      promos: [
        {
          product_id: '4',
          product_name: 'Chocolatos Dark 10gr',
          product_description: 'Chocolatos dengan coklat asli Lumajang.',
          estimated_price: '5000',
          image: 'asdasd',
          total_item: '10',
          total_item_left: 9,
          promo_id: '1',
          promo_name: 'Beli 1 Gratis Pulsa 5rb',
          promo_type: '0',
          promo_value: '5000',
          promo_description: 'Beli product Garuda Food dan simpan struk belanja lalu tukarkan dengan Pulsa 5rb.\r\nPulsa dikirim maximal 2x24 jam\r\nCS:021-56342039',
        },
        {
          product_id: '3',
          product_name: 'Gery Snack Sereal 50gr',
          product_description: 'Gery Snack yang mengisi hari-hari Anda saat patah hati.',
          estimated_price: '5000',
          image: 'asdasd',
          total_item: '1000',
          total_item_left: '1000',
          promo_id: '1',
          promo_name: 'Beli 1 Gratis Pulsa 5rb',
          promo_type: '0',
          promo_value: '5000',
          promo_description: 'Beli product Garuda Food dan simpan struk belanja lalu tukarkan dengan Pulsa 5rb.\r\nPulsa dikirim maximal 2x24 jam\r\nCS:021-56342039',
        },
        {
          product_id: '3',
          product_name: 'Gery Snack Sereal 50gr',
          product_description: 'Gery Snack yang mengisi hari-hari Anda saat patah hati.',
          estimated_price: '5000',
          image: 'asdasd',
          total_item: '1000',
          total_item_left: '1000',
          promo_id: '1',
          promo_name: 'Beli 1 Gratis Pulsa 5rb',
          promo_type: '0',
          promo_value: '5000',
          promo_description: 'Beli product Garuda Food dan simpan struk belanja lalu tukarkan dengan Pulsa 5rb.\r\nPulsa dikirim maximal 2x24 jam\r\nCS:021-56342039',
        },
        {
          product_id: '3',
          product_name: 'Gery Snack Sereal 50gr',
          product_description: 'Gery Snack yang mengisi hari-hari Anda saat patah hati.',
          estimated_price: '5000',
          image: 'asdasd',
          total_item: '1000',
          total_item_left: '1000',
          promo_id: '1',
          promo_name: 'Beli 1 Gratis Pulsa 5rb',
          promo_type: '0',
          promo_value: '5000',
          promo_description: 'Beli product Garuda Food dan simpan struk belanja lalu tukarkan dengan Pulsa 5rb.\r\nPulsa dikirim maximal 2x24 jam\r\nCS:021-56342039',
        },
        {
          product_id: '3',
          product_name: 'Gery Snack Sereal 50gr',
          product_description: 'Gery Snack yang mengisi hari-hari Anda saat patah hati.',
          estimated_price: '5000',
          image: 'asdasd',
          total_item: '1000',
          total_item_left: '1000',
          promo_id: '1',
          promo_name: 'Beli 1 Gratis Pulsa 5rb',
          promo_type: '0',
          promo_value: '5000',
          promo_description: 'Beli product Garuda Food dan simpan struk belanja lalu tukarkan dengan Pulsa 5rb.\r\nPulsa dikirim maximal 2x24 jam\r\nCS:021-56342039',
        },
      ],
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
