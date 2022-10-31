<template>
  <div class="row justify-center" style="min-height: 100vh">
    <q-page-sticky
      position="top-left"
      :offset="[18, 18]"
      @click="$router.push(`/profile/${this.store.user.slug}`)"
    >
      <q-btn fab icon="arrow_back" color="primary" />
    </q-page-sticky>
    <q-form
      @submit="onSubmit"
      class="q-ma-sm q-pa-md col-12 bg-white shadow-6"
      style="max-width: 500px"
    >
      <div class="q-px-md text-h6">Post a Job</div>
      <q-input
        outlined
        class="q-pa-md"
        v-model="jobTitle"
        label="Job title"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 12) || 'Please type more than 12 characters',
        ]"
      />

      <q-select
        outlined
        class="q-pa-md"
        v-model="professionModel"
        use-input
        input-debounce="0"
        @new-value="createValueProfession"
        label="Job Category"
        :options="professionOptions"
        @filter="filterFn"
        behavior="menu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please Select something']"
      ></q-select>
      <q-select
        label="Skills required "
        outlined
        class="q-pa-md"
        v-model="skillsModel"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        new-value-mode="add-unique"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0 && val.length < 8) ||
            'Please add between 1 to 8 skills',
        ]"
      />
      <q-input
        class="q-pa-md"
        label="Short job description"
        v-model="shortJobDetails"
        outlined
        type="textarea"
        autogrow
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 250 && val.length < 350) ||
            'Please type between 250 to 350 characters',
        ]"
      />
      <q-input
        class="q-pa-md"
        label="Full job description"
        v-model="jobDetails"
        outlined
        type="textarea"
        autogrow
        lazy-rules
        :rules="[
          (val) =>
            (val &&
              val.split(' ').length > 300 &&
              val.split(' ').length < 3000) ||
            'Please type more than 300 words',
        ]"
      />
      <q-select
        class="q-pa-md"
        outlined
        :options="countryOptions"
        v-model="countryModel"
        label="Country"
        @update:model-value="onCountrySelect()"
      />
      <q-select
        class="q-pa-md"
        outlined
        v-model="cityModel"
        :options="
          cityOptions.map((city) => ({
            label: city.name,
            value: city.iso2,
          }))
        "
        label="City"
      />
      <q-select
        class="q-pa-md"
        outlined
        v-model="paymentModel"
        :options="paymentOptions"
        label="Payment Option"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-select
        class="q-pa-md"
        outlined
        v-model="currencyModel"
        :options="currencyOptions"
        label="Currency"
        menu
      />
      <div class="q-px-md text-subtitle2">Minimum Pay</div>
      <q-input
        class="q-pa-md"
        v-model.number="salaryRange.min"
        type="number"
        outlined
        lazy-rules
        :rules="[(val) => (val && val > 0) || 'Range must not be negative']"
        ><template v-slot:before> {{ currencyModel }}: </template></q-input
      >
      <div class="q-px-md text-subtitle2">Maximum Pay</div>
      <q-input
        class="q-pa-md"
        v-model.number="salaryRange.max"
        type="number"
        outlined
        lazy-rules
        :rules="[
          (val) =>
            (val && val > salaryRange.min) ||
            'Maximum payment must be greater than minimum',
        ]"
        ><template v-slot:before> {{ currencyModel }}: </template></q-input
      >
      <q-select
        transition-show="flip-up"
        transition-hide="flip-down"
        class="q-pa-md"
        outlined
        v-model="jobTypesModel"
        multiple
        :options="jobTypes"
        use-chips
        input-debounce="0"
        stack-label
        label="Job Type"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <div class="q-pa-md">
        <q-badge color="primary">
          Payment Range: From {{ salaryRange.min }} {{ currencyModel }} to
          {{ salaryRange.max }} {{ currencyModel }}
        </q-badge>
        <q-range
          class="q-pa-md"
          v-model="salaryRange"
          :min="5"
          :max="300000"
          :step="5"
          color="primary"
        />
      </div>

      <div class="q-pa-sm">
        <q-btn
          rounded
          outlined
          text-color="primary"
          bg-color="white"
          label="Done"
          type="submit"
          color="white "
        />
        <q-btn
          rounded
          outlined
          class="q-mx-sm"
          text-color="primary"
          bg-color="white"
          label="Cancel"
          @click="$router.push(`/profile/${this.store.user.slug}`)"
          color="white "
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import currencies from "./currencies.js";
import professions from "./professions";
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
let options = professions;
import { useIrisStore } from "src/stores/iris";
export default defineComponent({
  name: "addprofession",
  props: ["user"],
  setup() {
    const store = useIrisStore();

    const q = useQuasar();
    const jobTypes = ref(["Full-time", "Part-time", "Remote"]);

    const professionOptions = ref(options);

    const currencyOptions = currencies;

    return {
      q,
      store,
      stateOptions: ref([]),
      paymentModel: ref(null),
      paymentOptions: ref(["Hourly", "Monthly", "Per Project"]),
      currencyModel: ref(null),
      currencyOptions,
      countryModel: ref(null),
      cityOptions: ref([]),
      salaryRange: ref({
        min: 0,
        max: 1,
      }),
      cityModel: ref(null),
      jobTitle: ref(null),
      jobDetails: ref(""),
      shortJobDetails: ref(""),
      jobTypesModel: ref(null),
      jobTypes,
      skillsModel: ref([]),
      professionModel: ref([]),
      professionOptions,
      options,
      onCountrySelect() {
        this.q.loading.show();

        console.log(this.countryModel.value);
        var config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${this.countryModel.value}/cities`,
          headers: {
            "X-CSCAPI-KEY":
              "bUxVZ3ZFUWlNWVlKQ3BzM1hSdG1GT0xHMGpkczJ5aU9OTXNxa1o1RQ==",
          },
        };
        this.$axios(config)
          .then((res) => {
            this.q.loading.hide();

            this.cityOptions = res.data;
          })
          .catch((error) => {
            this.q.loading.hide();

            console.log(error);
          });
      },
      createValueProfession(val, done) {
        if (val.length > 0) {
          if (!professionOptions.includes(val)) {
            professionOptions.push(val);
          }
          done(val, "toggle");
        }
      },
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            professionOptions.value = options;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          professionOptions.value = options.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  methods: {
    onSubmit() {
      this.q.loading.show({
        delay: 400, // ms
      });
      api
        .post("job", {
          title: this.jobTitle,
          salaryFrom: this.salaryRange.min,
          salaryTo: this.salaryRange.max,
          jobType: this.jobTypesModel,
          city: this.cityModel.label,
          shortDesc: this.shortJobDetails,
          longDesc: this.jobDetails,
          country: this.countryModel.label,
          paymentType: this.paymentModel,
          currency: this.currencyModel,
          profession: this.professionModel,
          subProfession: this.skillsModel,
        })
        .then((res) => {
          this.q.loading.hide();
          console.log(res.data);
          res.data.success;
          this.q.notify({
            message: res.data.msg,
            color: "green",
          });
          this.$router.push(`/profile/${this.store.user.slug}`);
        })
        .catch((error) => {
          this.q.loading.hide();
          if (error.response) {
            this.q.notify({
              message: error.response.data.msg,
              color: "red",
            });
          }
        });
    },
  },
  data() {
    return { user: {}, countryOptions: [] };
  },
  mounted() {
    console.log();
    let config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY":
          "bUxVZ3ZFUWlNWVlKQ3BzM1hSdG1GT0xHMGpkczJ5aU9OTXNxa1o1RQ==",
      },
    };
    setTimeout(() => {
      this.$axios(config)
        .then((res) => {
          this.countryOptions = res.data.map((country) => ({
            label: country.name,
            value: country.iso2,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  },
});
</script>
