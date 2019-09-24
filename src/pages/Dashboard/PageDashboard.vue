<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="text-h5 q-mb-md">Featured Products</div>
      </div>
      <div class="col text-right">
        <router-link
          :to="'/product'"
          style="color: #0100CB; font-size: 16px;"
        >Lihat Semua Produk</router-link>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- <div class="col-md-3">
        <a href="https://www.google.com" target="_blank">
          <q-card
            class="my-card"
            style="width: 240px; height: 150px; background-color: #eee;"
          >
          </q-card>
        </a>
      </div> -->
      <div
        v-for="feat in featured" :key="feat.id"
        class="col-xs-12 col-sm-6 col-md-3 grid-style-transition"
      >
        <q-card class="my-card" square>
          <div style="padding-top: 6px; padding-bottom: 1px; background-color: #9b9b9b;">
            <img :src="feat.image" style="max-width: 100%;">
          </div>

          <q-card-section>
            <p class="r-card-title">{{ feat.promo_name }}</p>
            <!-- <p class="r-card-title">{{ feat.product_name }}</p> -->
            <p class="r-card-est-title">Estimated price:</p>
            <p class="r-card-est-value">
              {{ convertToCurrency(feat.estimated_price) }}
            </p>
            <p style="margin: 0;">
              <i>Komisi</i>: {{ convertToCurrency(feat.referral_commission) }}
            </p>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <p style="margin-bottom: 7px;">*) Bagikan dan dapatkan komisi!</p>
            <p style="margin-bottom: 7px;">
              *) Bagikan ke {{ feat.referral_share_count }} orang untuk meng-unlock reward kamu!
            </p>
            <social-sharing
              :url="feat.share_url"
              :title="feat.promo_name"
              :description="feat.promo_description"
              hashtags="refer"
              inline-template
              @open="open(feat.id)"
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

    </div>

    <div class="row q-mt-xl q-col-gutter-lg">
      <div class="col-md-3">
        <div class="text-h6 q-mb-sm">My Profile</div>

        <q-card class="my-card">
          <q-card-section class="text-white" style="background-color: #0100CA;">
            <q-item>
              <q-item-section avatar>
                <!-- <q-avatar>
                  <img :src="'/image'">
                </q-avatar> -->
                <q-avatar
                  color="white"
                  text-color="refer-blue"
                  size="60px"
                  font-size="40px"
                  icon="account_circle"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ userName }}</q-item-label>
                <q-item-label caption lines="1" class="text-white">{{ userPhone }}</q-item-label>

                <q-item-label class="text-right">
                  <q-separator dark />
                  <q-btn label="(edit profile)" flat no-caps @click="toggleProfile"/>
                </q-item-label>
              </q-item-section>

            </q-item>
          </q-card-section>

          <q-card-actions>
            <div class="text-h5 q-px-md">Memulai</div>
          </q-card-actions>

          <q-separator />

          <q-list class="q-pa-md q-list">
            <q-item tag="label" v-ripple class="q-px-none">
              <q-item-section side top>
                <q-checkbox
                  color="refer-red"
                  :value="parseInt(isProfileCompleted, 10) === 1 ? true : false"
                  disable
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lengkapi Profil Anda</q-item-label>
                <q-item-label :class="isProfileCompleted ? ' text-strike' : ''" caption>
                  Untuk memulai, lengkapi data diri anda, klik "Edit Profile"
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple class="q-px-none">
              <q-item-section side top>
                <q-checkbox
                  v-model="isProduct"
                  color="refer-red"
                  disable
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pilih produk yang akan dibagikan</q-item-label>
                <q-item-label caption>
                  Cek produk referral yang tersedia, klik "Produk"
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple class="q-px-none">
              <q-item-section side top>
                <q-checkbox
                  v-model="isPromo"
                  color="refer-red"
                  disable
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pilih promo yang ingin diikuti</q-item-label>
                <q-item-label caption>
                  Ingin cek dan dapatkan promo yang sedang aktif, cek "My Reward"
                </q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-card>
      </div>
      <!-- end my profile -->

      <div class="col-md-3">
        <div class="text-h6 q-mb-sm">My Stats</div>

        <q-card class="my-card">
          <q-card-section>
            <q-item>
              <q-item-section avatar>
                <q-avatar
                  icon="attach_money"
                  color="refer-red"
                  text-color="white"
                  size="60px"
                  font-size="40px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Total Profit</q-item-label>
                <q-item-label caption lines="1">
                  <div class="text-h5 text-bold text-grey-6 q-mb-sm">
                    {{ convertToCurrency(getProfit | 0) }}
                  </div>
                </q-item-label>
              </q-item-section>

            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mt-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <div class="text-h5 text-bold text-grey-6 q-mb-sm">
                  {{ `${summaryReward.active}/${summaryReward.total}` }}
                </div>
                Total Reward yang aktif
              </q-item-section>
              <q-item-section>
                <q-circular-progress
                  show-value
                  font-size="12px"
                  :value="summaryReward.percentage"
                  size="50px"
                  :thickness="0.22"
                  color="refer-blue"
                  track-color="grey-3"
                  class="q-ma-md"
                >
                  {{ summaryReward.percentage }}%
                </q-circular-progress>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mt-md">
          <q-card-section>
            <q-item>
              <q-item-section>
                <div class="text-h5 text-bold text-grey-6 q-mb-sm">
                  {{ totalShare }}
                </div>
                Total Share</q-item-section>
              <q-item-section></q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <!-- end my stats -->

      <div class="col-md-6">
        <div class="text-h6 q-mb-sm">Link Stats</div>
        <!-- <q-card class="my-card">
          <q-card-section> -->
            <q-table
              :data="linkStats"
              :columns="columnLinkStats"
              row-key="id"
            />
          <!-- </q-card-section>
        </q-card> -->
      </div>
    </div>

    <!-- <div class="text-h5 q-mb-md q-mt-xl">Featured</div> -->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import SocialSharing from 'vue-social-sharing';

import { promoService, reportService } from '../../_services';
import numberHelper from '../../_helper/number.helper';

Vue.use(SocialSharing);

export default {
  // name: 'PageName',
  beforeMount() {
    this.fetchSummaryBalance();
    reportService.get().then((res) => {
      const { summary_reward: { active, inactive }, total_share: totalShare } = res;
      const total = parseInt(active, 10) + parseInt(inactive, 10);
      const percentage = parseFloat(((parseInt(active, 10) / total) * 100).toFixed(1), 10);

      const summaryReward = {
        active,
        total,
        percentage,
      };

      this.summaryReward = summaryReward;
      this.totalShare = totalShare;
    }, (rej) => {
      console.log(rej);
    });
  },
  async mounted() {
    try {
      const featured = await promoService.getFeaturedProduct();

      this.featured = featured;
    } catch (e) {
      console.log(e);
    }

    if (this.paramCode) {
      this.$router.push(`/reward/claim?code=${this.paramCode}`);
    }
  },
  data() {
    return {
      featured: [],
      isProduct: false,
      isPromo: false,
      summaryReward: {
        active: 0,
        total: 0,
        percentage: 0,
      },
      totalShare: 0,
      linkStats: [
        {
          url: 'https://refer.co.id/c/bga852=',
          count_open: 10,
          count_buy: 5,
        },
      ],
      columnLinkStats: [
        {
          name: 'url',
          label: 'Link Aktif yang tersebar',
          field: 'url',
          sortable: true,
          align: 'left',
        },
        {
          name: 'count_open',
          label: 'Dibuka',
          field: 'count_open',
          sortable: true,
          align: 'left',
        },
        {
          name: 'count_buy',
          label: 'Dibeli',
          field: 'count_buy',
          sortable: true,
          align: 'left',
        },
      ],
    };
  },
  methods: {
    ...mapActions('navigation', ['toggleProfile']),
    ...mapActions('authentication', ['logout', 'fetchSummaryBalance']),
    convertToCurrency(value) {
      return numberHelper.getCurrency({ value, thousandSeparator: '.' });
    },
  },
  computed: {
    ...mapGetters('authentication', ['isProfileCompleted']),
    paramCode() {
      return this.$store.state.navigation.paramCode;
    },
    userName() {
      return this.$store.state.authentication.user.name;
    },
    userPhone() {
      return this.$store.state.authentication.user.phone;
    },
    getProfit() {
      const { IN } = this.$store.state.authentication.summaryBalance;

      return parseFloat(IN);
    },
  },
};
</script>

<style>
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

  .refer-socmed {
    color: #8a8a8a;
    font-size: 30px;
    cursor: pointer;
    transition: all ease-out 0.5s;
  }

  .refer-socmed:hover {
    color: #4a4a4a;
  }

  .socmed-inline-container {
    text-align: center;
  }

  .socmed-inline-container span {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
