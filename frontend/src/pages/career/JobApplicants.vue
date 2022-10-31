<template>
  <div class="q-pa-md row justify-center items-start" style="min-height: 100vh">
    <q-page-sticky
      position="top-left"
      :offset="[18, 18]"
      @click="$router.push(`/profile/${this.store.user.slug}`)"
    >
      <q-btn fab icon="arrow_back" color="primary" />
    </q-page-sticky>
    <div class="q-pa-md text-h6 text-center col-12">Job applicants</div>

    <div>
      <div
        style="max-width: 500px"
        v-for="(val, idx) in proposals"
        :key="val._id"
        class="q-pa-md row justify-between items-center"
      >
        <div class="">
          <div
            class="text-h6 cursor-pointer"
            @click="this.$router.push(`/jobpost/${val.jobPost.slug}`)"
          >
            Job title: {{ val.jobPost.title }}
          </div>
          <div
            class="text-h6 text-primary cursor-pointer"
            @click="this.$router.push(`/profile/${val.applicant.slug}`)"
          >
            User Profile: {{ val.applicant.username }}
          </div>
        </div>
        <div class="q-pa-md">
          <q-btn
            class="q-pa-md"
            outline
            color="primary"
            label="Respond"
            @click="showApplicantDetails(val.applicant.slug)"
          />
        </div>
        <div
          v-if="val.applicant.slug == selectedSlug && showRespond"
          class="col-12"
        >
          <q-form @submit="onSubmit(val)"
            ><div class="text-h6">Enter your response</div>
            <q-input
              v-model="responseText"
              outlined
              type="textarea"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please Select something',
              ]"
            />
            <q-btn-toggle
              v-model="accept"
              spread
              class="my-custom-toggle q-ma-md"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Rejected', value: false },
                { label: 'Accepted', value: true },
              ]"
            />
            <q-btn outline color="primary" type="submit">Submit response</q-btn>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";
import { useIrisStore } from "src/stores/iris";

export default defineComponent({
  name: "JobApplicants",
  setup() {
    const store = useIrisStore();
    return {
      store,
    };
  },
  data() {
    return {
      proposals: [],
      selectedSlug: "",
      showRespond: false,
      responseText: "",
      accept: false,
    };
  },
  methods: {
    showApplicantDetails(userSlug) {
      this.selectedSlug = userSlug;
      this.showRespond = !this.showRespond;
    },
    onSubmit(val) {
      this.$q.loading.show();
      api
        .patch("/proposal/respond", {
          proposalId: val._id,
          isAccepted: this.accept,
          response: this.responseText,
        })
        .then((res) => {
          this.$q.loading.hide();

          this.getJobProposals();
          this.$q.notify({
            color: "primary",
            message: res.data.msg,
          });
        })
        .catch((err) => {
          this.$q.loading.hide();

          this.$q.notify({
            color: "primary",
            message: "Something went wrong",
          });
        });
    },
    getJobProposals() {
      api.get("/proposal/receivedproposals").then((res) => {
        this.proposals = res.data.proposal;
        console.log(res.data);
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.getJobProposals();
    }, 500); //Time
  },
});
</script>
<style lang="scss" scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>
