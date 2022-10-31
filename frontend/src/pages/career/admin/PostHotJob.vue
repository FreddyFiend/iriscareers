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

      <q-file
        outlined
        v-model="image"
        class="q-pa-md"
        accept=".jpg, .png, image/*"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
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
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useIrisStore } from "src/stores/iris";
export default defineComponent({
  name: "addprofession",
  props: ["user"],
  setup() {
    const store = useIrisStore();

    const q = useQuasar();

    return {
      q,
      store,
      stateOptions: ref([]),
      countryModel: ref(null),
      cityOptions: ref([]),
      cityModel: ref(null),
      jobTitle: ref(null),
      jobDetails: ref(""),
      shortJobDetails: ref(""),
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
    };
  },
  methods: {
    onSubmit() {
      this.q.loading.show({
        delay: 400, // ms
      });
      const formData = new FormData();
      formData.append("uploadedImage", this.image);
      formData.append("title", this.jobTitle);
      formData.append("city", this.cityModel.label);
      formData.append("shortDesc", this.shortJobDetails);
      formData.append("longDesc", this.jobDetails);
      formData.append("country", this.countryModel.label);

      console.log(this.jobTitle);
      api
        .post("govjob", formData)
        .then((res) => {
          this.q.loading.hide();
          console.log(res.data);
          this.q.notify({
            message: res.data.msg,
            color: "green",
          });
          this.$router.push(`/hotjobs`);
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
    return { user: {}, countryOptions: [], image: "" };
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
