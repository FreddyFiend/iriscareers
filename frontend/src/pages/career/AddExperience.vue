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
      <div class="q-px-md text-h6">What is/was your company's name?</div>

      <q-input
        outlined
        class="q-pa-md"
        v-model="companyModel"
        label="Company Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      ></q-input>
      <div class="q-px-md text-h6">Describe your experiences</div>

      <q-input
        outlined
        class="q-pa-md"
        v-model="descriptionModel"
        label="Description"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      ></q-input>

      <div class="q-px-md text-h6">What is start year of your experience?</div>

      <q-input
        outlined
        class="q-pa-md"
        mask="####"
        v-model.number="startYearModel"
        label="Start Year"
        lazy-rules
        :rules="[(val) => (val && val > 1900) || 'Please type valid year']"
      ></q-input>

      <div class="q-px-md text-h6">What is end year of your Experience?</div>

      <q-input
        outlined
        class="q-pa-md"
        mask="####"
        v-model.number="endYearModel"
        label="End Year"
        lazy-rules
        :rules="[(val) => (val && val > 1900) || 'Please type valid year']"
      ></q-input>
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
  name: "addeducation",
  setup() {
    const q = useQuasar();
    const store = useIrisStore();
    return {
      q,
      store,
      companyModel: ref(null),
      descriptionModel: ref(null),
      startYearModel: ref(null),
      endYearModel: ref(null),
    };
  },
  methods: {
    onSubmit() {
      this.q.loading.show();
      api
        .post("user/addexperience", {
          company: this.companyModel,
          description: this.descriptionModel,
          startYear: this.startYearModel,
          endYear: this.endYearModel,
        })
        .then((res) => {
          this.q.loading.hide();
          this.q.notify({
            message: res.data.msg,
            color: "green",
          });
          this.$router.push(`/profile/${this.store.user.slug}`);
        })
        .catch((err) => {
          console.log(err);
          this.q.loading.hide();
          this.q.notify({
            message: "something went wrong",
            color: "red",
          });
        });
    },
  },
});
</script>
