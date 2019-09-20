<template>
  <q-dialog
    v-model="isOpen"
    square
    persistent
  >
    <q-card
      class="column"
      style="width: 600px;"
    >
      <q-btn
        icon="close"
        flat
        class="absolute-top-right q-mt-xs q-mr-xs"
        round
        @click="onCloseDialog"
      />
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        animated
        class="q-pt-xl"
      >
        <q-step
          :name="1"
          title="Informasi Akun"
          icon="person_pin"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <div class="row q-col-gutter-md">
            <!-- left form -->
            <div class="col-md-6">
              <q-input
                v-model="$v.form1.name.$model"
                label="Nama"
                :dense="dense"
                lazy-rules
                :error="isSubmitted && $v.form1.name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.name.required">Nama harus diisi</p>
                </template>
              </q-input>

              <q-input
                v-model="$v.form1.email.$model"
                label="Email"
                :dense="dense"
                lazy-rules
                type="email"
                :error="isSubmitted && $v.form1.email.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.email.required">Email harus diisi</p>
                  <p v-if="!$v.form1.email.email">Format email salah</p>
                </template>
              </q-input>

              <q-field
                label="Jenis Kelamin"
                stack-label
                :dense="dense"
                :error="isSubmitted && $v.form1.gender.$error"
              >
                <template v-slot:control>
                  <div class="q-gutter-sm">
                    <q-radio v-model="$v.form1.gender.$model" val="1" label="Laki-laki" />
                    <q-radio v-model="$v.form1.gender.$model" val="0" label="Perempuan" />
                  </div>
                </template>
                <template v-slot:error>
                  <p v-if="!$v.form1.gender.required">Jenis Kelamin harus diisi</p>
                </template>
              </q-field>

              <q-input
                v-model="$v.form1.ktp.$model"
                label="No. KTP"
                :dense="dense"
                lazy-rules
                :error="isSubmitted && $v.form1.ktp.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.ktp.required">No. KTP harus diisi</p>
                </template>
              </q-input>

              <q-input
                v-model="form1.npwp"
                label="No. NPWP"
                :dense="dense"
                lazy-rules
                :error="false"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.npwp.required">No. NPWP harus diisi</p>
                </template>
              </q-input>
            </div>

            <!-- right form -->
            <div class="col-md-6">
              <q-input
                v-model="$v.form1.address.$model"
                label="Alamat"
                :dense="dense"
                lazy-rules
                type="textarea"
                :error="isSubmitted && $v.form1.address.$error"
                rows="4"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.address.required">Alamat harus diisi</p>
                </template>
              </q-input>

              <q-select
                v-model="$v.form1.province.$model"
                label="Provinsi"
                :error="isSubmitted && $v.form1.province.$error"
                :options="provinceOptions"
                :dense="dense"
                @input="onProvinceChange"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.province.required">Provinsi harus diisi</p>
                </template>
              </q-select>

              <q-select
                v-model="$v.form1.city.$model"
                label="Kota"
                :error="isSubmitted && $v.form1.city.$error"
                :options="cityOptions"
                :dense="dense"
              >
                <template v-slot:error>
                  <p v-if="!$v.form1.city.required">Kota harus diisi</p>
                </template>
              </q-select>

              <q-input
                v-model="form1.postalCode"
                label="Kode Pos"
                :dense="dense"
                lazy-rules
              >
                <template v-slot:error>
                  <p v-if="!form1.city.required">Kode Pos harus diisi</p>
                </template>
              </q-input>

            </div>
          </div>

          <q-stepper-navigation>
            <q-btn
              @click="() => { done1 = true; step = 2 }"
              color="primary"
              label="Info Bank"
              no-caps
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Informasi Bank"
          icon="account_balance"
          :done="step > 2"
          :header-nav="step > 2"
        >
          <div class="row">
            <div class="col">
              <q-input
                v-model="$v.form2.bankName.$model"
                label="Nama Bank"
                :dense="dense"
                lazy-rules
                :error="isSubmitted && $v.form2.bankName.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form2.bankName.required">Nama Bank harus diisi</p>
                </template>
              </q-input>

              <q-input
                v-model="$v.form2.bankAccountOwner.$model"
                label="Atas Nama"
                :dense="dense"
                lazy-rules
                :error="isSubmitted && $v.form2.bankAccountOwner.$error"
              >
                <template v-slot:error>
                  <p
                    v-if="!$v.form2.bankAccountOwner.required"
                  >Pemilik rekening (atas nama)  harus diisi</p>
                </template>
              </q-input>

              <q-input
                v-model="$v.form2.bankAccountNumber.$model"
                label="Nomor Rekening"
                :dense="dense"
                lazy-rules
                :error="isSubmitted && $v.form2.bankAccountNumber.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form2.bankAccountNumber.required">Nomor Rekening Bank harus diisi</p>
                </template>
              </q-input>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn
              color="primary"
              @click="saveHandler"
              label="Simpan"
              no-caps
              :disable="isSubmitting || $v.$error"
            />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Kembali ke Informasi Akun"
              class="q-ml-sm"
              no-caps
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<script>
// TODO: set updateStateUser ketika berhasil melakukan update
import { required, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

import { userService } from '../_services';

export default {
  props: ['isOpen'],
  beforeMount() {
    userService.getProfile().then((res) => {
      const {
        name, email: userEmail, no_ktp: ktp, no_npwp: npwp, address, province, city,
        postal_code: postalCode, gender, bank_name: bankName,
        bank_account_beneficiary: bankAccountOwner, bank_account_number: bankAccountNumber,
      } = res;

      this.form1.name = name;
      this.form1.email = userEmail;
      this.form1.ktp = ktp;
      this.form1.npwp = npwp;
      this.form1.address = address;
      if (province) {
        this.actFetchProvince().then(() => {
          this.form1.province = {
            ...this.provinceOptions.find(item => parseInt(item.value, 10)
            === parseInt(province, 10)),
          };
        });
        this.actFetchCity(province).then(() => {
          this.form1.city = {
            ...this.cityOptions.find(item => parseInt(item.value, 10) === parseInt(city, 10)),
          };
        });

        this.form1.province = {
          ...this.provinceOptions.find(item => parseInt(item.value, 10) === parseInt(province, 10)),
        };
      }
      this.form1.postalCode = postalCode;
      this.form1.gender = gender;

      this.form2.bankName = bankName;
      this.form2.bankAccountOwner = bankAccountOwner;
      this.form2.bankAccountNumber = bankAccountNumber;
    }, (rej) => {
      let errMsg = 'Gagal mendapatkan profile';

      if (typeof rej === 'string') {
        errMsg = rej;
      }

      this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
    });
  },
  data() {
    return {
      step: 1,
      isSubmitted: false,
      isSubmitting: false,
      dense: true,
      confirm: false,
      form1: {
        name: '',
        // phone: '',
        email: '',
        ktp: '',
        npwp: '',
        address: '',
        province: '',
        city: '',
        postalCode: '',
        gender: '',
      },
      form2: {
        bankName: '',
        bankAccountOwner: '',
        bankAccountNumber: '',
      },
    };
  },
  validations: {
    form1: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      ktp: {
        required,
      },
      address: {
        required,
      },
      province: {
        required,
      },
      city: {
        required,
      },
      gender: {
        required,
      },
    },
    form2: {
      bankName: {
        required,
      },
      bankAccountOwner: {
        required,
      },
      bankAccountNumber: {
        required,
      },
    },
  },
  methods: {
    ...mapActions('navigation', ['toggleProfile']),
    ...mapActions('region', ['actFetchProvince', 'actFetchCity']),
    ...mapActions('authentication', ['updateStateUser']),
    async saveHandler() {
      this.done2 = true;

      this.isSubmitting = true;
      this.isSubmitted = true;
      this.$v.$touch();

      /* break if validation error */
      if (this.$v.$error) {
        this.isSubmitting = false;
        return;
      }

      try {
        const {
          form1: {
            name, email: userEmail, ktp, npwp, address, province, city, postalCode, gender,
          },
          form2: {
            bankName, bankAccountOwner, bankAccountNumber,
          },
        } = this;

        const payload = {
          name,
          gender,
          email: userEmail,
          no_ktp: ktp,
          no_npwp: npwp,
          address,
          province: typeof province === 'object' ? province.value : province,
          city: typeof city === 'object' ? city.value : city,
          postal_code: postalCode,
          bank_name: bankName,
          bank_account_beneficiary: bankAccountOwner,
          bank_account_number: bankAccountNumber,
        };

        const updatedUser = await userService.updateProfile(payload);

        if (updatedUser) {
          this.updateStateUser({ name, is_profile_completed: 1 });
          this.toggleProfile();
        }
      } catch (e) {
        let errMsg = 'Gagal mengupdate profile';

        if (typeof e === 'string') {
          errMsg = e;
        }

        this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
      }
    },
    onCloseDialog() {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin untuk menutup pengaturan akun ?',
        cancel: {
          label: 'Batal',
          flat: true,
        },
        ok: {
          label: 'Ya',
          flat: true,
        },
        persistent: true,
      }).onOk(() => {
        this.toggleProfile();
      });
    },
    onProvinceChange(province) {
      this.form1.city = null;
      this.actFetchCity(province.value);
    },
  },
  computed: {
    ...mapGetters('region', ['provinceOptions', 'cityOptions']),
  },
};
</script>

<style>
</style>
