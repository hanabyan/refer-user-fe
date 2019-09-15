<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Akun</div>

    <q-card>
      <q-card-section>
        <div class="text-h6">Detil Akun</div>
        <q-separator />
      </q-card-section>

      <q-card-section>
        <!-- start update akun -->
        <div class="row q-pb-md">
          <div class="col-md-6">
            <q-input
              v-model="form.phone"
              label="Nomor HP"
              :dense="dense"
              lazy-rules
              type="phone"
              :error="false"
              disable
            >
            </q-input>
            <div class="text-right">
              <q-btn
                label="Ubah nomor HP"
                class="refer-input"
                @click="preConfirmChangePhone"
              />
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <!-- left form -->
          <div class="col-md-6">
            <q-input
              v-model="$v.form.name.$model"
              label="Nama"
              :dense="dense"
              lazy-rules
              :error="isSubmitted && $v.form.name.$error"
            >
              <template v-slot:error>
                <p v-if="!$v.form.name.required">Name is required</p>
              </template>
            </q-input>

            <q-input
              v-model="$v.form.email.$model"
              label="Email"
              :dense="dense"
              lazy-rules
              type="email"
              :error="isSubmitted && $v.form.email.$error"
            >
              <template v-slot:error>
                <p v-if="!$v.form.email.required">Email is required</p>
              </template>
            </q-input>

            <q-input
              v-model="form.ktp"
              label="No. KTP"
              :dense="dense"
              lazy-rules
              :error="false"
            >
            </q-input>

            <q-input
              v-model="form.npwp"
              label="No. NPWP"
              :dense="dense"
              lazy-rules
              :error="false"
            >
            </q-input>
          </div>

          <!-- right form -->
          <div class="col-md-6">
            <q-input
              v-model="form.address"
              label="Alamat"
              :dense="dense"
              lazy-rules
              type="textarea"
              :error="false"
              rows="4"
            >
            </q-input>
            <!-- TODO: province & city -->
            <!-- <q-select
              v-model="form.province"
              label="Provinsi"
              :error="false"
            >
            </q-select> -->

            <q-input
              v-model="form.postal_code"
              label="Kode Pos"
              :dense="dense"
              lazy-rules
            >
            </q-input>

            <q-field label="Gender" stack-label>
              <template v-slot:control>
                <div class="q-gutter-sm">
                  <q-radio v-model="form.gender" val="1" label="Laki-laki" />
                  <q-radio v-model="form.gender" val="0" label="Perempuan" />
                </div>
              </template>
            </q-field>

          </div>
        </div>
      </q-card-section>
      <!-- start update akun -->

      <q-card-actions
        align="right"
        class="bg-white"
      >
        <q-btn label="Batal" flat class="text-warning" no-caps />
        <q-btn label="Simpan" flat class="text-teal" no-caps />
      </q-card-actions>
    </q-card>

    <div class="row q-mt-md">
      <div class="col">
        <q-table
          :data="bankAccounts"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
              <div class="text-h6">Rekening Bank</div>
              <q-space/>
              <q-btn
                class="refer-input"
                label="Tambah Rekening"
                @click="addNew"
              />
          </template>
        </q-table>
      </div>
    </div>

    <!-- Popup modals -->
    <FormChangePhone
      v-if="isOpenChangePhone"
      :isOpen="isOpenChangePhone"
      @toggle="toggleModalChangePhone"
    />
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import FormChangePhone from './components/FormChangePhone';

export default {
  components: {
    FormChangePhone,
  },
  data() {
    return {
      isOpenChangePhone: false,
      isSubmitted: false,
      dense: true,
      form: {
        name: '',
        phone: '',
        email: '',
        ktp: '',
        npwp: '',
        address: '',
        province: '',
        city: '',
        postal_code: '',
        gender: '',
      },
      columns: [
        {
          name: 'name',
          label: 'Bank',
          field: 'name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'account_number',
          label: 'No. Rekeing',
          field: 'account_number',
          sortable: true,
          align: 'left',
        },
        {
          name: 'account_name',
          label: 'Atas Nama',
          field: 'account_name',
          sortable: true,
          align: 'left',
        },
      ],
      bankAccounts: [
        {
          name: 'BCA',
          account_number: '123456789',
          account_name: 'John Doe',
        },
      ],
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
      },
    },
  },
  methods: {
    addNew() {
      console.log('add new');
    },
    preConfirmChangePhone() {
      this.$q.dialog({
        title: 'Pemberitahuan',
        message: 'Untuk melakukan perubahan ini, kami akan mengirimkan One Time Password (OTP) ke nomor anda yang baru, sebagai verifikasi',
        cancel: {
          push: true,
          label: 'Batal',
          flat: true,
        },
        ok: {
          push: true,
          label: 'Ya, Lanjutkan',
          flat: true,
        },
        persistent: true,
        // buttons: ['Cancel']
      })
        .onOk(() => {
          this.toggleModalChangePhone();
        });
    },
    toggleModalChangePhone() {
      this.isOpenChangePhone = !this.isOpenChangePhone;
    },
  },
};
</script>

<style>
</style>
