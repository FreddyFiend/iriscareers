<template>
  <div class="q-pa-md row justify-center items-start" style="min-height: 100vh">
    <q-page-sticky
      position="top-left"
      :offset="[18, 18]"
      @click="$router.push(`/profile/${this.store.user.slug}`)"
    >
      <q-btn fab icon="arrow_back" color="primary" />
    </q-page-sticky>
    <div class="q-pa-md text-h6 text-center col-12">Jobs applied</div>

    <div>
      <div
        v-for="(val, idx) in proposals"
        :key="val._id"
        class="q-pa-md row justify-between items-center"
      >
        <div class="" style="max-width: 900px">
          <div
            class="text-h6 cursor-pointer"
            @click="this.$router.push(`/jobpost/${val.jobPost.slug}`)"
          >
            Job title: {{ val.jobPost.title }}
          </div>
          <div
            class="text-h6 text-primary cursor-pointer"
            @click="this.$router.push(`/profile/${val.company.slug}`)"
          >
            Company: {{ val.company.username }}
          </div>
        </div>
        <div class="q-pa-md">
          <div class="q-pa-md bg-blue text-white" v-if="val.isPending">
            Pending
          </div>
          <div
            class="q-pa-md bg-green text-white"
            v-if="!val.isPending && val.isAccepted"
          >
            Accepted
          </div>
          <div
            class="q-pa-md bg-red text-white"
            v-if="!val.isPending && !val.isAccepted"
          >
            Rejected
          </div>
        </div>
        <q-btn class="col-12" v-if="!val.isPending" @click="showResponse(val)"
          >Show response</q-btn
        >
        <div
          v-if="showResponseModel && val.title === responseTitle"
          class="text-subtitle2"
        >
          {{ val.response }}
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
  name: "JobsApplied",
  setup() {
    const store = useIrisStore();
    return {
      store,
    };
  },
  data() {
    return {
      proposals: [],
      proposalTitle: "",
      showResponseModel: false,
    };
  },
  methods: {
    showResponse(val) {
      this.proposalTitle = val.title;
      this.showResponseModel = !this.showResponseModel;
    },
    getAppliedJobs() {
      api.get("/proposal/myproposals").then((res) => {
        this.proposals = res.data.proposal;
        console.log(res.data);
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.getAppliedJobs();
    }, 500); //Time
  },
});
</script>
<style lang="scss" scoped></style>
