<template>
  <q-page class="q-pa-md flex flex-center row justify-center">
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
      <div class="q-px-md text-h6">Edit Address</div>

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
        :options="
          stateOptions.map((city) => ({
            label: city.name,
            value: city.iso2,
          }))
        "
        v-model="stateModel"
        label="State"
        @update:model-value="onStateSelect()"
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
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useIrisStore } from "src/stores/iris";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "addAddress",
  setup() {
    let q = useQuasar();
    const store = useIrisStore();
    return {
      q,
      store,
      cityModel: ref(null),
      cityOptions: ref([]),
      countryModel: ref(null),
      countryOptions: ref([]),
      stateModel: ref(null),
      stateOptions: ref([]),

      getCountries() {
        this.q.loading.show();
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
              this.q.loading.hide();

              console.log(res.data);
              this.countryOptions = res.data.map((country) => ({
                label: country.name,
                value: country.iso2,
              }));
            })
            .catch((error) => {
              this.q.loading.hide();

              console.log(error);
            });
        }, 500);
      },
      onCountrySelect() {
        this.q.loading.show();

        var config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${this.countryModel.value}/states`,
          headers: {
            "X-CSCAPI-KEY":
              "bUxVZ3ZFUWlNWVlKQ3BzM1hSdG1GT0xHMGpkczJ5aU9OTXNxa1o1RQ==",
          },
        };
        this.$axios(config)
          .then((res) => {
            this.q.loading.hide();

            this.stateOptions = res.data;
          })
          .catch((error) => {
            this.q.loading.hide();

            console.log(error);
          });
      },
      onStateSelect() {
        this.q.loading.show();

        var config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${this.countryModel.value}/states/${this.stateModel.value}/cities`,
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
      this.q.loading.show();
      api
        .post("/user/addaddress", {
          country: this.countryModel.label,
          city: this.cityModel.label,
          state: this.stateModel.label,
          address1: "",
          address2: "",
          address3: "",
        })
        .then((res) => {
          this.$router.push(`/profile/${this.store.user.slug}`);
          this.q.notify({
            message: res.data.msg,
            color: "green",
          });
          $q.loading.hide();
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
  mounted() {
    this.getCountries();
  },
});
</script>
<style lang="scss" scoped></style>
